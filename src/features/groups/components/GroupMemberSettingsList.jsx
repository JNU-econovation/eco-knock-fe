import { CrownIcon } from '@/assets/icons/GroupIcons';
import { useGroupMemberSettings } from '@/features/groups/hooks/useGroupMemberSettings';
import './GroupMemberSettingsList.css';

const GroupMemberSettingsList = ({ group, canManage }) => {
  const {
    members,
    leaderName,
    removeMemberAt,
    delegateLeadership,
  } = useGroupMemberSettings(group);

  return (
    <ul
      className={`group-member-settings-list${
        canManage ? '' : ' group-member-settings-list--read-only'
      }`}
    >
      {members.map((member, index) => {
        const isLeader = member === leaderName;

        return (
          <li key={`${member}-${index}`}>
            <span>{member}</span>
            <button
              className={`group-member-settings-list__crown${
                isLeader ? ' active' : ''
              }`}
              type="button"
              aria-label={`${member}에게 그룹장 위임`}
              aria-pressed={isLeader}
              disabled={!canManage || isLeader}
              onClick={() => delegateLeadership(member)}
            >
              <CrownIcon filled={isLeader} />
            </button>
            {canManage && (
              <button
                className="group-member-settings-list__remove"
                type="button"
                disabled={isLeader}
                onClick={() => removeMemberAt(index)}
              >
                제거
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default GroupMemberSettingsList;
