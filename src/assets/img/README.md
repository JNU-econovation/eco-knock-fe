# 마이페이지 이미지 에셋

다음 파일명으로 이미지를 추가합니다.

- `default-profile.png`: 사용자가 프로필 이미지를 설정하지 않았거나 사용자 이미지 로드에 실패했을 때 표시하는 기본 이미지
- `coin.png`: 마이페이지 코인 카드 오른쪽에 표시하는 코인 이미지

파일을 추가한 뒤 `src/features/mypage/constants/imageAssets.js`에서 각 이미지를 import하고 `null`로 선언된 상수를 import한 값으로 교체합니다.

```js
import defaultProfileImage from '@/assets/img/default-profile.png';
import coinImage from '@/assets/img/coin.png';

export const DEFAULT_PROFILE_IMAGE = defaultProfileImage;
export const COIN_IMAGE = coinImage;
```

이미지 우선순위는 사용자 프로필 이미지, 기본 프로필 이미지, `—` 대체 UI 순서입니다. 코인 이미지가 없거나 로드에 실패하면 기존 SVG 대체 아이콘을 표시합니다.
