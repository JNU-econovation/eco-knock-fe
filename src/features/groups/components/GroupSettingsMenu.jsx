import { generatePath, Link } from 'react-router-dom';
import { ChevronRightIcon } from '@/assets/icons/GroupIcons';
import { ROUTES } from '@/shared/constants/routes';
import './GroupSettingsMenu.css';

const GroupSettingsMenu = ({ group, permissions, roleQuery, onDelete }) => {
  const memberSettingsPath =
    generatePath(ROUTES.GROUP_MEMBER_SETTINGS, { groupId: group.id }) +
    roleQuery;

  return (
    <div className="group-settings-menu">
      <section>
        <h2>그룹 정보</h2>
        <div className="group-settings-menu__rows">
          {permissions.canEditGroup ? (
            <Link
              className="group-settings-menu__row"
              to={
                generatePath(ROUTES.GROUP_NAME_SETTINGS, {
                  groupId: group.id,
                }) + roleQuery
              }
            >
              <span>그룹 이름</span>
              <span className="group-settings-menu__value">
                {group.name}
                <ChevronRightIcon />
              </span>
            </Link>
          ) : (
            <div className="group-settings-menu__row">
              <span>그룹 이름</span>
              <span className="group-settings-menu__value">{group.name}</span>
            </div>
          )}

          <Link
            className="group-settings-menu__row"
            to={memberSettingsPath}
          >
            <span>그룹 멤버</span>
            <span className="group-settings-menu__value">
              <ChevronRightIcon />
            </span>
          </Link>
        </div>
      </section>

      {permissions.canDeleteGroup && (
        <button
          className="group-settings-menu__delete"
          type="button"
          onClick={onDelete}
        >
          그룹 제거
        </button>
      )}
    </div>
  );
};

export default GroupSettingsMenu;
