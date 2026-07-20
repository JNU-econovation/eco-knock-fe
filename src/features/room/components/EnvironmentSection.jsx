import { AIR_QUALITY_LEVELS } from '../constants/mockRoomEnvironment';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import './EnvironmentSection.css';

const ValueReading = ({ reading }) => (
  <li className="environment-section__reading environment-section__reading--value">
    <span className="environment-section__reading-value">{reading.value}</span>
    <time className="environment-section__reading-time">{reading.time}</time>
  </li>
);

const StatusReading = ({ reading }) => {
  const level = AIR_QUALITY_LEVELS[reading.value];
  const { Icon } = level;

  return (
    <li
      className="environment-section__reading environment-section__reading--status"
      aria-label={`${reading.time} ${level.label}`}
    >
      <Icon size={20} />
      <span className="environment-section__reading-label">{level.shortLabel}</span>
      <time className="environment-section__reading-time">{reading.time}</time>
    </li>
  );
};

const EnvironmentSection = ({ section }) => {
  const horizontalDragScrollHandlers = useHorizontalDragScroll(section.readings.length);
  const isStatus = section.type === 'status';
  const currentLevel = isStatus
    ? AIR_QUALITY_LEVELS[section.currentLevel]
    : null;
  const CurrentIcon = currentLevel?.Icon;

  return (
    <section className="environment-section" aria-labelledby={`${section.id}-title`}>
      <h2 className="environment-section__title" id={`${section.id}-title`}>
        {section.title}
      </h2>

      <div className={`environment-section__card environment-section__card--${section.type}`}>
        <div className="environment-section__current">
          {isStatus ? (
            <>
              <CurrentIcon size={50} />
              <strong className="environment-section__current-status">
                {currentLevel.shortLabel}
              </strong>
            </>
          ) : (
            <strong className="environment-section__current-value">
              {section.currentValue}
            </strong>
          )}
        </div>

        <div
          className="environment-section__scroll"
          role="region"
          aria-label={`${section.title} 시간별 정보`}
          tabIndex="0"
          onDragStart={(event) => event.preventDefault()}
          {...horizontalDragScrollHandlers}
        >
          <ul className="environment-section__readings">
            {section.readings.map((reading) => (
              isStatus
                ? <StatusReading key={reading.id} reading={reading} />
                : <ValueReading key={reading.id} reading={reading} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentSection;
