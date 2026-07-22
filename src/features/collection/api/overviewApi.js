import { apiClient } from '@/shared/api/apiClient';

export const getOverviewShortcuts = () => apiClient.get('/overview/shortcuts');

export const updateOverviewShortcuts = (shortcuts) => (
  apiClient.put('/overview/shortcuts', { shortcuts })
);

export const resetOverviewShortcuts = () => (
  apiClient.put('/overview/shortcuts/reset')
);

export const updateOverviewLayout = (gridSize) => (
  apiClient.put('/overview/layout', { gridSize })
);
