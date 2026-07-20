import { useRef, useState } from 'react';
import { DoorbellIcon } from '@/assets/icons/RoomIcons';
import EnvironmentSection from '@/features/room/components/EnvironmentSection';
import { ROOM_METRICS } from '@/features/room/constants/mockRoomEnvironment';
import { useRoomIntervals } from '@/features/room/hooks/useRoomIntervals';
import DevelopmentNotice from '@/shared/components/development-notice/DevelopmentNotice';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import './RoomPage.css';

const RoomPage = () => {
  const { defaultIntervals } = useRoomIntervals();
  const [isDoorbellNoticeOpen, setIsDoorbellNoticeOpen] = useState(false);
  const doorbellButtonRef = useRef(null);

  const handleConfirmNotice = () => {
    setIsDoorbellNoticeOpen(false);
    doorbellButtonRef.current?.focus();
  };

  const headerAction = (
    <div className="room-page__doorbell-area">
      {isDoorbellNoticeOpen && (
        <div className="room-page__doorbell-notice">
          <DevelopmentNotice onConfirm={handleConfirmNotice} />
        </div>
      )}
      <button
        ref={doorbellButtonRef}
        className="room-page__doorbell-button"
        type="button"
        aria-label="초인종"
        aria-haspopup="dialog"
        aria-expanded={isDoorbellNoticeOpen}
        onClick={() => setIsDoorbellNoticeOpen(true)}
      >
        <DoorbellIcon />
        <span>초인종</span>
      </button>
    </div>
  );

  return (
    <MainPageFrame
      title="ECO-KNOCK"
      headerAction={headerAction}
      className="room-page-frame"
    >
      <div className="room-page__content">
        {ROOM_METRICS.map((metric) => (
          <EnvironmentSection
            key={metric.id}
            section={{
              ...metric,
              readings: metric.histories[defaultIntervals[metric.id]],
            }}
          />
        ))}
      </div>
    </MainPageFrame>
  );
};

export default RoomPage;
