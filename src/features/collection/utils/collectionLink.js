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

// Below 48px, raster favicons visibly blur when enlarged in either grid size.
// This keeps sources such as Naver's 72px icon while rejecting 32px/40px icons.
export const MIN_FAVICON_SIZE = 48;

export const hasUsableFaviconSize = (width, height) => (
  width >= MIN_FAVICON_SIZE && height >= MIN_FAVICON_SIZE
);

const faviconMetadataRequestCache = new Map();

const createFaviconMetadataUrl = (url) => {
  const faviconUrl = new URL(url);

  if (faviconUrl.hostname !== 'favicon.im') return null;

  const sourceUrl = `${faviconUrl.hostname}${faviconUrl.pathname}${faviconUrl.search}`;
  const query = new URLSearchParams({
    url: sourceUrl,
    output: 'json',
  });

  return `https://images.weserv.nl/?${query}`;
};

const getFaviconFormat = async (url) => {
  const metadataUrl = createFaviconMetadataUrl(url);

  if (!metadataUrl) return null;

  if (!faviconMetadataRequestCache.has(metadataUrl)) {
    const metadataRequest = fetch(metadataUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Favicon metadata request failed');

        return response.json();
      })
      .then((metadata) => metadata.format?.toLowerCase() ?? null)
      .catch(() => null);

    faviconMetadataRequestCache.set(metadataUrl, metadataRequest);
  }

  return faviconMetadataRequestCache.get(metadataUrl);
};

export const hasUsableFavicon = async (url, width, height) => {
  if (hasUsableFaviconSize(width, height)) return true;

  return await getFaviconFormat(url) === 'svg';
};

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

  if (
    primarySize &&
    await hasUsableFavicon(primaryUrl, primarySize.width, primarySize.height)
  ) {
    return primaryUrl;
  }

  const fallbackUrl = createInitialPlaceholderUrl(url, name);

  return await loadImageSize(fallbackUrl) ? fallbackUrl : null;
};
