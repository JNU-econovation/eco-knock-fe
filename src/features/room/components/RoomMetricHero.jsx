import { AIR_QUALITY_LEVELS } from '../constants/roomEnvironment';
import './RoomMetricHero.css';

const RoomMetricHero = ({ metric }) => {
  const currentLevel = metric.type === 'status'
    ? AIR_QUALITY_LEVELS[metric.currentLevel]
    : null;
  const CurrentIcon = currentLevel?.Icon;

  return (
    <div className={`room-metric-hero room-metric-hero--${metric.type}`}>
      {metric.type === 'status' && currentLevel ? (
        <div className="room-metric-hero__status" aria-label={currentLevel.label}>
          <CurrentIcon size={50} />
          <strong>{currentLevel.shortLabel}</strong>
        </div>
      ) : metric.type !== 'status' ? (
        <strong className="room-metric-hero__value">{metric.currentValue}</strong>
      ) : (
        <div className="room-metric-hero__status">
          <strong>–</strong>
        </div>
      )}
    </div>
  );
};

export default RoomMetricHero;
