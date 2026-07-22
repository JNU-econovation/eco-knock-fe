import RoomIntervalCard from '@/features/room/components/RoomIntervalCard';
import RoomMetricHero from '@/features/room/components/RoomMetricHero';
import {
  getRoomMetric,
  ROOM_INTERVALS,
} from '@/features/room/constants/roomEnvironment';
import { useRoomIntervals } from '@/features/room/hooks/useRoomIntervals';
import { useRoomMetricDetail } from '@/features/room/hooks/useRoomMetricDetail';
import DetailPageFrame from '@/shared/components/layout/DetailPageFrame';
import './RoomEnvironmentDetailPage.css';

const RoomEnvironmentDetailPage = ({ metricId }) => {
  const metric = getRoomMetric(metricId);
  const { defaultIntervals, setDefaultInterval } = useRoomIntervals();
  const { displayMetric, histories } = useRoomMetricDetail(metric);

  return (
    <DetailPageFrame title={metric.title} variant="plain">
      <div className="room-environment-detail">
        <p className="room-environment-detail__description">
          {metric.description}
        </p>

        <RoomMetricHero metric={displayMetric} />

        <div className="room-environment-detail__intervals">
          {ROOM_INTERVALS.map((interval) => (
            <RoomIntervalCard
              key={interval.id}
              interval={interval}
              readings={histories[interval.id] ?? []}
              metricType={metric.type}
              isDefault={defaultIntervals[metric.id] === interval.id}
              onSetDefault={() => setDefaultInterval(metric.id, interval.id)}
            />
          ))}
        </div>
      </div>
    </DetailPageFrame>
  );
};

export default RoomEnvironmentDetailPage;
