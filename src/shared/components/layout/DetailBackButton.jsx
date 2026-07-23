import { useNavigate } from 'react-router-dom';
import { BackIcon } from '@/assets/icons/LayoutIcons';
import { ROUTES } from '@/shared/constants/routes';
import './DetailBackButton.css';

const DetailBackButton = ({ variant = 'plain' }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    const hasAppHistory = (window.history.state?.idx ?? 0) > 0;

    if (hasAppHistory) {
      navigate(-1);
      return;
    }

    navigate(ROUTES.HOME, { replace: true });
  };

  return (
    <button
      className={
        `detail-back-button detail-back-button--${variant}`
      }
      type="button"
      aria-label="뒤로 가기"
      onClick={handleBack}
    >
      <BackIcon />
    </button>
  );
};

export default DetailBackButton;
