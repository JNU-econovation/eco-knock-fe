import './MainPageFrame.css';

const MainPageFrame = ({ title, headerAction, children }) => (
  <div className="main-page-frame">
    <header className="main-page-frame__header">
      <h1 className="main-page-frame__title">{title}</h1>
      {headerAction && (
        <div className="main-page-frame__header-action">
          {headerAction}
        </div>
      )}
    </header>
    <div className="main-page-frame__content">{children}</div>
  </div>
);

export default MainPageFrame;
