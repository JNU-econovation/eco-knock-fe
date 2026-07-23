import { Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import GroupSortDropdown from './GroupSortDropdown';
import './GroupsToolbar.css';

const GroupsToolbar = ({
  hideClosedGroups,
  onHideClosedGroupsChange,
  sortOrder,
  onSortOrderChange,
}) => (
  <div className="groups-toolbar">
    <label className="groups-toolbar__closed-filter">
      <span>모집 끝난 그룹 제외</span>
      <input
        type="checkbox"
        checked={hideClosedGroups}
        onChange={(event) => onHideClosedGroupsChange(event.target.checked)}
      />
    </label>

    <GroupSortDropdown
      sortOrder={sortOrder}
      onSortOrderChange={onSortOrderChange}
    />

    <Link className="groups-toolbar__create" to={ROUTES.GROUP_CREATE}>
      만들기 +
    </Link>
  </div>
);

export default GroupsToolbar;
