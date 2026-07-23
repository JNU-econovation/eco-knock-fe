import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  GROUPS,
  MY_GROUP_IDS,
} from '@/features/groups/constants/groupData';
import { getVisibleGroups } from '@/features/groups/utils/getVisibleGroups';

export const useGroupsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [hideClosedGroups, setHideClosedGroups] = useState(false);
  const [sortOrder, setSortOrder] = useState('default');
  const activeView = searchParams.get('view') === 'browse'
    ? 'browse'
    : 'mine';

  const setActiveView = (nextView) => {
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextView === 'browse') {
      nextSearchParams.set('view', 'browse');
    } else {
      nextSearchParams.delete('view');
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

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
