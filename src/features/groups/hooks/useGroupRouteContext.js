import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getGroupDetail } from '@/features/groups/api/groupsApi';
import {
  GROUPS,
  MY_GROUP_IDS,
} from '@/features/groups/constants/groupData';
import { mapGroupDetail } from '@/features/groups/utils/groupContract';
import {
  getGroupViewerRole,
  getMockGroupPermissions,
} from '@/features/groups/utils/groupViewerRole';

export const useGroupRouteContext = () => {
  const { groupId } = useParams();
  const [searchParams] = useSearchParams();
  const initialMockGroup = GROUPS.find((item) => item.id === groupId) ?? null;
  const [loadedState, setLoadedState] = useState({
    groupId,
    group: initialMockGroup,
    hasApiData: false,
    isLoading: !initialMockGroup,
  });
  const isCurrentState = loadedState.groupId === groupId;
  const group = isCurrentState ? loadedState.group : initialMockGroup;
  const hasApiData = isCurrentState ? loadedState.hasApiData : false;
  const isLoading = isCurrentState
    ? loadedState.isLoading
    : !initialMockGroup;
  const mockViewerRole = initialMockGroup
    ? getGroupViewerRole({
      group: initialMockGroup,
      myGroupIds: MY_GROUP_IDS,
      requestedRole: searchParams.get('role'),
    })
    : null;
  const viewerRole = hasApiData && group
    ? group.isLeader ? 'leader' : group.isMember ? 'member' : 'guest'
    : mockViewerRole;
  const permissions = hasApiData
    ? group?.permissions
    : group && viewerRole
      ? getMockGroupPermissions(viewerRole, group)
      : null;

  useEffect(() => {
    if (!/^\d+$/.test(groupId)) return undefined;

    const controller = new AbortController();
    let isActive = true;
    const loadGroup = async () => {
      try {
        const response = await getGroupDetail(groupId, controller.signal);

        if (isActive) {
          setLoadedState({
            groupId,
            group: response.data.result
              ? mapGroupDetail(response.data.result)
              : null,
            hasApiData: Boolean(response.data.result),
            isLoading: false,
          });
        }
      } catch {
        // The shared API client handles the error; retain temporary mock data.
        if (isActive) {
          setLoadedState({
            groupId,
            group: GROUPS.find((item) => item.id === groupId) ?? null,
            hasApiData: false,
            isLoading: false,
          });
        }
      }
    };

    loadGroup();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [groupId]);

  return {
    group,
    viewerRole,
    permissions,
    hasApiData,
    isLoading,
    roleQuery: !hasApiData && viewerRole ? `?role=${viewerRole}` : '',
  };
};
