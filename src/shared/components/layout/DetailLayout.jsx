import { Outlet } from 'react-router-dom';
import DetailBackButton from './DetailBackButton';
import './DetailLayout.css';

const DetailLayout = ({ variant = 'plain' }) => (
  <div className={`detail-layout detail-layout--${variant}`}>
    <div className="detail-layout__back-button">
      <DetailBackButton variant={variant} />
    </div>
    <Outlet />
  </div>
);

export default DetailLayout;
