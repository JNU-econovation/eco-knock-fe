// features/collection/hooks/useCollectionGrid.js
import { useState } from 'react';
import { DEFAULT_COLLECTION_ITEMS } from '../constants/collectionItems';
import { removeItemById, reorderItemsById } from '../utils/collectionGrid';

export const useCollectionGrid = (initialItems = DEFAULT_COLLECTION_ITEMS) => {
  const [items, setItems] = useState(initialItems);
  const [isEditMode, setIsEditMode] = useState(false);
  const [dragId, setDragId] = useState(null);

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  const startDrag = (itemId) => {
    setDragId(itemId);
  };

  const dropItem = (targetId) => {
    setItems((prev) => reorderItemsById(prev, dragId, targetId));
    setDragId(null);
  };

  const removeItem = (itemId) => {
    setItems((prev) => removeItemById(prev, itemId));
  };

  const changeGridLayout = () => {
    // TODO: 그리드 모양 변경 로직 추가
  };

  const addItem = () => {
    // TODO: 항목 추가 모달/입력 UI 연결
    // TODO: 커스텀 바로가기 링크의 로고 이미지는 google favicon 사용
  };

  return {
    items,
    isEditMode,
    toggleEditMode,
    startDrag,
    dropItem,
    removeItem,
    changeGridLayout,
    addItem,
  };
};
