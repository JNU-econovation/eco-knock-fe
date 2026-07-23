import { useEffect, useRef, useState } from 'react';
import {
  delegateGroupLeadership,
  getGroupMembers,
  removeGroupMember,
} from '@/features/groups/api/groupsApi';

const getMockMembers = (group) => (
  group.members.map((name, index) => ({
    memberId: `mock-${index}`,
    name,
    leader: name === group.leaderName,
  }))
);

export const useGroupMemberSettings = ({
  group,
  enableApi,
  onLeadershipDelegated,
}) => {
  const groupId = group.groupId ?? group.id;
  const [members, setMembers] = useState(() => getMockMembers(group));
  const [pendingAction, setPendingAction] = useState(null);
  const pendingActionRef = useRef(null);

  useEffect(() => {
    if (!enableApi) return undefined;

    const controller = new AbortController();
    let isActive = true;

    const loadMembers = async () => {
      try {
        const response = await getGroupMembers(groupId, controller.signal);

        if (isActive) setMembers(response.data.result ?? []);
      } catch {
        // The shared API client handles the error.
      }
    };

    loadMembers();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [enableApi, groupId]);

  const removeMember = async (member) => {
    if (member.leader || pendingActionRef.current) return;

    pendingActionRef.current = `remove-${member.memberId}`;
    setPendingAction(`remove-${member.memberId}`);

    try {
      if (enableApi) {
        await removeGroupMember(groupId, member.memberId);
      }
      setMembers((current) =>
        current.filter((item) => item.memberId !== member.memberId)
      );
    } catch {
      // The shared API client handles the error.
    } finally {
      pendingActionRef.current = null;
      setPendingAction(null);
    }
  };

  const delegateLeadership = async (member) => {
    if (member.leader || pendingActionRef.current) return;

    pendingActionRef.current = `delegate-${member.memberId}`;
    setPendingAction(`delegate-${member.memberId}`);

    try {
      if (enableApi) {
        await delegateGroupLeadership(groupId, member.memberId);
      }
      setMembers((current) =>
        current.map((item) => ({
          ...item,
          leader: item.memberId === member.memberId,
        }))
      );
      onLeadershipDelegated?.();
    } catch {
      // The shared API client handles the error.
    } finally {
      pendingActionRef.current = null;
      setPendingAction(null);
    }
  };

  return {
    members,
    pendingAction,
    removeMember,
    delegateLeadership,
  };
};
