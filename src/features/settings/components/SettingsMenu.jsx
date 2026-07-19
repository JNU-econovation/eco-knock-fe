import './SettingsMenu.css';

const SettingsMenu = ({ onRequestLogout, onRequestWithdraw }) => (
  <div className="settings-menu" role="group" aria-label="계정 설정">
    <button
      className="settings-menu__button"
      type="button"
      onClick={onRequestLogout}
    >
      로그 아웃
    </button>
    <button
      className="settings-menu__button settings-menu__button--danger"
      type="button"
      onClick={onRequestWithdraw}
    >
      어플 탈퇴
    </button>
  </div>
);

export default SettingsMenu;
