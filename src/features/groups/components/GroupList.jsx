import GroupCard from './GroupCard';
import './GroupList.css';

const GroupList = ({ groups, highlightLeaderCards = false }) => (
  <div className="group-list">
    {groups.map((group) => (
      <GroupCard
        key={group.id}
        group={group}
        isLeaderHighlighted={highlightLeaderCards && group.isLeader}
      />
    ))}
  </div>
);

export default GroupList;
