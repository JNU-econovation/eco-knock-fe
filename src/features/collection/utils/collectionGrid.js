// features/collection/utils/collectionGrid.js

export const reorderItemsById = (items, draggedId, targetId) => {
  if (!draggedId || draggedId === targetId) return items;

  const dragIndex = items.findIndex((item) => item.id === draggedId);
  const dropIndex = items.findIndex((item) => item.id === targetId);

  if (dragIndex < 0 || dropIndex < 0) return items;

  const reordered = [...items];
  const [dragged] = reordered.splice(dragIndex, 1);

  reordered.splice(dropIndex, 0, dragged);
  return reordered;
};

export const removeItemById = (items, itemId) => (
  items.filter((item) => item.id !== itemId)
);
