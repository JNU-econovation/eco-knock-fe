import { Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import CollectionPage from '@/pages/CollectionPage';
import AdminLoginPage from '@/pages/AdminLoginPage';
import CoinLogPage from '@/pages/CoinLogPage';
import CoinPage from '@/pages/CoinPage';
import MyPage from '@/pages/MyPage';
import LoginPage from '@/pages/LoginPage';
import RoomPage from '@/pages/RoomPage';
import RoomEnvironmentDetailPage from '@/pages/RoomEnvironmentDetailPage';
import GroupsPage from '@/pages/GroupsPage';
import GroupDetailPage from '@/pages/GroupDetailPage';
import GroupSettingsPage from '@/pages/GroupSettingsPage';
import GroupNameSettingsPage from '@/pages/GroupNameSettingsPage';
import GroupMemberSettingsPage from '@/pages/GroupMemberSettingsPage';
import GroupCreatePage from '@/pages/GroupCreatePage';
import GroupApplicationPage from '@/pages/GroupApplicationPage';
import AppLayout from '@/shared/components/layout/AppLayout';
import DetailLayout from '@/shared/components/layout/DetailLayout';

export default function AppRouter() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      
      <Route element={<AppLayout />}>
        <Route path={ROUTES.HOME} element={<CollectionPage />} />
        <Route path={ROUTES.COLLECTION} element={<CollectionPage />} />
        <Route path={ROUTES.ROOM} element={<RoomPage />} />
        <Route path={ROUTES.GROUPS} element={<GroupsPage />} />
        <Route path={ROUTES.MYPAGE} element={<MyPage />} />
      </Route>

      <Route element={<DetailLayout />}>
        <Route path={ROUTES.LOGIN_ADMIN} element={<AdminLoginPage />} />
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
        <Route path={ROUTES.GROUP_CREATE} element={<GroupCreatePage />} />
        <Route path={ROUTES.GROUP_DETAIL} element={<GroupDetailPage />} />
        <Route
          path={ROUTES.GROUP_APPLICATION}
          element={<GroupApplicationPage />}
        />
      </Route>

      <Route element={<DetailLayout variant="primary-light" />}>
        <Route
          path={ROUTES.GROUP_SETTINGS}
          element={<GroupSettingsPage />}
        />
        <Route
          path={ROUTES.GROUP_NAME_SETTINGS}
          element={<GroupNameSettingsPage />}
        />
        <Route
          path={ROUTES.GROUP_MEMBER_SETTINGS}
          element={<GroupMemberSettingsPage />}
        />
      </Route>
    </Routes>
  );
}
