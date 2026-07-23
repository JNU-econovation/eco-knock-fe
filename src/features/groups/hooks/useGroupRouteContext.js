import { useParams, useSearchParams } from 'react-router-dom';
import {
  GROUPS,
  MY_GROUP_IDS,
} from '@/features/groups/constants/groupData';
import { getGroupViewerRole } from '@/features/groups/utils/groupViewerRole';

export const useGroupRouteContext = () => {
  const { groupId } = useParams();
  const [searchParams] = useSearchParams();
  const group = GROUPS.find((item) => item.id === groupId);
  const viewerRole = group
    ? getGroupViewerRole({
      group,
      myGroupIds: MY_GROUP_IDS,
      requestedRole: searchParams.get('role'),
    })
    : null;

  return {
    group,
    viewerRole,
    roleQuery: viewerRole ? `?role=${viewerRole}` : '',
  };
};
