import SettingsPanel from '@/features/settings/components/SettingsPanel';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';

const SettingPage = () => {
  const handleLogout = () => {
    // TODO: 로그아웃 API와 인증 상태 초기화 방식이 확정되면 연결합니다.
  };

  const handleWithdraw = () => {
    // TODO: 회원 탈퇴 확인과 API 계약이 확정되면 연결합니다.
  };

  return (
    <DetailPageFrame title="설정" variant="panel">
      <SettingsPanel
        onLogout={handleLogout}
        onWithdraw={handleWithdraw}
      />
    </DetailPageFrame>
  );
};

export default SettingPage;
