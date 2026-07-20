import EnvironmentReading from './EnvironmentReading';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import './RoomIntervalCard.css';

const RoomIntervalCard = ({
  interval,
  readings,
  metricType,
  isDefault,
  onSetDefault,
}) => {
  const horizontalDragScrollHandlers = useHorizontalDragScroll(readings.length);

  return (
    <section className="room-interval-card" aria-labelledby={`${interval.id}-interval-title`}>
      <div className="room-interval-card__header">
        <h2 id={`${interval.id}-interval-title`}>{interval.label}</h2>
        <button
          className={`room-interval-card__default-button${isDefault ? ' room-interval-card__default-button--active' : ''}`}
          type="button"
          aria-pressed={isDefault}
          onClick={onSetDefault}
        >
          기본
        </button>
      </div>

      <div
        className="room-interval-card__scroll"
        role="region"
        aria-label={`${interval.label} 시간별 정보`}
        tabIndex="0"
        onDragStart={(event) => event.preventDefault()}
        {...horizontalDragScrollHandlers}
      >
        <ul className="room-interval-card__readings">
          {readings.map((reading) => (
            <EnvironmentReading
              key={reading.id}
              reading={reading}
              type={metricType}
              variant="detail"
            />
          ))}
        </ul>
      </div>
    </section>
  );
};

export default RoomIntervalCard;
