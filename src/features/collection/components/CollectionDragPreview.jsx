// features/collection/components/CollectionDragPreview.jsx
import './CollectionDragPreview.css';

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
        {item.logo ? (
          <img
            src={item.logo}
            alt=""
            className="collection-drag-preview__logo"
          />
        ) : (
          <span>{item.name}</span>
        )}
      </div>

      {showName && (
        <span className="collection-drag-preview__name">{item.name}</span>
      )}
    </div>
  );
};

export default CollectionDragPreview;
