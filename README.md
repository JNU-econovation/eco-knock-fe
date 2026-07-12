# eco-knock-fe

eco-knock-fe는 React와 Vite 기반으로 개발 중인 ECO-KNOCK 프론트엔드 저장소입니다. 현재는 모바일 화면을 기준으로 공통 레이아웃, 하단 내비게이션, 모아두기 화면 UI와 편집 동작을 중심으로 구현되어 있습니다.

## 현재 구현 범위

- React 진입점과 `BrowserRouter` 기반 라우팅
- 공통 `AppLayout`과 고정 하단 내비게이션
- `/`, `/collection`, `/room`, `/recruit`, `/mypage`, `/ai-chat`, `/ecnv-coin` 라우트 정의
- 현재 모든 라우트는 임시로 `CollectionPage`에 연결
- 모아두기 화면의 `KNOCK COLLECTION` 그리드 UI
- 기본 모아두기 항목 목록 표시
- 2열/3열 그리드 레이아웃 전환
- 길게 누르기 또는 편집 버튼을 통한 편집 모드 진입
- 편집 모드에서 포인터 기반 드래그 preview를 사용한 순서 변경
- 편집 모드에서 항목 삭제 확인 모달
- 전역 에러 모달
- 하단 내비게이션의 active 상태 표시와 아이콘 정렬 보정
- Vite PWA 기본 설정

현재 모아두기 데이터는 `DEFAULT_COLLECTION_ITEMS`에 정의된 정적 값입니다. 항목 URL, 추가 기능, 삭제 API 연동은 아직 실제 백엔드와 연결되지 않았습니다.

## 기술 스택

- React
- React DOM
- React Router DOM
- Vite
- JavaScript / JSX
- CSS
- ESLint
- vite-plugin-pwa

PWA 설정은 포함되어 있지만, manifest 설명과 아이콘 등 메타데이터는 추후 서비스 기준에 맞춰 정리될 수 있습니다.

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
   ├─ constants
   ├─ contexts
   └─ hooks

public
└─ icons
```

주요 파일:

- `src/main.jsx`: React 앱을 `#root`에 렌더링합니다.
- `src/App.jsx`: 라우터와 전역 에러 모달 Provider를 연결합니다.
- `src/app/router/index.jsx`: 현재 라우트와 페이지 연결을 정의합니다.
- `src/shared/components/layout`: 공통 레이아웃과 하단 내비게이션 컴포넌트를 포함합니다.
- `src/shared/constants/bottomNavItems.js`: 하단 내비게이션 항목과 클래스 이름 상수를 관리합니다.
- `src/features/collection`: 모아두기 그리드, 편집 모드, 드래그 preview, 삭제 모달, 순서 변경 유틸을 포함합니다.
- `src/shared/components/error-modal`: 전역 에러 모달과 Provider를 포함합니다.
- `src/app/styles/theme.css`: 전역 스타일 변수와 모바일 기준 최대 너비를 정의합니다.

## 실행 요구사항

- Node.js
- npm

정확한 Node.js 버전은 아직 별도 파일로 고정되어 있지 않습니다.

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

## 배포

현재 배포는 Vercel을 사용하며, GitHub `main` 브랜치가 갱신되면 자동 배포되는 방식으로 운영됩니다.
세부 배포 설정은 Vercel 프로젝트 설정에서 관리합니다.

## 준비되지 않은 항목

- 테스트 환경과 `npm test` 스크립트는 아직 구성되어 있지 않습니다.
- 백엔드 API 연동 방식은 아직 코드로 확정되어 있지 않습니다.
- 모아두기 항목 삭제는 현재 프론트엔드 상태 변경 중심이며, 실제 삭제 API 연결이 필요합니다.
- 모아두기 항목 추가 UI와 실제 URL/로고 연결은 TODO 상태입니다.
- 부스모집, 마이페이지, ECNV 코인 로그, AI 채팅 등은 라우트와 하단 내비게이션 항목만 있으며, 현재는 별도 페이지 구현 없이 `CollectionPage`에 연결되어 있습니다.
- `index.html`은 현재 `title`과 앱 진입점만 최소 설정되어 있으며, 언어 속성, favicon 참조, 서비스 메타데이터는 추후 정리할 수 있습니다.
