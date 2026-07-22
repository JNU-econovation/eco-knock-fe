import { useMemo, useState } from 'react';
import {
  createInitialPlaceholderUrl,
  hasUsableFavicon,
  isInitialPlaceholderUrl,
} from '../utils/collectionLink';

const CollectionFavicon = ({ item, className, alt = item.name }) => {
  const fallbackUrl = useMemo(
    () => createInitialPlaceholderUrl(item.url, item.name),
    [item.name, item.url],
  );
  const [failedUrls, setFailedUrls] = useState(() => new Set());
  const imageUrl = !failedUrls.has(item.logo)
    ? item.logo
    : !failedUrls.has(fallbackUrl) ? fallbackUrl : null;
  const imageClassName = [
    className,
    isInitialPlaceholderUrl(imageUrl) ? 'collection-favicon--placeholder' : '',
  ].filter(Boolean).join(' ');

  const markUrlFailed = (failedUrl) => {
    setFailedUrls((prev) => new Set(prev).add(failedUrl));
  };

  const handleError = () => markUrlFailed(imageUrl);

  const handleLoad = async (event) => {
    if (isInitialPlaceholderUrl(imageUrl)) return;

    const loadedUrl = imageUrl;
    const { naturalWidth, naturalHeight } = event.currentTarget;

    if (!await hasUsableFavicon(loadedUrl, naturalWidth, naturalHeight)) {
      markUrlFailed(loadedUrl);
    }
  };

  if (!item.logo || !imageUrl) {
    return <span>{item.name}</span>;
  }

  return (
    <img
      src={imageUrl}
      alt={alt}
      className={imageClassName}
      draggable={false}
      onLoad={handleLoad}
      onError={handleError}
    />
  );
};

export default CollectionFavicon;
