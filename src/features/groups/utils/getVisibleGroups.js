export const getVisibleGroups = ({
  groups,
  myGroupIds,
  activeView,
  hideClosedGroups,
  sortOrder,
}) => {
  const viewGroups = activeView === 'mine'
    ? groups.filter((group) => myGroupIds.includes(group.id))
    : groups;
  const filteredGroups = hideClosedGroups
    ? viewGroups.filter((group) => group.isRecruiting)
    : viewGroups;

  if (sortOrder === 'name-asc') {
    return [...filteredGroups].sort((a, b) =>
      a.name.localeCompare(b.name, 'ko')
    );
  }

  if (sortOrder === 'name-desc') {
    return [...filteredGroups].sort((a, b) =>
      b.name.localeCompare(a.name, 'ko')
    );
  }

  if (sortOrder === 'recent') {
    return [...filteredGroups].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortOrder === 'closing-soon') {
    return [...filteredGroups].sort(
      (a, b) => {
        if (a.isRecruiting !== b.isRecruiting) {
          return Number(b.isRecruiting) - Number(a.isRecruiting);
        }

        const aEndTime = a.recruitmentEndsAt
          ? new Date(a.recruitmentEndsAt).getTime()
          : Number.POSITIVE_INFINITY;
        const bEndTime = b.recruitmentEndsAt
          ? new Date(b.recruitmentEndsAt).getTime()
          : Number.POSITIVE_INFINITY;

        return aEndTime - bEndTime;
      }
    );
  }

  return filteredGroups;
};
