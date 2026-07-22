import { AIR_QUALITY_LEVELS } from '../constants/roomEnvironment';
import './EnvironmentReading.css';

const EnvironmentReading = ({ reading, type, variant = 'compact' }) => {
  if (type === 'status') {
    const level = AIR_QUALITY_LEVELS[reading.value];
    if (!level) {
      return (
        <li className={`environment-reading environment-reading--status environment-reading--${variant}`}>
          <span className="environment-reading__label">–</span>
          <time className="environment-reading__time">{reading.time}</time>
        </li>
      );
    }

    const { Icon } = level;

    return (
      <li
        className={`environment-reading environment-reading--status environment-reading--${variant}`}
        aria-label={`${reading.time} ${level.label}`}
      >
        <Icon size={20} />
        <span className="environment-reading__label">{level.shortLabel}</span>
        <time className="environment-reading__time">{reading.time}</time>
      </li>
    );
  }

  return (
    <li className={`environment-reading environment-reading--value environment-reading--${variant}`}>
      <span className="environment-reading__value">{reading.value}</span>
      <time className="environment-reading__time">{reading.time}</time>
    </li>
  );
};

export default EnvironmentReading;
