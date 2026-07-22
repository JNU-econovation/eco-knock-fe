import ButtonSpinner from '@/shared/components/button-spinner/ButtonSpinner';
import './AuthButton.css';

export default function AuthButton({
  variant = 'sso',
  className = '',
  isPending = false,
  pendingLabel = '처리 중',
  disabled = false,
  type = 'button',
  'aria-label': ariaLabel,
  children,
  ...props
}) {
  return (
    <button
      className={`auth-button auth-button--${variant} ${className}`.trim()}
      {...props}
      type={type}
      disabled={disabled || isPending}
      aria-busy={isPending || undefined}
      aria-label={isPending ? pendingLabel : ariaLabel}
    >
      {isPending ? <ButtonSpinner /> : children}
    </button>
  );
}
