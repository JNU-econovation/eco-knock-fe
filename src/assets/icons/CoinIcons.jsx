export const CoinRankFirstIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
  >
    <g filter="url(#coin-rank-first-shadow)">
      <circle
        cx="20"
        cy="16"
        r="16"
        fill="url(#coin-rank-first-gradient)"
      />
    </g>
    <defs>
      <filter
        id="coin-rank-first-shadow"
        x="0"
        y="0"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="coinRankFirstShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="coinRankFirstShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="coin-rank-first-gradient"
        x1="21"
        y1="16.5"
        x2="27.5"
        y2="10"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0.00958038" stopColor="#FFD752" />
        <stop offset="1" stopColor="#FFF3CD" />
      </linearGradient>
    </defs>
  </svg>
);

export const CoinRankSecondIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
  >
    <g filter="url(#coin-rank-second-shadow)">
      <circle
        cx="20"
        cy="16"
        r="16"
        fill="url(#coin-rank-second-gradient)"
      />
    </g>
    <defs>
      <filter
        id="coin-rank-second-shadow"
        x="0"
        y="0"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="coinRankSecondShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="coinRankSecondShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="coin-rank-second-gradient"
        x1="22"
        y1="15"
        x2="30.5"
        y2="7"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#D3D3D3" />
        <stop offset="1" stopColor="#F7F7F7" />
      </linearGradient>
    </defs>
  </svg>
);

export const CoinRankThirdIcon = ({ className }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    width="40"
    height="40"
    viewBox="0 0 40 40"
    fill="none"
    aria-hidden="true"
  >
    <g filter="url(#coin-rank-third-shadow)">
      <circle
        cx="20"
        cy="16"
        r="16"
        fill="url(#coin-rank-third-gradient)"
      />
    </g>
    <defs>
      <filter
        id="coin-rank-third-shadow"
        x="0"
        y="0"
        width="40"
        height="40"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feOffset dy="4" />
        <feGaussianBlur stdDeviation="2" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
        />
        <feBlend
          mode="normal"
          in2="BackgroundImageFix"
          result="coinRankThirdShadow"
        />
        <feBlend
          mode="normal"
          in="SourceGraphic"
          in2="coinRankThirdShadow"
          result="shape"
        />
      </filter>
      <linearGradient
        id="coin-rank-third-gradient"
        x1="24.5"
        y1="13.5"
        x2="31"
        y2="4.5"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#C4774F" />
        <stop offset="1" stopColor="#FFBD9A" />
      </linearGradient>
    </defs>
  </svg>
);
