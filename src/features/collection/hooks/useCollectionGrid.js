// features/collection/hooks/useCollectionGrid.js
import { useEffect, useState, useRef } from 'react';
import { useErrorModal } from '@/shared/hooks/useErrorModal';
import { DEFAULT_COLLECTION_ITEMS } from '../constants/collectionItems';
import { removeItemById, reorderItemsById } from '../utils/collectionGrid';

const REMOVE_REQUEST_TIMEOUT_MS = 5000;

const EDIT_MODE_CONTROL_SELECTOR = [
  '.collection-item',
  '.collection-grid__icon-btn',
  '.collection-grid__add-btn',
].join(', ');

const resolveRemoveItemRequest = () => Promise.resolve();

export const useCollectionGrid = (
  initialItems = DEFAULT_COLLECTION_ITEMS,
  removeItemRequest = resolveRemoveItemRequest,
) => {
  const [items, setItems] = useState(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingRemoveItem, setPendingRemoveItem] = useState(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const { showError } = useErrorModal();
  const dragIdRef = useRef(null);
  const removeRequestLockRef = useRef(false);
  const removeAbortControllerRef = useRef(null);
  const removeTimeoutRef = useRef(null);
  const isMountedRef = useRef(true);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const enterEditMode = () => {
    setIsEditMode(true);
  };

  const exitEditMode = () => {
    setIsEditMode(false);
  };

  const startDrag = (itemId) => {
    dragIdRef.current = itemId;
  };

  const dropItem = (targetId) => {
    setItems((prev) => reorderItemsById(prev, dragIdRef.current, targetId));
    dragIdRef.current = null;
  };

  const requestRemoveItem = (item) => {
    setPendingRemoveItem(item);
  };

  const cancelRemoveItem = () => {
    if (removeRequestLockRef.current) return;

    setPendingRemoveItem(null);
  };

  const confirmRemoveItem = async () => {
    if (!pendingRemoveItem || removeRequestLockRef.current) return;

    removeRequestLockRef.current = true;
    setIsRemoving(true);

    const abortController = new AbortController();
    removeAbortControllerRef.current = abortController;

    try {
      // TODO - 백엔드 연동 필요: 실제 삭제 API 함수로 교체하고 AbortSignal 전달
      const removeRequest = removeItemRequest(pendingRemoveItem, {
        signal: abortController.signal,
      });
      const timeoutRequest = new Promise((_, reject) => {
        removeTimeoutRef.current = window.setTimeout(() => {
          abortController.abort();
          reject(new Error('Remove request timed out'));
        }, REMOVE_REQUEST_TIMEOUT_MS);
      });

      await Promise.race([removeRequest, timeoutRequest]);

      if (!isMountedRef.current) return;

      setItems((prev) => removeItemById(prev, pendingRemoveItem.id));
      setPendingRemoveItem(null);
    } catch {
      if (isMountedRef.current) {
        showError();
      }
    } finally {
      window.clearTimeout(removeTimeoutRef.current);
      removeTimeoutRef.current = null;
      removeAbortControllerRef.current = null;
      removeRequestLockRef.current = false;

      if (isMountedRef.current) {
        setIsRemoving(false);
      }
    }
  };


  const changeGridLayout = () => {
    // TODO: 그리드 모양 변경 로직 추가
  };

  const addItem = () => {
    // TODO: 항목 추가 모달/입력 UI 연결
    // TODO: 커스텀 바로가기 링크의 로고 이미지는 google favicon 사용
  };

  useEffect(() => {
    if (!isEditMode || pendingRemoveItem) return;

    const handlePointerDown = (event) => {
      const isInsideEditControl = event.target.closest?.(EDIT_MODE_CONTROL_SELECTOR);

      if (isInsideEditControl) return;

      exitEditMode();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isEditMode, pendingRemoveItem]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
      window.clearTimeout(removeTimeoutRef.current);
      removeAbortControllerRef.current?.abort();
    };
  }, []);

  return {
    items,
    isEditMode,
    pendingRemoveItem,
    isRemoving,
    toggleEditMode,
    enterEditMode,
    startDrag,
    dropItem,
    requestRemoveItem,
    cancelRemoveItem,
    confirmRemoveItem,
    changeGridLayout,
    addItem,
  };
};
