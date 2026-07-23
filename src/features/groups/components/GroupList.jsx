import GroupCard from './GroupCard';
import './GroupList.css';

const GroupList = ({ groups }) => (
  <div className="group-list">
    {groups.map((group) => (
      <GroupCard
        key={group.id}
        group={group}
        isLeaderHighlighted={group.isLeader}
      />
    ))}
  </div>
);

export default GroupList;
