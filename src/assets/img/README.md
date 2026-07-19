# 마이페이지 이미지 에셋

- `default-profile.png`: 프로필 이미지가 없거나 로드에 실패했을 때 표시하는 기본 이미지
- `coin.png`: 마이페이지 코인 카드에 표시하는 이미지

이미지는 실제로 사용하는 컴포넌트에서 직접 import합니다.

- 기본 프로필 이미지: `src/features/mypage/components/UserProfileCard.jsx`
- 코인 이미지: `src/features/mypage/components/CoinBalanceCard.jsx`

프로필 이미지 우선순위는 사용자 이미지, 기본 프로필 이미지, `—` 대체 UI 순서입니다. 코인 이미지 로드에 실패하면 SVG 대체 아이콘을 표시합니다.
