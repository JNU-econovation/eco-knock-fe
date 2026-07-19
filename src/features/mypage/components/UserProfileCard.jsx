import { useState } from 'react';
import defaultProfileImage from '@/assets/img/default-profile.png';
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
  const imageSources = [user.userImg, defaultProfileImage].filter(Boolean);
  const activeImageSrc = imageSources.find(
    (imageSrc) => !failedImageSources.includes(imageSrc)
  );

  const userDetails = [
    getGenerationDisplayValue(user.userGeneration),
    getDisplayValue(user.userPart),
    getDisplayValue(user.userDepartment),
  ];

  return (
    <section className="user-profile-card" aria-label="사용자 프로필">
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
            —
          </span>
        )}
      </div>

      <strong className="user-profile-card__name">
        {getDisplayValue(user.userName)}
      </strong>
      <p className="user-profile-card__details">
        {userDetails.join(' · ')}
      </p>

      <button className="user-profile-card__edit-button">수정</button>
    </section>
  );
};

export default UserProfileCard;
