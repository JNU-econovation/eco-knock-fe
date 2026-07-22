# eco-knock-fe

eco-knock-fe는 동아리 서비스 **ECO-KNOCK**의 모바일 중심 프론트엔드입니다. React와 Vite를 기반으로 인증, 모아두기, 동방 환경 현황, 마이페이지, 코인 및 AI 채팅 UI를 개발하고 있습니다.

## 현재 구현 범위

### 시작 및 인증

- 초기 리소스 로딩과 최소 노출 시간을 함께 고려한 시작 스플래시
- ECNV SSO 로그인 시작 및 백엔드 콜백 이후 프론트 이동
- 게스트 로그인과 관리자 마스터 로그인
- HttpOnly 쿠키를 사용하는 인증 토큰 재발급과 로그아웃
- Vercel `/api` reverse proxy를 통한 동일 출처 API 요청과 iOS standalone PWA 인증 쿠키 유지
- 여러 요청이 동시에 401을 반환할 때 재발급 요청을 하나로 공유하고 원 요청을 한 번 재시도하는 Axios 인터셉터
- 4XX 백엔드 메시지와 5XX·네트워크 오류를 구분하는 공통 오류 모달

### 화면 및 상호작용

- 하단 내비게이션과 AI 채팅 오버레이를 제공하는 `AppLayout`
- 공통 뒤로가기 버튼을 제공하는 `DetailLayout`
- 공통 메인 화면 구조를 제공하는 `MainPageFrame`
- 모아두기 목록과 그리드 크기 조회 및 서버 응답 기반 정렬
- 모아두기 열 전환, 링크 추가·삭제·순서 변경·초기화 API 연동
- 링크 추가 시 URL 정규화, favicon 조회와 대체 이미지 처리
- Air Quality 시계열 응답을 사용하는 온도, 습도, 미세먼지, 공기질 현황
- 동방 현황 진입 시 즉시 조회하고 화면이 열린 동안 60초마다 갱신
- 환경 항목별 최근 12개 과거 시계열 상세 화면과 기본 시간 간격 상태 공유
- 프로필, 코인 잔액, 최근 내역, 순위 및 전체 코인 내역 UI
- 현재 화면 위에서 열고 드래그해 닫을 수 있는 AI 채팅 오버레이
- 질문을 `multipart/form-data`로 전송하고 `result.answer`를 표시하는 AI 채팅 API 연동
- 사용자·AI 메시지 버블, 응답 대기 문구와 점 애니메이션, 새 메시지 자동 스크롤
- AI 응답 대기 중 입력과 중복 전송 방지
- 비동기 버튼에서 재사용하는 공통 pending 스피너
- 공통 확인 모달, 오류 모달 및 개발 예정 안내 UI

현재 등록된 주요 경로는 다음과 같습니다.

| 경로 | 화면 | 현재 상태 |
| --- | --- | --- |
| `/` | 모아두기 | 목록·레이아웃 조회 및 편집 API 연결 |
| `/login` | 로그인 선택 | SSO·게스트 로그인 연결 |
| `/login/admin` | 관리자 로그인 | 관리자 로그인 연결 |
| `/collection` | 모아두기 | `/`와 동일한 API 연결 화면 |
| `/room` | 동방 환경 현황 | Air Quality 시계열 API 연결 및 60초 polling |
| `/room/temperature` | 온도 상세 | 과거 시계열 API 연결 |
| `/room/humidity` | 습도 상세 | 과거 시계열 API 연결 |
| `/room/fine-dust` | 미세먼지 상세 | `pm25Quality` 과거 시계열 API 연결 |
| `/room/air-quality` | 공기질 상세 | `gasQuality` 과거 시계열 API 연결 |
| `/recruit` | 부서 모집 | 모아두기 화면 임시 사용 |
| `/mypage` | 마이페이지 | 일부 MOCK 데이터, 로그아웃 API 연결 |
| `/mypage/coin` | 코인 상세 | MOCK 데이터 사용 |
| `/mypage/coin/log` | 전체 코인 내역 | MOCK 데이터 사용 |

하단 Chat 버튼은 별도 경로로 이동하지 않고 현재 화면 위에 채팅 오버레이를 표시합니다. 텍스트 질문 전송은 AI 채팅 API에 연결되어 있으며 사진·파일 첨부 기능은 아직 개발 예정 안내만 표시합니다.

## 기술 스택

- React 19
- React Router DOM 7
- Axios
- Vite 8
- JavaScript / JSX
- CSS
- ESLint
- vite-plugin-pwa
- Vercel

PWA manifest와 서비스 워커 자동 업데이트 설정이 포함되어 있습니다. ECO-KNOCK PNG·SVG 앱 아이콘과 브라우저 favicon, Apple Touch Icon을 사용합니다.

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
│  ├─ auth
│  ├─ chat
│  ├─ coin
│  ├─ collection
│  ├─ mypage
│  ├─ room
│  └─ startup
├─ pages
└─ shared
   ├─ api
   ├─ components
   ├─ constants
   ├─ contexts
   └─ hooks

public
└─ icons
```

- `app`: 라우터와 전역 스타일을 관리합니다.
- `assets`: 소스에서 사용하는 SVG 아이콘과 이미지 자산을 관리합니다.
- `features`: 기능별 API, 컴포넌트, 훅, 상수와 순수 유틸리티를 관리합니다.
- `pages`: 라우트 단위 화면을 구성합니다.
- `shared`: 공통 API 클라이언트, 레이아웃, 모달, 스피너, 상수, context와 hook을 관리합니다.

## 실행 요구사항

- Node.js
- npm

정확한 Node.js 버전은 아직 별도 파일로 고정되어 있지 않습니다.

## 환경변수

로컬 개발에서는 프로젝트 루트에 `.env.local`을 만들고 API 서버 주소를 설정합니다.

```env
VITE_API_BASE_URL=https://eco-knock.isek-ai.org
```

환경변수가 없으면 코드에 설정된 동일한 운영 API 주소를 기본값으로 사용합니다. `.env.local`은 Git에 포함되지 않으며, 값을 바꾼 뒤에는 개발 서버를 다시 시작해야 합니다.

Vercel 배포에서는 브라우저가 같은 출처의 proxy 경로로 API를 요청하도록 다음 값을 사용합니다.

```env
VITE_API_BASE_URL=/api
```

## Vercel 배포와 API proxy

`vercel.json`은 `/api/:path*` 요청을 `https://eco-knock.isek-ai.org/:path*`로 전달합니다. 브라우저 주소는 Vercel origin에 유지되므로 iOS 홈 화면의 standalone PWA에서도 access token과 refresh token을 동일 출처 쿠키로 사용할 수 있습니다.

또한 React Router 경로로 직접 진입하거나 새로고침할 때 `index.html`을 제공하도록 SPA fallback rewrite를 설정합니다.


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

- 동방 기본 시간 간격의 서버 영속화
- 프로필, 코인 잔액·순위·내역 API 연동
- 회원 탈퇴와 초인종 기능 연동
- AI 채팅 사진·파일 첨부 기능 연동
- 부서 모집 전용 화면 구현
- 자동화 테스트 환경 구성
- PWA manifest 설명 등 메타데이터 최종 정리
- Vercel API proxy 환경의 SSO 로그인 시작 URL과 callback 흐름 검증
