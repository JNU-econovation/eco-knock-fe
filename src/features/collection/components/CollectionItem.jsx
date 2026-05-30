// features/collection/components/CollectionItem.jsx
import { CollectionRemoveIcon } from '@/assets/icons/CollectionPageIcons';
import { useCollectionItemPress } from '../hooks/useCollectionItemPress';
import './CollectionItem.css';

const CollectionItem = ({
  item,
  isEditMode = false,
  onDragStart,
  onDrop,
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

    // TODO: 각 링크의 URL 연결
    // 예시: window.open(item.url, '_blank')
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleRemove = (event) => {
    event.stopPropagation();
    onRemove?.();
  };

  return (
    <div
      className={`collection-item ${isEditMode ? 'edit-mode' : ''} ${isPressing ? 'pressing' : ''}`}
      draggable={isEditMode}
      onClick={handleClick}
      onPointerDown={startPress}
      onPointerUp={endPress}
      onPointerLeave={endPress}
      onPointerCancel={endPress}
      onDragStart={onDragStart}
      onDragOver={handleDragOver}
      onDrop={onDrop}
    >
      <div className="collection-item__icon-wrap">
        {item.icon ? (
          <img
            src={item.icon}
            alt={item.name}
            className="collection-item__icon"
          />
        ) : (
          <span >{item.name}</span>
        )}
      </div>
      <span className="collection-item__name">{item.name}</span>

      {isEditMode && (
        <button
          className="collection-item__remove-btn"
          type="button"
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
