// features/collection/utils/collectionGrid.js

export const reorderItemsByInsertion = (items, draggedId, targetId, position) => {
  if (!draggedId || !targetId || draggedId === targetId) return items;
  if (position !== 'before' && position !== 'after') return items;

  const draggedIndex = items.findIndex((item) => item.id === draggedId);
  const targetIndex = items.findIndex((item) => item.id === targetId);

  if (draggedIndex < 0 || targetIndex < 0) return items;

  const draggedItem = items[draggedIndex];
  const remainingItems = items.filter((item) => item.id !== draggedId);
  const targetIndexAfterRemoval = remainingItems.findIndex((item) => item.id === targetId);

  if (targetIndexAfterRemoval < 0) return items;

  const insertIndex = position === 'after'
    ? targetIndexAfterRemoval + 1
    : targetIndexAfterRemoval;

  const reordered = [...remainingItems];
  reordered.splice(insertIndex, 0, draggedItem);

  const isSameOrder = reordered.every((item, index) => item.id === items[index]?.id);

  return isSameOrder ? items : reordered;
};

export const removeItemById = (items, itemId) => (
  items.filter((item) => item.id !== itemId)
);
