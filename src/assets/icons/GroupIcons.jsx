export const ChevronRightIcon = () => (
  <svg width="9" height="14" viewBox="0 0 9 14" fill="none" aria-hidden="true">
    <path
      d="m2 1 6 6-6 6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const CrownIcon = ({ filled = false }) => (
  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" aria-hidden="true">
    <path
      d="M2 5.5 5.2 8 9 2l3.8 6L16 5.5l-1.4 8H3.4L2 5.5Z"
      fill={filled ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  </svg>
);
