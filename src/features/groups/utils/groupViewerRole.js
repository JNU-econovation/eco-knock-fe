const VIEWER_ROLES = new Set(['leader', 'member', 'guest']);

// TODO: Replace this temporary role resolution with the groups API permission data.
export const getGroupViewerRole = ({
  group,
  myGroupIds,
  requestedRole,
}) => {
  if (VIEWER_ROLES.has(requestedRole)) return requestedRole;
  if (group.isLeader) return 'leader';
  if (myGroupIds.includes(group.id)) return 'member';
  return 'guest';
};
