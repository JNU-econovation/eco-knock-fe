import './DetailPageFrame.css';

const DetailPageFrame = ({ title, variant = 'plain', children }) => (
  <div className={`detail-page-frame detail-page-frame--${variant}`}>
    <header className="detail-page-frame__header">
      <h1 className="detail-page-frame__title">{title}</h1>
    </header>
    <div className="detail-page-frame__content">{children}</div>
  </div>
);

export default DetailPageFrame;
