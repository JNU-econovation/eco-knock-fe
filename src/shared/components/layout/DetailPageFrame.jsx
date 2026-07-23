import './DetailPageFrame.css';

const DetailPageFrame = ({
  title,
  headerAction,
  variant = 'plain',
  className = '',
  children,
}) => (
  <div
    className={
      `detail-page-frame detail-page-frame--${variant} ${className}`.trim()
    }
  >
    <header className="detail-page-frame__header">
      <h1 className="detail-page-frame__title">{title}</h1>
      {headerAction && (
        <div className="detail-page-frame__header-action">
          {headerAction}
        </div>
      )}
    </header>
    <div className="detail-page-frame__content">{children}</div>
  </div>
);

export default DetailPageFrame;
