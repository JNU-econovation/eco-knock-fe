import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getGroups,
  getMyGroups,
} from '@/features/groups/api/groupsApi';
import { mapGroupSummary } from '@/features/groups/utils/groupContract';
import { getVisibleGroups } from '@/features/groups/utils/getVisibleGroups';

export const useGroupsView = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [groupsByView, setGroupsByView] = useState({
    mine: [],
    browse: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [hideClosedGroups, setHideClosedGroups] = useState(false);
  const [sortOrder, setSortOrder] = useState('NAME_ASC');
  const activeView = searchParams.get('view') === 'browse'
    ? 'browse'
    : 'mine';

  const setActiveView = (nextView) => {
    if (nextView === activeView) return;

    setIsLoading(true);
    const nextSearchParams = new URLSearchParams(searchParams);

    if (nextView === 'browse') {
      nextSearchParams.set('view', 'browse');
    } else {
      nextSearchParams.delete('view');
    }

    setSearchParams(nextSearchParams, { replace: true });
  };

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const loadGroups = async () => {
      setIsLoading(true);

      try {
        const response = activeView === 'mine'
          ? await getMyGroups(controller.signal)
          : await getGroups({
            excludeClosed: hideClosedGroups,
            sort: sortOrder,
            signal: controller.signal,
          });
        const groups = (response.data.result ?? []).map(mapGroupSummary);

        if (isActive) {
          setGroupsByView((current) => ({
            ...current,
            [activeView]: groups,
          }));
        }
      } catch {
        // The shared API client handles the error; mock data must not replace it.
      } finally {
        if (isActive) setIsLoading(false);
      }
    };

    loadGroups();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [activeView, hideClosedGroups, sortOrder]);

  const visibleGroups = useMemo(
    () => getVisibleGroups({
      groups: groupsByView[activeView],
      hideClosedGroups: activeView === 'browse' && hideClosedGroups,
      sortOrder: activeView === 'browse' ? sortOrder : 'NAME_ASC',
    }),
    [activeView, groupsByView, hideClosedGroups, sortOrder]
  );

  return {
    activeView,
    setActiveView,
    hideClosedGroups,
    setHideClosedGroups,
    sortOrder,
    setSortOrder,
    visibleGroups,
    isLoading,
  };
};
