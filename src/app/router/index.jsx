// app/router/index.jsx
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '@/shared/config/routes';

// pages에서 각 페이지 컴포넌트 import
import CollectionPage  from '@/pages/CollectionPage';

// 공통 레이아웃 (nav바 등)
import AppLayout from '@/shared/components/layout/AppLayout';

export default function AppRouter() {
  return (
    <Routes>
      {/* AppLayout이 모든 페이지를 감쌈 */}
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME}         element={<CollectionPage />} />
        <Route path={ROUTES.COLLECTION}   element={<CollectionPage />} />
      </Route>
    </Routes>
  );
}