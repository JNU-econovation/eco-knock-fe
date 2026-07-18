# eco-knock-fe

eco-knock-fe는 React와 Vite 기반으로 개발 중인 ECO-KNOCK 프론트엔드 저장소입니다. 모바일 화면을 기준으로 공통 레이아웃, 모아두기 화면과 AI 채팅 오버레이를 구현하고 있습니다.

## 현재 구현 범위

- `BrowserRouter` 기반 라우팅, 공통 `AppLayout`과 고정 하단 내비게이션
- 모아두기 그리드의 레이아웃 전환, 편집, 순서 변경과 삭제 UI
- 애플리케이션 전역에서 사용할 수 있는 에러 모달
- 현재 URL과 화면 상태를 유지하는 AI 채팅 오버레이 UI
- 채팅창의 버튼·드래그 닫기와 첨부 기능 개발 예정 안내
- Vite PWA 기본 설정

`/`, `/collection`, `/room`, `/recruit`, `/mypage`, `/ai-chat`, `/ecnv-coin` 라우트가 정의되어 있으며, 현재 라우트 기반 화면은 임시로 `CollectionPage`를 사용합니다. 하단 Chat 버튼은 `/ai-chat`으로 이동하지 않고 기존 화면 위에 채팅 오버레이를 표시합니다.

현재 모아두기 데이터는 정적 값이며, 채팅 입력·전송 및 첨부 버튼도 백엔드와 연결되지 않은 UI 단계입니다.

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
│  ├─ icons
│  └─ img
├─ features
│  ├─ chat
│  └─ collection
├─ pages
└─ shared
   ├─ components
   ├─ constants
   ├─ contexts
   └─ hooks

public
└─ icons
```

- `app`: 앱 수준 라우터와 전역 스타일을 관리합니다.
- `assets`: UI 아이콘과 이미지 자산을 관리합니다.
- `features`: 기능별 UI와 상호작용을 관리하며, 현재 `chat`과 `collection`이 있습니다.
- `pages`: 라우트 단위 화면을 구성합니다.
- `shared`: 여러 기능에서 사용하는 레이아웃, 모달, 상수, context와 hook을 관리합니다.

각 feature는 실제 책임이 생길 때 `components`, `hooks`, `constants`, `utils`로 나눕니다. 컴포넌트와 CSS는 렌더링, hook은 상태와 이벤트 흐름, constants는 정적 문구와 데이터, utils는 React와 무관한 순수 계산을 담당합니다.

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

- 모아두기 데이터 조회·추가·삭제와 실제 URL·로고의 백엔드 연동
- 채팅 API 연동 이후 메시지 송수신 UI, 실제 파일 첨부, 로딩과 오류 처리
- 동방, 부서모집, 마이페이지, ECNV 코인 로그 등 별도 라우트 화면
- 테스트 환경과 `npm test` 스크립트, 서비스 메타데이터 정리
