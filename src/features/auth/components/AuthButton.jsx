import './AuthButton.css';

export default function AuthButton({ variant = 'sso', className = '', ...props }) {
  return (
    <button
      className={`auth-button auth-button--${variant} ${className}`.trim()}
      type="button"
      {...props}
    />
  );
}
