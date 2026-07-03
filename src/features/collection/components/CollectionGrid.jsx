// features/collection/components/CollectionGrid.jsx
import {
  CollectionAddIcon,
  CollectionEditIcon,
  CollectionGridIcon,
} from '@/assets/icons/CollectionPageIcons';
import { useCollectionGrid } from '../hooks/useCollectionGrid';
import CollectionDeleteModal from './CollectionDeleteModal';
import CollectionItem from './CollectionItem';
import './CollectionGrid.css';

const CollectionGrid = () => {
  const {
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
  } = useCollectionGrid();

  return (
    <div className="collection-grid__wrapper">
      <div className="collection-grid__header">
        <span className="collection-grid__title">KNOCK COLLECTION</span>
        <div className="collection-grid__header-actions">
          <button
            className="collection-grid__icon-btn"
            aria-label="순서 변경"
            type="button"
            onClick={changeGridLayout}
          >
            <CollectionGridIcon />
          </button>

          <button
            className={`collection-grid__icon-btn ${isEditMode ? 'active' : ''}`}
            aria-label="편집"
            type="button"
            onClick={toggleEditMode}
          >
            <CollectionEditIcon />
          </button>
        </div>
      </div>

      <div className="collection-grid">
        {items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            isEditMode={isEditMode}
            onDragStart={() => startDrag(item.id)}
            onDrop={() => dropItem(item.id)}
            onRemove={() => requestRemoveItem(item)}
            onEnterEditMode={enterEditMode}
          />
        ))}

        {isEditMode && (
          <div className="collection-grid__cell">
            <button
              className="collection-grid__add-btn"
              type="button"
              aria-label="항목 추가"
              onClick={addItem}
            >
              <CollectionAddIcon />
            </button>
          </div>
        )}
      </div>

      {pendingRemoveItem && (
        <CollectionDeleteModal
          itemName={pendingRemoveItem.name}
          onConfirm={confirmRemoveItem}
          onCancel={cancelRemoveItem}
        />
      )}
    </div>
  );
};

export default CollectionGrid;
