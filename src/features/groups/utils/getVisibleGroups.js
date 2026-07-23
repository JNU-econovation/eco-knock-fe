export const getVisibleGroups = ({
  groups,
  hideClosedGroups,
  sortOrder,
}) => {
  const filteredGroups = hideClosedGroups
    ? groups.filter((group) => (
      group.recruitmentStatusCode
        ? group.recruitmentStatusCode !== 'CLOSED'
        : group.isRecruiting
    ))
    : groups;

  if (sortOrder === 'NAME_ASC') {
    return [...filteredGroups].sort((a, b) =>
      a.name.localeCompare(b.name, 'ko')
    );
  }

  if (sortOrder === 'NAME_DESC') {
    return [...filteredGroups].sort((a, b) =>
      b.name.localeCompare(a.name, 'ko')
    );
  }

  if (sortOrder === 'RECENT') {
    return [...filteredGroups].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  }

  if (sortOrder === 'DEADLINE_ASC') {
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
