import { AIR_QUALITY_LEVELS } from '../constants/mockRoomEnvironment';
import './RoomMetricHero.css';

const RoomMetricHero = ({ metric }) => {
  const currentLevel = metric.type === 'status'
    ? AIR_QUALITY_LEVELS[metric.currentLevel]
    : null;
  const CurrentIcon = currentLevel?.Icon;

  return (
    <div className={`room-metric-hero room-metric-hero--${metric.type}`}>
      {metric.type === 'status' ? (
        <div className="room-metric-hero__status" aria-label={currentLevel.label}>
          <CurrentIcon size={50} />
          <strong>{currentLevel.shortLabel}</strong>
        </div>
      ) : (
        <strong className="room-metric-hero__value">{metric.currentValue}</strong>
      )}
    </div>
  );
};

export default RoomMetricHero;
