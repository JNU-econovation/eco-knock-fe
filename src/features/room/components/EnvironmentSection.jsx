import { Link } from 'react-router-dom';
import { AIR_QUALITY_LEVELS } from '../constants/roomEnvironment';
import { useHorizontalDragScroll } from '../hooks/useHorizontalDragScroll';
import EnvironmentReading from './EnvironmentReading';
import './EnvironmentSection.css';

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
        <Link className="environment-section__title-link" to={section.path}>
          {section.title}
        </Link>
      </h2>

      <div className={`environment-section__card environment-section__card--${section.type}`}>
        <Link
          className="environment-section__current"
          to={section.path}
          aria-label={`${section.title} 상세 보기`}
        >
          {isStatus && currentLevel ? (
            <>
              <CurrentIcon size={50} />
              <strong className="environment-section__current-status">
                {currentLevel.shortLabel}
              </strong>
            </>
          ) : !isStatus ? (
            <strong className="environment-section__current-value">
              {section.currentValue}
            </strong>
          ) : (
            <strong className="environment-section__current-status">–</strong>
          )}
        </Link>

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
              <EnvironmentReading
                key={reading.id}
                reading={reading}
                type={section.type}
              />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default EnvironmentSection;
