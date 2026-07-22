import ecoKnockLogo from '@/assets/img/eco-knock-logo.svg';
import useStartupSplash from '@/features/startup/hooks/useStartupSplash';
import './StartupSplash.css';

export default function StartupSplash() {
  const { isExiting, isVisible } = useStartupSplash();

  if (!isVisible) return null;

  return (
    <div
      className={`startup-splash${isExiting ? ' startup-splash--exiting' : ''}`}
      role="status"
      aria-label="ECO-KNOCK 불러오는 중"
    >
      <div className="startup-splash__rays" aria-hidden="true">
        <svg
          className="startup-splash__ray"
          viewBox="0 0 393 852"
          preserveAspectRatio="none"
        >
          <path
            className="startup-splash__ray-shape startup-splash__ray-shape--bright"
            d="M-4 845.5 14 859 472.5-20.5 232-64.5-4 845.5Z"
            fill="#F0F5FF"
          />
          <path
            className="startup-splash__ray-shape startup-splash__ray-shape--light"
            d="M8.5 872 0 856 384.113-5.5V399L8.5 872Z"
            fill="#9DB6E4"
            transform="scale(1.0234375 1)"
          />
          <path
            className="startup-splash__ray-shape startup-splash__ray-shape--medium"
            d="M0 584.5v10L378.5 258.5 381.5 0 0 584.5Z"
            fill="#86A3D9"
            transform="translate(0 273) scale(1.048 1)"
          />
          <path
            className="startup-splash__ray-shape startup-splash__ray-shape--dark"
            d="m0 417 10.5 6.5 349-243L363 0 0 417Z"
            fill="#4269B1"
            transform="translate(0 440) scale(1.08865 1)"
          />
        </svg>
      </div>

      <h1 className="startup-splash__title">
        <img src={ecoKnockLogo} alt="ECO-KNOCK" />
      </h1>
    </div>
  );
}
