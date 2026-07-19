# eco-knock-fe

eco-knock-fe는 React와 Vite 기반으로 개발 중인 ECO-KNOCK 프론트엔드 저장소입니다. 모바일 화면을 기준으로 공통 페이지 레이아웃, 모아두기, 마이페이지, 코인 상세, 설정, AI 채팅 오버레이 UI를 구현하고 있습니다.

## 현재 구현 범위

- `BrowserRouter` 기반 라우팅
- 하단 내비게이션과 AI 채팅 오버레이가 있는 기본 페이지용 `AppLayout`
- 하단 내비게이션 없이 뒤로 가기 버튼을 제공하는 상세 페이지용 `DetailLayout`
- 기본 화면의 `MainPageFrame`과 코인·설정 상세 화면의 `DetailPageFrame`
- 모아두기 그리드의 레이아웃 전환, 편집, 순서 변경, 삭제 UI
- 프로필과 코인 잔액 카드로 구성된 마이페이지 UI
- 코인 잔액과 이용 내역을 표시하는 코인 상세 UI
- 로그아웃과 회원 탈퇴 항목을 제공하는 설정 UI
- 모아두기 삭제와 설정 작업에서 재사용하는 공통 확인 모달
- 애플리케이션 전역에서 사용하는 오류 모달
- 현재 URL과 화면 상태를 유지하는 AI 채팅 오버레이 UI
- 채팅창의 버튼·드래그 닫기와 첨부 기능 개발 예정 안내
- Vite PWA 기본 설정

현재 등록된 라우트는 다음과 같습니다.

- `/`, `/collection`: 모아두기
- `/room`, `/recruit`: 별도 화면 구현 전까지 모아두기 화면을 임시로 사용
- `/mypage`: 마이페이지
- `/mypage/coin`: 코인 상세
- `/mypage/settings`: 설정

하단 Chat 버튼은 별도 경로로 이동하지 않고 기존 화면 위에 채팅 오버레이를 표시합니다.

마이페이지와 코인 상세는 외부에서 데이터가 전달되지 않으면 MOCK fallback 데이터를 표시하는 UI 단계입니다. 모아두기 데이터와 채팅 입력·전송, 첨부 버튼, 설정 작업도 백엔드와 연결되지 않은 UI 단계입니다.

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
│  ├─ coin
│  ├─ collection
│  ├─ mypage
│  └─ settings
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
- `features`: 기능별 UI와 상호작용을 관리하며, 현재 `chat`, `coin`, `collection`, `mypage`, `settings`가 있습니다.
- `pages`: 라우트 단위 화면을 구성합니다.
- `shared`: 공통 레이아웃, 확인 모달, 오류 모달, 공통 상수·context·hook을 관리합니다.

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

## 준비되지 않은 항목

- 사용자 프로필과 코인 데이터 API 연동
- 로그아웃·회원 탈퇴 API 및 인증 상태 처리
- 백엔드 요청의 성공·오류 결과에 따른 사용자 피드백 처리

PWA 기본 설정은 포함되어 있지만 `index.html`이 참조하는 favicon은 누락되어 있고 manifest의 이름·설명·아이콘은 임시 값입니다. favicon과 PWA 메타데이터는 서비스 정보가 확정된 뒤 함께 정리해야 합니다.
