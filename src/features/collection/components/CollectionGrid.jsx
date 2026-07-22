// features/collection/components/CollectionGrid.jsx
import {
  CollectionAddIcon,
  CollectionEditIcon,
  CollectionGrid2Icon,
  CollectionGrid3Icon,
  CollectionResetIcon,
} from '@/assets/icons/CollectionPageIcons';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import { useCollectionGrid } from '../hooks/useCollectionGrid';
import CollectionAddModal from './CollectionAddModal';
import CollectionDragPreview from './CollectionDragPreview';
import CollectionDeleteModal from './CollectionDeleteModal';
import CollectionItem from './CollectionItem';
import CollectionResetModal from './CollectionResetModal';
import './CollectionGrid.css';

const CollectionGrid = () => {
  const {
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
    canAddItem,
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
  } = useCollectionGrid();

  if (!gridLayout) {
    return (
      <div
        className="collection-grid__loading"
        role="status"
        aria-label="모아두기 불러오는 중"
        aria-busy="true"
      >
        <ButtonSpinner className="collection-grid__loading-spinner" />
      </div>
    );
  }

  const isTwoColumnLayout = gridLayout === '2x2';

  return (
    <div className={`collection-grid__wrapper collection-grid__wrapper--${gridLayout}`}>
      <div className="collection-grid__header">
        <span className="collection-grid__title">KNOCK COLLECTION</span>
        <div className="collection-grid__header-actions">
          {isEditMode ? (
            <button
              className="collection-grid__icon-btn"
              aria-label="기본 구성으로 되돌리기"
              type="button"
              onClick={requestResetItems}
            >
              <CollectionResetIcon />
            </button>
          ) : (
            <button
              className="collection-grid__icon-btn"
              aria-label={isTwoColumnLayout ? 'Show 3 column grid' : 'Show 2 column grid'}
              type="button"
              onClick={changeGridLayout}
            >
              {isTwoColumnLayout ? <CollectionGrid3Icon /> : <CollectionGrid2Icon />}
            </button>
          )}

          <button
            className={`collection-grid__icon-btn collection-grid__icon-btn--edit ${isEditMode ? 'active' : ''}`}
            aria-label="Edit collection"
            type="button"
            onClick={toggleEditMode}
          >
            <CollectionEditIcon />
          </button>
        </div>
      </div>

      <div className={`collection-grid collection-grid--${gridLayout}`}>
        {items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
            isEditMode={isEditMode}
            isDragging={draggedItemId === item.id}
            dragPointerHandlers={getItemPointerHandlers(item.id)}
            onRemove={() => requestRemoveItem(item)}
            onEnterEditMode={enterEditMode}
          />
        ))}

        {isEditMode && canAddItem && (
          <div className="collection-grid__cell">
            <button
              className="collection-grid__add-btn"
              type="button"
              aria-label="Add collection item"
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
          isRemoving={isRemoving}
          onConfirm={confirmRemoveItem}
          onCancel={cancelRemoveItem}
        />
      )}

      {isResetModalOpen && (
        <CollectionResetModal
          isResetting={isResetting}
          onConfirm={confirmResetItems}
          onCancel={cancelResetItems}
        />
      )}

      {isAddModalOpen && (
        <CollectionAddModal
          onAdd={confirmAddItem}
          onCancel={cancelAddItem}
        />
      )}

      {dragPreview && (
        <CollectionDragPreview
          preview={dragPreview}
          previewRef={setDragPreviewElement}
        />
      )}
    </div>
  );
};

export default CollectionGrid;
