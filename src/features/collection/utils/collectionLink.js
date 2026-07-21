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

export const createFaviconPreviewUrl = (url) => {
  const hostname = new URL(url).hostname;

  return `https://favicon.im/${hostname}?larger=true&throw-error-on-404=true`;
};

export const MIN_FAVICON_SIZE = 90;

export const hasUsableFaviconSize = (width, height) => (
  width >= MIN_FAVICON_SIZE && height >= MIN_FAVICON_SIZE
);

const getRandomFallbackColor = () => (
  Math.floor(Math.random() * 0x1000000)
    .toString(16)
    .padStart(6, '0')
);

const getInitialPlaceholderLetter = (url, name) => {
  let hostname = '';

  try {
    hostname = new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    // Invalid temporary URLs fall back to the display name.
  }

  const hostnameLetter = hostname.startsWith('xn--')
    ? null
    : hostname.match(/[a-z]/i)?.[0];
  const nameLetter = Array.from(name.trim())[0];

  return (hostnameLetter ?? nameLetter ?? '?').toUpperCase();
};

export const createInitialPlaceholderUrl = (url, name) => {
  const initial = getInitialPlaceholderLetter(url, name);
  const query = new URLSearchParams({
    seed: initial,
    size: '256',
    backgroundColor: getRandomFallbackColor(),
    textColor: 'fafafb',
    initialsVariant: 'alt',
  });

  return `https://api.dicebear.com/10.x/initials/svg?${query}`;
};

export const isInitialPlaceholderUrl = (url) => (
  url?.startsWith('https://api.dicebear.com/10.x/initials/svg?') ?? false
);

const loadImageSize = (url) => new Promise((resolve) => {
  const image = new Image();

  image.onload = () => resolve({
    width: image.naturalWidth,
    height: image.naturalHeight,
  });
  image.onerror = () => resolve(null);
  image.src = url;
});

export const resolveFaviconUrl = async (url, name) => {
  const primaryUrl = createFaviconPreviewUrl(url);
  const primarySize = await loadImageSize(primaryUrl);

  if (primarySize && hasUsableFaviconSize(primarySize.width, primarySize.height)) {
    return primaryUrl;
  }

  const fallbackUrl = createInitialPlaceholderUrl(url, name);

  return await loadImageSize(fallbackUrl) ? fallbackUrl : null;
};
