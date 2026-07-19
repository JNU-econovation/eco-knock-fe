import { useRef, useState } from 'react';
import { ProfileEditIcon } from '@/assets/icons/MyPageIcons';
import defaultProfileImage from '@/assets/img/default-profile.png';
import DevelopmentNotice from '@/shared/components/development-notice/DevelopmentNotice';
import './UserProfileCard.css';

const EMPTY_VALUE = '-';
const getDisplayValue = (value) => value || EMPTY_VALUE;
const getGenerationDisplayValue = (value) => (
  value === null || value === undefined || value === ''
    ? EMPTY_VALUE
    : `${value}기`
);

const UserProfileCard = ({ user }) => {
  const [failedImageSources, setFailedImageSources] = useState([]);
  const [isEditNoticeOpen, setIsEditNoticeOpen] = useState(false);
  const editButtonRef = useRef(null);
  const imageSources = [user.userImg, defaultProfileImage].filter(Boolean);
  const activeImageSrc = imageSources.find(
    (imageSrc) => !failedImageSources.includes(imageSrc)
  );

  const userTitle = [
    getGenerationDisplayValue(user.userGeneration),
    getDisplayValue(user.userName),
  ].join(' ');
  const userDetails = [
    getDisplayValue(user.userPart),
    getDisplayValue(user.userDepartment),
  ].join(' / ');

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
          {activeImageSrc ? (
            <img
              className="user-profile-card__image"
              src={activeImageSrc}
              alt={`${getDisplayValue(user.userName)}님의 프로필`}
              onError={() => setFailedImageSources((currentSources) => (
                currentSources.includes(activeImageSrc)
                  ? currentSources
                  : [...currentSources, activeImageSrc]
              ))}
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
        <strong className="user-profile-card__name">{userTitle}</strong>
        <p className="user-profile-card__details">{userDetails}</p>
      </div>
    </section>
  );
};

export default UserProfileCard;
