import { ProfileEditIcon, SettingsIcon } from '@/assets/icons/MyPageIcons';
import { Link } from 'react-router-dom';
import ConfirmModal from '@/shared/components/confirm-modal/ConfirmModal';
import ApplicationDetailPanel from './ApplicationDetailPanel';
import ApplicationResultModal from './ApplicationResultModal';
import { useGroupApplicationReview } from '../hooks/useGroupApplicationReview';
import { useGroupDetailEditing } from '../hooks/useGroupDetailEditing';
import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './GroupDetailContent.css';

const GroupDetailContent = ({
  group,
  permissions,
  applicationPath,
  enableApi = false,
  showApplyButton = true,
}) => {
  const canEditGroup = permissions.canEditGroup;
  const canReviewApplications = permissions.canReviewApplications;
  const canViewApplications = permissions.canViewApplications;
  const leaderIndex = group.members.findIndex(
    (member) => member === group.leaderName
  );
  const review = useGroupApplicationReview({
    groupId: group.groupId ?? group.id,
    enabled: enableApi && canViewApplications,
    initialApplications: group.applications,
  });
  const editing = useGroupDetailEditing({ group, enableApi });

  const decisionMessage = review.selectedApplication && review.pendingDecision
    ? `'${review.selectedApplication.applicantName}'님의 지원을\n${
      review.pendingDecision === 'accept' ? '수락' : '거절'
    }하겠습니까?`
    : '';

  return (
    <>
      <div className="group-detail__body">
        <section className="group-detail__description">
          {editing.editingSection === 'detail' ? (
            <form
              className="group-detail__edit-form"
              onSubmit={editing.saveDetail}
            >
              <label>
                <span>그룹 소개</span>
                <textarea
                  value={editing.detailDraft.description}
                  maxLength={100}
                  required
                  disabled={editing.pendingSection === 'detail'}
                  onChange={(event) => editing.setDetailDraft((current) => ({
                    ...current,
                    description: event.target.value,
                  }))}
                />
              </label>
              <label className="group-detail__capacity-field">
                <span>정원</span>
                <input
                  type="number"
                  value={editing.detailDraft.memberLimit}
                  min={group.memberCount}
                  max="50"
                  required
                  disabled={editing.pendingSection === 'detail'}
                  onChange={(event) => editing.setDetailDraft((current) => ({
                    ...current,
                    memberLimit: event.target.value,
                  }))}
                />
                <small>명</small>
              </label>
              <div className="group-detail__edit-actions">
                <button
                  type="button"
                  disabled={editing.pendingSection === 'detail'}
                  onClick={editing.cancelEdit}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={editing.pendingSection === 'detail'}
                  aria-busy={editing.pendingSection === 'detail'}
                  aria-label={
                    editing.pendingSection === 'detail'
                      ? '그룹 정보 수정 중'
                      : undefined
                  }
                >
                  {editing.pendingSection === 'detail'
                    ? <ButtonSpinner />
                    : '수정'}
                </button>
              </div>
            </form>
          ) : (
            <>
              <p>{editing.detail.description}</p>
              {canEditGroup && !editing.editingSection && (
                <button
                  className="group-detail__edit-icon"
                  type="button"
                  aria-label="그룹 소개와 정원 수정"
                  onClick={editing.beginDetailEdit}
                >
                  <ProfileEditIcon />
                </button>
              )}
            </>
          )}
        </section>

        <section className="group-detail__section">
          <h2>모집기간</h2>
          {editing.editingSection === 'recruitment' ? (
            <form
              className="group-detail__recruitment-form"
              onSubmit={editing.saveRecruitment}
            >
              <div className="group-detail__recruitment-toggle">
                <button
                  className={
                    editing.recruitmentDraft.mode === 'PERIOD'
                      ? 'active'
                      : ''
                  }
                  type="button"
                  aria-pressed={
                    editing.recruitmentDraft.mode === 'PERIOD'
                  }
                  disabled={editing.pendingSection === 'recruitment'}
                  onClick={() => editing.setRecruitmentDraft((current) => ({
                    ...current,
                    mode: 'PERIOD',
                  }))}
                >
                  기간 모집
                </button>
                <button
                  className={
                    editing.recruitmentDraft.mode === 'ALWAYS'
                      ? 'active'
                      : ''
                  }
                  type="button"
                  aria-pressed={
                    editing.recruitmentDraft.mode === 'ALWAYS'
                  }
                  disabled={editing.pendingSection === 'recruitment'}
                  onClick={() => editing.setRecruitmentDraft((current) => ({
                    ...current,
                    mode: 'ALWAYS',
                  }))}
                >
                  상시 모집
                </button>
              </div>
              {editing.recruitmentDraft.mode === 'PERIOD' && (
                <div className="group-detail__date-fields">
                  <input
                    type="date"
                    aria-label="모집 시작일"
                    value={editing.recruitmentDraft.startDate}
                    required
                    disabled={editing.pendingSection === 'recruitment'}
                    onChange={(event) => (
                      editing.setRecruitmentDraft((current) => ({
                        ...current,
                        startDate: event.target.value,
                      }))
                    )}
                  />
                  <span>~</span>
                  <input
                    type="date"
                    aria-label="모집 종료일"
                    value={editing.recruitmentDraft.endDate}
                    min={editing.recruitmentDraft.startDate}
                    required
                    disabled={editing.pendingSection === 'recruitment'}
                    onChange={(event) => (
                      editing.setRecruitmentDraft((current) => ({
                        ...current,
                        endDate: event.target.value,
                      }))
                    )}
                  />
                </div>
              )}
              <div className="group-detail__edit-actions">
                <button
                  type="button"
                  disabled={editing.pendingSection === 'recruitment'}
                  onClick={editing.cancelEdit}
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={editing.pendingSection === 'recruitment'}
                  aria-busy={editing.pendingSection === 'recruitment'}
                  aria-label={
                    editing.pendingSection === 'recruitment'
                      ? '모집기간 수정 중'
                      : undefined
                  }
                >
                  {editing.pendingSection === 'recruitment'
                    ? <ButtonSpinner />
                    : '수정'}
                </button>
              </div>
            </form>
          ) : (
            <div className="group-detail__period">
              <span>{editing.recruitmentPeriod}</span>
              {canEditGroup && !editing.editingSection && (
                <button
                  className="group-detail__period-edit"
                  type="button"
                  aria-label="모집기간 수정"
                  onClick={editing.beginRecruitmentEdit}
                >
                  <ProfileEditIcon />
                </button>
              )}
            </div>
          )}
        </section>

        <section className="group-detail__section">
          <h2>인원</h2>
          <ul className="group-detail__members">
            {group.members.map((member, index) => (
              <li
                key={`${member}-${index}`}
                className={
                  index === leaderIndex ? 'group-detail__member--leader' : ''
                }
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

      {permissions.canApply && showApplyButton && (
        <Link className="group-detail__apply-button" to={applicationPath}>
          지원하기
        </Link>
      )}

      {review.selectedApplication && (
        <ApplicationDetailPanel
          application={review.selectedApplication}
          canManage={canReviewApplications}
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
          isPending={review.isPending}
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
