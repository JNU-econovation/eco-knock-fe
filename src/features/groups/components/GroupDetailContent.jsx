import { ProfileEditIcon, SettingsIcon } from '@/assets/icons/MyPageIcons';
import { Link } from 'react-router-dom';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import ApplicationDetailPanel from './ApplicationDetailPanel';
import ApplicationResultModal from './ApplicationResultModal';
import { useGroupApplicationReview } from '../hooks/useGroupApplicationReview';
import './GroupDetailContent.css';

const GroupDetailContent = ({
  group,
  viewerRole,
  applicationPath,
  showApplyButton = true,
}) => {
  const canManage = viewerRole === 'leader';
  const canViewApplications =
    viewerRole === 'leader' || viewerRole === 'member';
  const review = useGroupApplicationReview(group.applications);

  const decisionMessage = review.selectedApplication && review.pendingDecision
    ? `'${review.selectedApplication.applicantName}'님의 지원을\n${
      review.pendingDecision === 'accept' ? '수락' : '거절'
    }하겠습니까?`
    : '';

  return (
    <>
      <div className="group-detail__body">
        <section className="group-detail__description">
          <p>{group.description}</p>
          {canManage && (
            <button type="button" aria-label="그룹 소개 수정" disabled>
              <ProfileEditIcon />
            </button>
          )}
        </section>

        <section className="group-detail__section">
          <h2>모집기간</h2>
          <div className="group-detail__period">
            <span>{group.recruitmentPeriod}</span>
            {canManage && (
              <button type="button" aria-label="모집기간 수정" disabled>
                <ProfileEditIcon />
              </button>
            )}
          </div>
        </section>

        <section className="group-detail__section">
          <h2>인원</h2>
          <ul className="group-detail__members">
            {group.members.map((member, index) => (
              <li
                key={`${member}-${index}`}
                className={index === 0 ? 'group-detail__member--leader' : ''}
              >
                {member}
              </li>
            ))}
          </ul>
        </section>

        {canViewApplications && (
          <section className="group-detail__section group-detail__applications">
            <h2>지원자 보기</h2>
            <ul>
              {review.applications.map((application) => (
                <li key={application.id}>
                  <span>{application.applicantName}</span>
                  <button
                    type="button"
                    onClick={() => review.openApplication(application)}
                  >
                    지원서
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {viewerRole === 'guest' && showApplyButton && (
        <Link className="group-detail__apply-button" to={applicationPath}>
          지원하기
        </Link>
      )}

      {review.selectedApplication && (
        <ApplicationDetailPanel
          application={review.selectedApplication}
          canManage={canManage}
          onClose={review.closeApplication}
          onReject={() => review.requestDecision('reject')}
          onAccept={() => review.requestDecision('accept')}
        />
      )}

      {review.pendingDecision && (
        <ConfirmModal
          message={decisionMessage}
          confirmLabel={
            review.pendingDecision === 'accept' ? '지원 수락' : '지원 거절'
          }
          confirmVariant={
            review.pendingDecision === 'accept' ? 'primary' : 'danger'
          }
          onConfirm={review.confirmDecision}
          onCancel={review.cancelDecision}
        />
      )}

      {review.result && (
        <ApplicationResultModal
          result={review.result}
          onClose={review.closeResult}
        />
      )}
    </>
  );
};

export const GroupSettingsButton = ({ to }) => (
  <Link
    className="group-detail__settings-button"
    to={to}
    aria-label="그룹 설정"
  >
    <SettingsIcon />
  </Link>
);

export default GroupDetailContent;
