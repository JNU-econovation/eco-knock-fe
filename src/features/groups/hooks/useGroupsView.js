import { useMemo, useState } from 'react';
import {
  GROUPS,
  MY_GROUP_IDS,
} from '@/features/groups/constants/groupData';
import { getVisibleGroups } from '@/features/groups/utils/getVisibleGroups';

export const useGroupsView = () => {
  const [activeView, setActiveView] = useState('mine');
  const [hideClosedGroups, setHideClosedGroups] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');

  const visibleGroups = useMemo(
    () => getVisibleGroups({
      groups: GROUPS,
      myGroupIds: MY_GROUP_IDS,
      activeView,
      hideClosedGroups,
      sortOrder,
    }),
    [activeView, hideClosedGroups, sortOrder]
  );

  return {
    activeView,
    setActiveView,
    hideClosedGroups,
    setHideClosedGroups,
    sortOrder,
    setSortOrder,
    visibleGroups,
  };
};
