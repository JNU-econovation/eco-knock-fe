// features/collection/components/CollectionItem.jsx
import { CollectionRemoveIcon } from '@/assets/icons/CollectionPageIcons';
import { useCollectionItemPress } from '../hooks/useCollectionItemPress';
import CollectionFavicon from './CollectionFavicon';
import './CollectionItem.css';

const CollectionItem = ({
  item,
  isEditMode = false,
  isDragging = false,
  dragPointerHandlers,
  onRemove,
  onEnterEditMode,
}) => {
  const {
    isPressing,
    startPress,
    endPress,
    shouldIgnoreClick,
  } = useCollectionItemPress({
    isEditMode,
    onEnterEditMode,
  });

  const handleClick = () => {
    if (isEditMode) return;
    if (shouldIgnoreClick()) return;

    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    onRemove?.();
  };

  const handlePointerDown = (event) => {
    startPress();
    dragPointerHandlers?.onDragPointerDown?.(event);
  };

  const handlePointerUp = (event) => {
    endPress();
    dragPointerHandlers?.onDragPointerUp?.(event);
  };

  const handlePointerCancel = (event) => {
    endPress();
    dragPointerHandlers?.onDragPointerCancel?.(event);
  };

  const itemClassName = [
    'collection-item',
    isEditMode ? 'edit-mode' : '',
    isPressing ? 'pressing' : '',
    isDragging ? 'is-dragging' : '',
  ].filter(Boolean).join(' ');

  return (
    <div
      className={itemClassName}
      data-collection-item-id={item.id}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={dragPointerHandlers?.onDragPointerMove}
      onPointerUp={handlePointerUp}
      onPointerLeave={endPress}
      onPointerCancel={handlePointerCancel}
    >
      <div className="collection-item__logo-wrap">
        <CollectionFavicon item={item} className="collection-item__logo" />
      </div>
      <span className="collection-item__name">{item.name}</span>

      {isEditMode && (
        <button
          className="collection-item__remove-btn"
          type="button"
          data-no-drag="true"
          onPointerDown={(event) => event.stopPropagation()}
          onClick={handleRemove}
          aria-label={`${item.name} 삭제`}
        >
          <CollectionRemoveIcon />
        </button>
      )}
    </div>
  );
};

export default CollectionItem;
