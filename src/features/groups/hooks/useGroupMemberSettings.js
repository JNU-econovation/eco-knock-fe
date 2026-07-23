import { useState } from 'react';

export const useGroupMemberSettings = (group) => {
  const [members, setMembers] = useState(group.members);
  const [leaderName, setLeaderName] = useState(group.leaderName);

  return {
    members,
    leaderName,
    removeMemberAt: (memberIndex) => {
      if (members[memberIndex] === leaderName) return;
      setMembers((current) =>
        current.filter((_, index) => index !== memberIndex)
      );
    },
    delegateLeadership: setLeaderName,
  };
};
