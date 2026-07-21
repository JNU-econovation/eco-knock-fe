import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import CollectionPage from '@/pages/CollectionPage';
import CoinLogPage from '@/pages/CoinLogPage';
import CoinPage from '@/pages/CoinPage';
import MyPage from '@/pages/MyPage';
import RoomPage from '@/pages/RoomPage';
import RoomEnvironmentDetailPage from '@/pages/RoomEnvironmentDetailPage';
import AppLayout from '@/shared/components/layout/AppLayout';
import DetailLayout from '@/shared/components/layout/DetailLayout';

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<CollectionPage />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={ROUTES.ROOM} element={<RoomPage />} />
        <Route path={ROUTES.RECRUIT} element={<CollectionPage />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
      </Route>

      <Route element={<DetailLayout />}>
        <Route
          path={ROUTES.ROOM_TEMPERATURE}
          element={<RoomEnvironmentDetailPage metricId="temperature" />}
        />
        <Route
          path={ROUTES.ROOM_HUMIDITY}
          element={<RoomEnvironmentDetailPage metricId="humidity" />}
        />
        <Route
          path={ROUTES.ROOM_FINE_DUST}
          element={<RoomEnvironmentDetailPage metricId="fine-dust" />}
        />
        <Route
          path={ROUTES.ROOM_AIR_QUALITY}
          element={<RoomEnvironmentDetailPage metricId="air-quality" />}
        />
        <Route path={ROUTES.MYPAGE_COIN} element={<CoinPage />} />
        <Route path={ROUTES.MYPAGE_COIN_LOG} element={<CoinLogPage />} />
      </Route>
    </Routes>
  );
}
