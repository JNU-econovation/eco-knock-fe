export const normalizeCollectionUrl = (value) => {
  const trimmedValue = value.trim();

  if (!trimmedValue) return null;

  const valueWithProtocol = /^[a-z][a-z\d+.-]*:\/\//i.test(trimmedValue)
    ? trimmedValue
    : `https://${trimmedValue}`;

  try {
    const url = new URL(valueWithProtocol);

    if (!['http:', 'https:'].includes(url.protocol)) return null;

    return url.toString();
  } catch {
    return null;
  }
};

export const createGoogleFaviconUrl = (url) => (
  `https://www.google.com/s2/favicons?domain_url=${encodeURIComponent(url)}&sz=256`
);

export const createFaviconPreviewUrl = (url) => {
  const hostname = new URL(url).hostname;

  return `https://favicon.im/${hostname}?larger=true&throw-error-on-404=true`;
};

const canLoadImage = (url) => new Promise((resolve) => {
  const image = new Image();

  image.onload = () => resolve(true);
  image.onerror = () => resolve(false);
  image.src = url;
});

export const resolveFaviconUrl = async (url) => {
  const primaryUrl = createFaviconPreviewUrl(url);

  if (await canLoadImage(primaryUrl)) return primaryUrl;

  const fallbackUrl = createGoogleFaviconUrl(url);

  return await canLoadImage(fallbackUrl) ? fallbackUrl : null;
};
