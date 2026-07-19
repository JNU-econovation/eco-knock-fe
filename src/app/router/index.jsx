import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import CollectionPage from '@/pages/CollectionPage';
import CoinPage from '@/pages/CoinPage';
import MyPage from '@/pages/MyPage';
import SettingPage from '@/pages/SettingPage';
import AppLayout from '@/shared/components/layout/AppLayout';
import DetailLayout from '@/shared/components/layout/DetailLayout';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<CollectionPage />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={ROUTES.ROOM} element={<CollectionPage />} />
        <Route path={ROUTES.RECRUIT} element={<CollectionPage />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
      </Route>

      <Route element={<DetailLayout backButtonVariant="circle" />}>
        <Route path={ROUTES.MYPAGE_COIN} element={<CoinPage />} />
      </Route>
      <Route element={<DetailLayout backButtonVariant="bare" />}>
        <Route path={ROUTES.MYPAGE_SETTINGS} element={<SettingPage />} />
      </Route>
    </Routes>
  );
}
