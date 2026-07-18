import { Outlet } from 'react-router-dom';
import DetailBackButton from './DetailBackButton';
import './DetailLayout.css';

const DetailLayout = () => (
  <div className="detail-layout">
    <div className="detail-layout__back-button">
      <DetailBackButton />
    </div>
    <Outlet />
  </div>
);

export default DetailLayout;
