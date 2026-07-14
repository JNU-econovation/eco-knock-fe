// shared/components/layout/AppLayout.jsx
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import ChatOverlay from '@/features/chat/components/ChatOverlay';
import BottomNav from './BottomNav';
import './AppLayout.css';

const AppLayout = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="app-layout">
      <main className="app-layout__main">
        {/* 현재 라우트에 해당하는 페이지 컴포넌트가 여기 들어옴 */}
        <Outlet />
      </main>
      <ChatOverlay
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />
      {/* 하단바 */}
      <BottomNav
        isChatOpen={isChatOpen}
        onToggleChat={() => setIsChatOpen((prev) => !prev)}
        onCloseChat={() => setIsChatOpen(false)}
      />
    </div>
  );
};

export default AppLayout;
