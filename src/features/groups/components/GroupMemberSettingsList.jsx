import { CrownIcon } from '@/assets/icons/GroupIcons';
import { useGroupMemberSettings } from '@/features/groups/hooks/useGroupMemberSettings';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './GroupMemberSettingsList.css';

const GroupMemberSettingsList = ({
  group,
  canManage,
  enableApi,
  onLeadershipDelegated,
}) => {
  const {
    members,
    pendingAction,
    removeMember,
    delegateLeadership,
  } = useGroupMemberSettings({
    group,
    enableApi,
    onLeadershipDelegated,
  });

  return (
    <ul
      className={`group-member-settings-list${
        canManage ? '' : ' group-member-settings-list--read-only'
      }`}
    >
      {members.map((member) => {
        const isLeader = member.leader;
        const isDelegating =
          pendingAction === `delegate-${member.memberId}`;
        const isRemoving =
          pendingAction === `remove-${member.memberId}`;

        return (
          <li key={member.memberId}>
            <span>{member.name}</span>
            <button
              className={`group-member-settings-list__crown${
                isLeader ? ' active' : ''
              }`}
              type="button"
              aria-label={
                isDelegating
                  ? `${member.name}에게 그룹장 위임 중`
                  : `${member.name}에게 그룹장 위임`
              }
              aria-pressed={isLeader}
              aria-busy={isDelegating}
              disabled={!canManage || isLeader || Boolean(pendingAction)}
              onClick={() => delegateLeadership(member)}
            >
              {isDelegating
                ? <ButtonSpinner />
                : <CrownIcon filled={isLeader} />}
            </button>
            {canManage && (
              <button
                className="group-member-settings-list__remove"
                type="button"
                aria-busy={isRemoving}
                aria-label={
                  isRemoving ? `${member.name} 제거 중` : undefined
                }
                disabled={isLeader || Boolean(pendingAction)}
                onClick={() => removeMember(member)}
              >
                {isRemoving ? <ButtonSpinner /> : '제거'}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GroupMemberSettingsList;
