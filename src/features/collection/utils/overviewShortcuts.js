const createShortcutId = (shortcut, index) => (
  `${index}:${shortcut.name}:${shortcut.targetUrl}`
);

export const mapOverviewResult = (result) => ({
  gridLayout: `${result.gridSize}x${result.gridSize}`,
  items: [...result.shortcuts]
    .sort((left, right) => left.sortOrder - right.sortOrder)
    .map((shortcut, index) => ({
      id: createShortcutId(shortcut, index),
      name: shortcut.name,
      url: shortcut.targetUrl,
      logo: shortcut.iconUrl ?? null,
    })),
});

export const toOverviewShortcutRequest = (items) => (
  items.map((item, sortOrder) => ({
    name: item.name,
    targetUrl: item.url,
    iconUrl: item.logo ?? null,
    sortOrder,
  }))
);
