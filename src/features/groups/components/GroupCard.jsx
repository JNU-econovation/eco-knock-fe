import { generatePath, Link } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import './GroupCard.css';

const GroupCard = ({ group, isLeaderHighlighted = false }) => (
  <Link
    className="group-card__link"
    to={generatePath(ROUTES.GROUP_DETAIL, { groupId: group.id })}
  >
    <article
      className={`group-card${
        isLeaderHighlighted ? ' group-card--leader' : ''
      }`}
    >
      <div className="group-card__heading">
        <h2 className="group-card__name">{group.name}</h2>
        <span className="group-card__category">{group.category}</span>
      </div>

      <dl className="group-card__details">
        <div className="group-card__detail">
          <dt>인원</dt>
          <dd>{group.memberCount}/{group.memberLimit}</dd>
        </div>
        <div className="group-card__detail">
          <dt>부장</dt>
          <dd>{group.leaderName}</dd>
        </div>
        <div className="group-card__detail">
          <dt>모집</dt>
          <dd>{group.recruitmentStatus}</dd>
        </div>
      </dl>
    </article>
  </Link>
);

export default GroupCard;
