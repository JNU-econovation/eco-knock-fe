import { AUTH_INTRODUCTION, AUTH_ROBOT_IMAGE } from '@/features/auth/constants/authContent';
import './AuthIntro.css';

export default function AuthIntro() {
  return (
    <div className="auth-intro">
      <p className="auth-intro__description">
        {AUTH_INTRODUCTION.map((line) => (
          <span key={line}>{line}</span>
        ))}
      </p>
      <img className="auth-intro__robot" src={AUTH_ROBOT_IMAGE} alt="" />
    </div>
  );
}
