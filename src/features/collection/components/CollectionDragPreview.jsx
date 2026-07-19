// features/collection/components/CollectionDragPreview.jsx
import './CollectionDragPreview.css';
import CollectionFavicon from './CollectionFavicon';

const CollectionDragPreview = ({
  preview,
  previewRef,
}) => {
  const {
    item,
    width,
    height,
    logoWidth,
    logoHeight,
    logoBorderRadius,
    showName,
  } = preview;

  return (
    <div
      ref={previewRef}
      className="collection-drag-preview"
      style={{
        width,
        height,
      }}
      aria-hidden="true"
    >
      <div
        className="collection-drag-preview__logo-wrap"
        style={{
          width: logoWidth,
          height: logoHeight,
          borderRadius: logoBorderRadius,
        }}
      >
        <CollectionFavicon
          item={item}
          className="collection-drag-preview__logo"
          alt=""
        />
      </div>

      {showName && (
        <span className="collection-drag-preview__name">{item.name}</span>
      )}
    </div>
  );
};

export default CollectionDragPreview;
