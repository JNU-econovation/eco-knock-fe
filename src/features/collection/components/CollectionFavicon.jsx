import { useState } from 'react';
import { createGoogleFaviconUrl } from '../utils/collectionLink';

const CollectionFavicon = ({ item, className, alt = item.name }) => {
  const fallbackUrl = createGoogleFaviconUrl(item.url);
  const [failedUrls, setFailedUrls] = useState(() => new Set());
  const imageUrl = !failedUrls.has(item.logo)
    ? item.logo
    : !failedUrls.has(fallbackUrl) ? fallbackUrl : null;

  const handleError = () => {
    setFailedUrls((prev) => new Set(prev).add(imageUrl));
  };

  if (!item.logo || !imageUrl) {
    return <span>{item.name}</span>;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={className}
      draggable={false}
      onError={handleError}
    />
  );
};

export default CollectionFavicon;
