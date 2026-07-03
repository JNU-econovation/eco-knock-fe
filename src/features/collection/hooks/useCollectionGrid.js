// features/collection/hooks/useCollectionGrid.js
import { useEffect, useState, useRef } from 'react';
import { DEFAULT_COLLECTION_ITEMS } from '../constants/collectionItems';
import { removeItemById, reorderItemsById } from '../utils/collectionGrid';

const EDIT_MODE_CONTROL_SELECTOR = [
  '.collection-item',
  '.collection-grid__icon-btn',
  '.collection-grid__add-btn',
].join(', ');

export const useCollectionGrid = (initialItems = DEFAULT_COLLECTION_ITEMS) => {
  const [items, setItems] = useState(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingRemoveItem, setPendingRemoveItem] = useState(null);
  
  const dragIdRef = useRef(null);


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
    setPendingRemoveItem(null);
  };

  const confirmRemoveItem = () => {
    if (!pendingRemoveItem) return;

    // TODO - 백엔드 연동 필요: 삭제 API 호출 및 성공 응답 후에만 확정 삭제
    // TODO - 삭제 API 오류 발생 시 에러 안내 모달 필요
    setItems((prev) => removeItemById(prev, pendingRemoveItem.id));
    setPendingRemoveItem(null);
  };


  const changeGridLayout = () => {
    // TODO: 그리드 모양 변경 로직 추가
  };

  const addItem = () => {
    // TODO: 항목 추가 모달/입력 UI 연결
    // TODO: 커스텀 바로가기 링크의 로고 이미지는 google favicon 사용
  };

  useEffect(() => {
    if (!isEditMode) return;

    const handlePointerDown = (event) => {
      const isInsideEditControl = event.target.closest?.(EDIT_MODE_CONTROL_SELECTOR);

      if (isInsideEditControl) return;

      exitEditMode();
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isEditMode]);

  return {
    items,
    isEditMode,
    pendingRemoveItem,
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
