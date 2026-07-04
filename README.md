# eco-knock-fe

`eco-knock-fe`는 React와 Vite 기반으로 개발 중인 ECO-KNOCK 프론트엔드 레포입니다. 현재 코드는 모바일 화면 폭을 기준으로 한 앱 레이아웃, 하단 내비게이션, 모아두기 화면의 바로가기 그리드 UI를 중심으로 구성되어 있습니다.

## 현재 구현 범위

- React 애플리케이션 진입점과 `BrowserRouter` 기반 라우팅
- 공통 앱 레이아웃과 고정 하단 내비게이션
- `/`, `/collection`, `/room`, `/recruit`, `/mypage`, `/ai-chat`, `/ecnv-coin` 경로 정의
- 현재 모든 라우트는 `CollectionPage`로 연결됨
- 모아두기 화면의 `ECO-KNOCK` 로고 영역과 `KNOCK COLLECTION` 그리드 UI
- 기본 바로가기 항목 목록
- 컬렉션 항목 클릭 시 새 창 열기 동작
- 길게 누르기 또는 편집 버튼을 통한 편집 모드 진입
- 편집 모드에서 드래그 앤 드롭 순서 변경
- 편집 모드에서 삭제 확인 모달을 거치는 UI 전용 항목 삭제
- 삭제 처리 중 중복 입력 차단, 로딩 표시, 5초 프론트엔드 안전 타임아웃
- 오류를 순서대로 표시하는 전역 오류 모달
- 편집 모드 외부 클릭 시 편집 모드 종료
- Vite PWA 기본 설정

현재 화면 데이터는 `DEFAULT_COLLECTION_ITEMS`의 정적 값이며, 백엔드에서 가져오는 구조는 아직 연결되지 않았습니다. 모아두기 항목의 URL은 TODO 문자열로 남아 있으며, 항목 추가와 그리드 모양 변경 로직도 아직 구현되지 않았습니다.

## 기술 스택

- React
- React DOM
- React Router DOM
- Vite
- JavaScript / JSX
- CSS
- ESLint
- `vite-plugin-pwa`

PWA 기본 설정이 포함되어 있으며, 아이콘 및 manifest 세부값은 추후 변경 가능성이 있습니다.

## 프로젝트 구조

```text
src
├─ app
│  ├─ router
│  └─ styles
├─ assets
│  └─ icons
├─ features
│  └─ collection
│     ├─ components
│     ├─ constants
│     ├─ hooks
│     └─ utils
├─ pages
└─ shared
   ├─ components
   │  ├─ error-modal
   │  └─ layout
   ├─ contexts
   ├─ hooks
   └─ constants

public
└─ icons
```

주요 파일:

- `src/main.jsx`: React 앱을 `#root`에 렌더링합니다.
- `src/App.jsx`: `BrowserRouter`로 앱 라우터를 감쌉니다.
- `src/app/router/index.jsx`: 현재 라우트와 페이지 연결을 정의합니다.
- `src/shared/components/layout`: 앱 레이아웃과 하단 내비게이션 컴포넌트를 포함합니다.
- `src/shared/components/error-modal`: 전역 오류 모달과 오류 큐 Provider를 포함합니다.
- `src/features/collection`: 모아두기 그리드 UI, 상태 훅, 기본 항목, 순서 변경 유틸을 포함합니다.
- `src/app/styles/theme.css`: 전역 스타일, 색상 변수, 타이포그래피 변수, 모바일 기준 최대 너비를 정의합니다.

## 실행 전 요구사항

- Node.js
- npm

정확한 Node.js 버전은 아직 별도로 명시되어 있지 않습니다.

## 실행 방법

의존성 설치:

```bash
npm install
```

개발 서버 실행:

```bash
npm run dev
```

프로덕션 빌드:

```bash
npm run build
```

빌드 결과 미리보기:

```bash
npm run preview
```

ESLint 실행:

```bash
npm run lint
```

## 준비되지 않은 항목

- 테스트 환경은 아직 구성되지 않았으며, 추후 Vitest 또는 React Testing Library 등을 도입한 뒤 별도 항목으로 분리 예정입니다.
- 백엔드 API 연동 방식은 추후 API 명세와 환경 변수 구성이 확정된 뒤 별도 항목으로 분리 예정입니다.
- 배포 방식은 아직 별도 스크립트나 문서로 확인되지 않았으며, 실제 배포 구성이 추가된 뒤 정리 예정입니다.
- 부서모집, 마이페이지, ECNV 코인 로그, AI 채팅 페이지는 라우트와 하단 내비게이션 항목만 확인되며, 현재는 별도 페이지 구현 없이 `CollectionPage`로 연결되어 있습니다.
- 모아두기 항목 추가, 그리드 모양 변경, 실제 URL 연결은 TODO 상태입니다.
- 모아두기 항목 삭제는 현재 프론트엔드 상태에만 반영됩니다. 비동기 삭제 상태, 5초 안전 타임아웃, 전역 오류 모달은 준비되어 있으며 실제 삭제 API 함수와 `AbortSignal` 전달은 추후 백엔드 명세에 맞춰 연결해야 합니다.
