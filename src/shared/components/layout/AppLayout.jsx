// shared/components/layout/AppLayout.jsx
import { Outlet } from 'react-router-dom';
import BottomNav from './BottomNav';
import './AppLayout.css';

const AppLayout = () => {
  return (
    <div className="app-layout">
      <main className="app-layout__main">
        {/* 현재 라우트에 해당하는 페이지 컴포넌트가 여기 들어옴 */}
        <Outlet />
      </main>
      {/* 하단바 */}
      <BottomNav />
    </div>
  );
};

export default AppLayout;