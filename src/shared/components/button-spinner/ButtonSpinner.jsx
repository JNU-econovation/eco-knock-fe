import './ButtonSpinner.css';

const ButtonSpinner = ({ className = '' }) => (
  <span
    className={`button-spinner ${className}`.trim()}
    aria-hidden="true"
  />
);

export default ButtonSpinner;
