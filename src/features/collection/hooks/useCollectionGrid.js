// features/collection/hooks/useCollectionGrid.js
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  getOverviewShortcuts,
  resetOverviewShortcuts,
  updateOverviewLayout,
  updateOverviewShortcuts,
} from '../api/overviewApi';
import { removeItemById, reorderItemsByInsertion } from '../utils/collectionGrid';
import {
  mapOverviewResult,
  toOverviewShortcutRequest,
} from '../utils/overviewShortcuts';

const DRAG_HOLD_DELAY_MS = 150;
const DRAG_MOVE_CANCEL_THRESHOLD_PX = 8;
const MAX_SHORTCUT_COUNT = 20;

const EDIT_MODE_CONTROL_SELECTOR = [
  '.collection-item',
  '.collection-grid__icon-btn',
  '.collection-grid__add-btn',
].join(', ');

const DRAG_EXCLUDED_SELECTOR = 'button, [data-no-drag="true"]';
const COLLECTION_ITEM_SELECTOR = '[data-collection-item-id]';

const getCollectionItemElements = () => (
  [...document.querySelectorAll(COLLECTION_ITEM_SELECTOR)]
);

const getInsertionPosition = (
  clientX,
  clientY,
  targetRect,
  draggedIndex,
  targetIndex,
) => {
  if (clientY < targetRect.top) return 'before';
  if (clientY > targetRect.bottom) return 'after';

  if (draggedIndex >= 0 && targetIndex >= 0 && draggedIndex !== targetIndex) {
    return draggedIndex < targetIndex ? 'after' : 'before';
  }

  const targetMidX = targetRect.left + targetRect.width / 2;

  return clientX < targetMidX ? 'before' : 'after';
};

const findNearestDropTargetElement = (clientX, clientY, draggedId) => {
  const itemElements = getCollectionItemElements()
    .filter((element) => element.dataset.collectionItemId !== draggedId);

  if (itemElements.length === 0) return null;

  return itemElements.reduce((nearestElement, currentElement) => {
    const currentRect = currentElement.getBoundingClientRect();
    const currentCenterX = currentRect.left + currentRect.width / 2;
    const currentCenterY = currentRect.top + currentRect.height / 2;
    const currentDistance = Math.hypot(
      clientX - currentCenterX,
      clientY - currentCenterY,
    );

    if (!nearestElement) {
      return {
        element: currentElement,
        distance: currentDistance,
      };
    }

    return currentDistance < nearestElement.distance
      ? {
        element: currentElement,
        distance: currentDistance,
      }
      : nearestElement;
  }, null)?.element;
};

export const useCollectionGrid = () => {
  const [items, setItems] = useState([]);
  const [gridLayout, setGridLayout] = useState(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingRemoveItem, setPendingRemoveItem] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);
  const [draggedItemId, setDraggedItemId] = useState(null);
  const [dragPreview, setDragPreview] = useState(null);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const dragPointerRef = useRef(null);
  const dragHoldTimerRef = useRef(null);
  const isDragActiveRef = useRef(false);
  const dropTargetRef = useRef(null);
  const dragPreviewElementRef = useRef(null);
  const dragPreviewFrameRef = useRef(null);
  const dragPreviewPositionRef = useRef(null);
  const touchMoveCleanupRef = useRef(null);
  const removeRequestLockRef = useRef(false);
  const shortcutRequestLockRef = useRef(false);
  const layoutRequestLockRef = useRef(false);
  const isMountedRef = useRef(true);

  const loadOverview = useCallback(async () => {
    const response = await getOverviewShortcuts();
    const overview = mapOverviewResult(response.data.result);

    if (!isMountedRef.current) return;

    setItems(overview.items);
    setGridLayout(overview.gridLayout);
  }, []);

  const stopTouchMoveBlocker = useCallback(() => {
    touchMoveCleanupRef.current?.();
    touchMoveCleanupRef.current = null;
  }, []);

  const startTouchMoveBlocker = useCallback(() => {
    if (touchMoveCleanupRef.current) return;

    const preventTouchMove = (event) => {
      if (!isDragActiveRef.current) return;

      event.preventDefault();
    };

    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    touchMoveCleanupRef.current = () => {
      document.removeEventListener('touchmove', preventTouchMove);
    };
  }, []);

  const applyDragPreviewTransform = useCallback(() => {
    dragPreviewFrameRef.current = null;

    const previewElement = dragPreviewElementRef.current;
    const previewPosition = dragPreviewPositionRef.current;

    if (!previewElement || !previewPosition) return;

    previewElement.style.transform = (
      `translate3d(${previewPosition.x}px, ${previewPosition.y}px, 0)`
    );
  }, []);

  const scheduleDragPreviewTransform = useCallback((clientX, clientY) => {
    const pointer = dragPointerRef.current;

    if (!pointer?.dragOffset) return;

    dragPreviewPositionRef.current = {
      x: clientX - pointer.dragOffset.x,
      y: clientY - pointer.dragOffset.y,
    };

    if (dragPreviewFrameRef.current) return;

    dragPreviewFrameRef.current = window.requestAnimationFrame(applyDragPreviewTransform);
  }, [applyDragPreviewTransform]);

  const setDragPreviewElement = useCallback((node) => {
    dragPreviewElementRef.current = node;

    if (node) {
      applyDragPreviewTransform();
    }
  }, [applyDragPreviewTransform]);

  const setDropTargetIfChanged = useCallback((nextDropTarget) => {
    const currentDropTarget = dropTargetRef.current;
    const isSameTarget =
      currentDropTarget?.targetId === nextDropTarget?.targetId &&
      currentDropTarget?.position === nextDropTarget?.position;

    if (isSameTarget) return;

    dropTargetRef.current = nextDropTarget;
  }, []);

  const clearDragInteraction = useCallback(() => {
    window.clearTimeout(dragHoldTimerRef.current);
    dragHoldTimerRef.current = null;
    window.cancelAnimationFrame(dragPreviewFrameRef.current);
    dragPreviewFrameRef.current = null;

    const pointer = dragPointerRef.current;

    if (pointer?.sourceElement?.hasPointerCapture?.(pointer.pointerId)) {
      pointer.sourceElement.releasePointerCapture(pointer.pointerId);
    }

    dragPointerRef.current = null;
    isDragActiveRef.current = false;
    stopTouchMoveBlocker();
    setDraggedItemId(null);
    setDragPreview(null);
    setDropTargetIfChanged(null);
    dragPreviewPositionRef.current = null;
  }, [setDropTargetIfChanged, stopTouchMoveBlocker]);

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const exitEditMode = useCallback(() => {
    clearDragInteraction();
    setIsEditMode(false);
  }, [clearDragInteraction]);

  const toggleEditMode = () => {
    setIsEditMode((prev) => {
      if (prev) {
        clearDragInteraction();
      }

      return !prev;
    });
  };

  const requestRemoveItem = (item) => {
    clearDragInteraction();
    setPendingRemoveItem(item);
  };

  const cancelRemoveItem = () => {
    if (removeRequestLockRef.current) return;

    setPendingRemoveItem(null);
  };

  const confirmRemoveItem = async () => {
    if (
      !pendingRemoveItem ||
      removeRequestLockRef.current ||
      shortcutRequestLockRef.current
    ) return;

    removeRequestLockRef.current = true;
    shortcutRequestLockRef.current = true;
    setIsRemoving(true);

    try {
      const nextItems = removeItemById(items, pendingRemoveItem.id);
      await updateOverviewShortcuts(toOverviewShortcutRequest(nextItems));

      if (!isMountedRef.current) return;

      setItems(nextItems);
      setPendingRemoveItem(null);
    } catch {
      // The shared API client presents the backend error. Keep the item for retry.
    } finally {
      removeRequestLockRef.current = false;
      shortcutRequestLockRef.current = false;

      if (isMountedRef.current) {
        setIsRemoving(false);
      }
    }
  };

  const changeGridLayout = async () => {
    if (layoutRequestLockRef.current) return;

    clearDragInteraction();
    const nextGridLayout = gridLayout === '3x3' ? '2x2' : '3x3';
    layoutRequestLockRef.current = true;

    try {
      await updateOverviewLayout(nextGridLayout[0]);

      if (isMountedRef.current) setGridLayout(nextGridLayout);
    } catch {
      // Keep the server-confirmed layout when the update fails.
    } finally {
      layoutRequestLockRef.current = false;
    }
  };

  const addItem = () => {
    if (
      pendingRemoveItem ||
      isRemoving ||
      isResetModalOpen ||
      items.length >= MAX_SHORTCUT_COUNT
    ) return;

    clearDragInteraction();
    setIsAddModalOpen(true);
  };

  const cancelAddItem = () => {
    setIsAddModalOpen(false);
  };

  const confirmAddItem = async ({ name, url, logo }) => {
    if (shortcutRequestLockRef.current) return;

    const newItem = {
      id: globalThis.crypto?.randomUUID?.() ?? `collection-${Date.now()}`,
      name,
      url,
      logo,
    };
    const nextItems = [...items, newItem];
    shortcutRequestLockRef.current = true;

    try {
      await updateOverviewShortcuts(toOverviewShortcutRequest(nextItems));

      if (!isMountedRef.current) return;

      setItems(nextItems);
      setIsAddModalOpen(false);
    } finally {
      shortcutRequestLockRef.current = false;
    }
  };

  const requestResetItems = () => {
    if (pendingRemoveItem || isRemoving) return;

    clearDragInteraction();
    setIsResetModalOpen(true);
  };

  const cancelResetItems = () => {
    setIsResetModalOpen(false);
  };

  const confirmResetItems = async () => {
    if (shortcutRequestLockRef.current) return;

    shortcutRequestLockRef.current = true;
    setIsResetting(true);

    try {
      await resetOverviewShortcuts();
      await loadOverview();

      if (isMountedRef.current) setIsResetModalOpen(false);
    } catch {
      // Keep the confirmation open so the user can retry.
    } finally {
      shortcutRequestLockRef.current = false;

      if (isMountedRef.current) setIsResetting(false);
    }
  };

  const updateDropTargetFromPoint = useCallback((clientX, clientY, draggedId) => {
    const directTargetElement = document
      .elementFromPoint(clientX, clientY)
      ?.closest?.(COLLECTION_ITEM_SELECTOR);
    const targetElement = directTargetElement?.dataset?.collectionItemId === draggedId
      ? findNearestDropTargetElement(clientX, clientY, draggedId)
      : directTargetElement ?? findNearestDropTargetElement(clientX, clientY, draggedId);
    const targetId = targetElement?.dataset?.collectionItemId;

    if (!targetElement || !targetId || targetId === draggedId) {
      setDropTargetIfChanged(null);
      return;
    }

    const targetRect = targetElement.getBoundingClientRect();
    const draggedIndex = items.findIndex((item) => item.id === draggedId);
    const targetIndex = items.findIndex((item) => item.id === targetId);
    const position = getInsertionPosition(
      clientX,
      clientY,
      targetRect,
      draggedIndex,
      targetIndex,
    );

    setDropTargetIfChanged({ targetId, position });
  }, [items, setDropTargetIfChanged]);

  const startActiveDrag = useCallback(() => {
    const pointer = dragPointerRef.current;

    if (!pointer) return;

    const sourceRect = pointer.sourceElement.getBoundingClientRect();
    const logoElement = pointer.sourceElement.querySelector('.collection-item__logo-wrap');
    const nameElement = pointer.sourceElement.querySelector('.collection-item__name');
    const logoRect = logoElement?.getBoundingClientRect();
    const logoStyle = logoElement ? window.getComputedStyle(logoElement) : null;
    const item = items.find((currentItem) => currentItem.id === pointer.itemId);
    const dragOffset = {
      x: pointer.startX - sourceRect.left,
      y: pointer.startY - sourceRect.top,
    };

    if (!item) return;

    dragPointerRef.current = {
      ...pointer,
      dragOffset,
    };
    dragPreviewPositionRef.current = {
      x: pointer.startX - dragOffset.x,
      y: pointer.startY - dragOffset.y,
    };
    isDragActiveRef.current = true;
    setDraggedItemId(pointer.itemId);
    setDragPreview({
      item,
      width: sourceRect.width,
      height: sourceRect.height,
      logoWidth: logoRect?.width ?? sourceRect.width,
      logoHeight: logoRect?.height ?? sourceRect.height,
      logoBorderRadius: logoStyle?.borderRadius ?? '20px',
      showName: nameElement ? window.getComputedStyle(nameElement).display !== 'none' : true,
    });
    startTouchMoveBlocker();

    try {
      pointer.sourceElement?.setPointerCapture?.(pointer.pointerId);
    } catch {
      // Pointer capture can fail if Safari has already cancelled the stream.
    }

    updateDropTargetFromPoint(pointer.startX, pointer.startY, pointer.itemId);
  }, [items, startTouchMoveBlocker, updateDropTargetFromPoint]);

  const handleItemPointerDown = useCallback((itemId, event) => {
    if (!isEditMode || pendingRemoveItem) return;
    if (!event.isPrimary || event.button !== 0) return;
    if (event.target.closest?.(DRAG_EXCLUDED_SELECTOR)) return;

    window.clearTimeout(dragHoldTimerRef.current);

    dragPointerRef.current = {
      itemId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      sourceElement: event.currentTarget,
    };
    isDragActiveRef.current = false;

    dragHoldTimerRef.current = window.setTimeout(() => {
      dragHoldTimerRef.current = null;
      startActiveDrag();
    }, DRAG_HOLD_DELAY_MS);
  }, [isEditMode, pendingRemoveItem, startActiveDrag]);

  const handleItemPointerMove = useCallback((event) => {
    const pointer = dragPointerRef.current;

    if (!pointer || pointer.pointerId !== event.pointerId) return;

    if (!isDragActiveRef.current) {
      const movedX = event.clientX - pointer.startX;
      const movedY = event.clientY - pointer.startY;
      const moveDistance = Math.hypot(movedX, movedY);

      if (moveDistance > DRAG_MOVE_CANCEL_THRESHOLD_PX) {
        clearDragInteraction();
      }

      return;
    }

    event.preventDefault();
    scheduleDragPreviewTransform(event.clientX, event.clientY);
    updateDropTargetFromPoint(event.clientX, event.clientY, pointer.itemId);
  }, [clearDragInteraction, scheduleDragPreviewTransform, updateDropTargetFromPoint]);

  const handleItemPointerUp = useCallback((event) => {
    const pointer = dragPointerRef.current;

    if (!pointer || pointer.pointerId !== event.pointerId) return;

    const activeDropTarget = dropTargetRef.current;
    const shouldCommitDrop = isDragActiveRef.current && activeDropTarget;

    if (shouldCommitDrop) {
      event.preventDefault();
      const nextItems = reorderItemsByInsertion(
        items,
        pointer.itemId,
        activeDropTarget.targetId,
        activeDropTarget.position,
      );

      if (nextItems !== items && !shortcutRequestLockRef.current) {
        shortcutRequestLockRef.current = true;
        setItems(nextItems);
        updateOverviewShortcuts(toOverviewShortcutRequest(nextItems))
          .catch(() => {
            if (isMountedRef.current) setItems(items);
          })
          .finally(() => {
            shortcutRequestLockRef.current = false;
          });
      }
    }

    clearDragInteraction();
  }, [clearDragInteraction, items]);

  const handleItemPointerCancel = useCallback((event) => {
    const pointer = dragPointerRef.current;

    if (!pointer || pointer.pointerId !== event.pointerId) return;

    clearDragInteraction();
  }, [clearDragInteraction]);

  const getItemPointerHandlers = (itemId) => ({
    onDragPointerDown: (event) => handleItemPointerDown(itemId, event),
    onDragPointerMove: handleItemPointerMove,
    onDragPointerUp: handleItemPointerUp,
    onDragPointerCancel: handleItemPointerCancel,
  });

  useEffect(() => {
    if (!isEditMode || pendingRemoveItem || isResetModalOpen || isAddModalOpen) {
      return undefined;
    }

    const handlePointerDown = (event) => {
      const isInsideEditControl = event.target.closest?.(EDIT_MODE_CONTROL_SELECTOR);

      if (isInsideEditControl) return;

      exitEditMode();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [exitEditMode, isAddModalOpen, isEditMode, isResetModalOpen, pendingRemoveItem]);

  useEffect(() => {
    isMountedRef.current = true;
    loadOverview().catch(() => {
      // The shared API client handles the error; mock data must not replace it.
    });

    return () => {
      isMountedRef.current = false;
      clearDragInteraction();
    };
  }, [clearDragInteraction, loadOverview]);

  return {
    items,
    gridLayout,
    isEditMode,
    pendingRemoveItem,
    isRemoving,
    draggedItemId,
    dragPreview,
    isResetModalOpen,
    isResetting,
    isAddModalOpen,
    canAddItem: items.length < MAX_SHORTCUT_COUNT,
    toggleEditMode,
    enterEditMode,
    getItemPointerHandlers,
    setDragPreviewElement,
    requestRemoveItem,
    cancelRemoveItem,
    confirmRemoveItem,
    changeGridLayout,
    addItem,
    cancelAddItem,
    confirmAddItem,
    requestResetItems,
    cancelResetItems,
    confirmResetItems,
  };
};
