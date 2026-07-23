import { useRef, useState } from 'react';
import { ProfileEditIcon } from '@/assets/icons/MyPageIcons';
import defaultProfileImage from '@/assets/img/default-profile.png';
import DevelopmentNotice from '@/shared/components/development-notice/DevelopmentNotice';
import { getMemberRoleLabel } from '../utils/memberRole';
import './UserProfileCard.css';

const getCohortDisplayValue = (cohort) => (
  cohort?.value === null ||
  cohort?.value === undefined ||
  cohort?.value === ''
    ? ''
    : `${cohort.value}기`
);

const UserProfileCard = ({ user }) => {
  const [hasImageError, setHasImageError] = useState(false);
  const [isEditNoticeOpen, setIsEditNoticeOpen] = useState(false);
  const editButtonRef = useRef(null);
  const profile = user ?? {};
  const profileName = typeof profile.name === 'string'
    ? profile.name.trim()
    : '';
  const activeStatus = typeof profile.activeStatus === 'string'
    ? profile.activeStatus.trim()
    : '';
  const displayName = profileName || '사용자';
  const roleLabel = getMemberRoleLabel(profile.role);
  const userTitle = [
    getCohortDisplayValue(profile.cohort),
    profileName,
  ].filter(Boolean).join(' ');

  const handleConfirmEditNotice = () => {
    setIsEditNoticeOpen(false);
    editButtonRef.current?.focus();
  };

  return (
    <section className="user-profile-card" aria-label="사용자 프로필">
      <div className="user-profile-card__avatar-area">
        {isEditNoticeOpen && (
          <div className="user-profile-card__edit-notice">
            <DevelopmentNotice onConfirm={handleConfirmEditNotice} />
          </div>
        )}

        <div className="user-profile-card__avatar">
          {!hasImageError ? (
            <img
              className="user-profile-card__image"
              src={defaultProfileImage}
              alt={`${displayName}님의 프로필`}
              onError={() => setHasImageError(true)}
            />
          ) : (
            <span
              className="user-profile-card__image-placeholder"
              role="img"
              aria-label="프로필 이미지 없음"
            >
              ?
            </span>
          )}
        </div>

        <button
          ref={editButtonRef}
          className="user-profile-card__image-edit-button"
          type="button"
          aria-label="프로필 이미지 수정"
          aria-haspopup="dialog"
          aria-expanded={isEditNoticeOpen}
          onClick={() => setIsEditNoticeOpen(true)}
        >
          <ProfileEditIcon />
        </button>
      </div>

      <div className="user-profile-card__content">
        {roleLabel && (
          <>
            <div className="user-profile-card__identity">
              {userTitle && (
                <strong className="user-profile-card__name">{userTitle}</strong>
              )}
              <span className="user-profile-card__role">{roleLabel}</span>
            </div>
            {/* TODO: profile API에 부서 필드가 추가되면 활동 상태와 함께 표시합니다. */}
            {activeStatus && (
              <p className="user-profile-card__details">{activeStatus}</p>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default UserProfileCard;
