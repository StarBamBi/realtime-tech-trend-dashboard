# 실시간 기술 트렌드 대시보드

**Server Sent Events(SSE)** 로 실시간 데이터를 처리하는 기술 트렌드 대시보드입니다.  
Polling 대신 스트리밍 기반 업데이트 구조로 설계되었습니다.

## 주요 기능

- **GitHub Trending 조회** — repository 이름, star 수, fork 수, language 표시 (React Query 초기 fetch). **1·2·3등 뱃지**로 순위 구분.
- **실시간 업데이트** — SSE로 5초 간격 데이터 전송, React Query 캐시 자동 갱신 (polling 미사용)
- **데이터 시각화** — Recharts를 이용한 star 증가 추이, 기술 트렌드 차트. 기술 트렌드 목록에도 **1·2·3등 뱃지** 표시.

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 언어 | TypeScript |
| 서버 상태 | React Query (TanStack Query) |
| 클라이언트 상태 | Zustand |
| 실시간 | Server Sent Events (SSE) |
| 시각화 | Recharts |
| 스타일 | Vanilla Extract (CSS-in-JS), Toss 디자인 컬러 (Toss Blue #0064FF, Toss Gray #202632) |

## 시작하기

### 요구 사항

- Node.js 18+
- Yarn 4 (Corepack 사용 시 `corepack enable` 후 자동 사용)

### 설치 및 실행

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 대시보드를 확인할 수 있습니다.

### 기타 스크립트

```bash
yarn build   # 프로덕션 빌드
yarn start   # 프로덕션 서버 실행
yarn lint    # ESLint 실행
```

## 프로젝트 구조

- **App Router**: 프로젝트 루트 `app/` — 레이아웃, 페이지, **API 라우트만** 여기 있음.
- **비즈니스/공통 코드**: `src/` — features, components, hooks, services, store, types, utils.
- **경로 별칭**: `@/*` → `./src/*`

```
realtime-tech-trend-dashboard/
├── app/                         # Next.js App Router (페이지 + API 라우트만)
│   ├── api/
│   │   ├── events/trends/       # SSE 스트림 (실시간 푸시)
│   │   ├── trending/            # GitHub Trending REST API
│   │   └── trends/              # Mock 기술 트렌드 (개발용)
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── src/
│   ├── features/                # Feature 단위 모듈
│   │   ├── dashboard/           # 메인 대시보드 조합
│   │   ├── trending/            # GitHub Trending 목록
│   │   ├── realtime/            # SSE 구독 및 캐시 갱신
│   │   └── charts/              # Recharts 시각화
│   ├── components/              # 공통 UI (Card 등)
│   ├── hooks/                   # 공통 훅
│   ├── services/                # REST API, SSE 클라이언트, github.server
│   ├── store/                   # Zustand 전역 상태
│   ├── types/                   # TypeScript 타입
│   ├── utils/                   # 유틸 함수
│   └── styles/                  # Vanilla Extract 테마/글로벌 스타일
└── package.json
```

## API 라우트 (app/api만 사용, src에는 API 없음)

| 경로 | 메서드 | 역할 |
|------|--------|------|
| `/api/trending` | GET | GitHub Trending 조회 (REST). React Query 초기 fetch용. 쿼리: `language`, `per_page`, `since`, `sort` |
| `/api/events/trends` | GET | SSE 스트림. 실시간 트렌드 데이터 푸시 (polling 대신 사용) |
| `/api/trends` | GET | Mock 기술 트렌드 목록 (개발용). 실제 백엔드 연동 시 이 라우트를 교체 |

- API 라우트는 **반드시** `app/api/` 아래에만 두며, `src/` 안에는 API 라우트를 두지 않습니다.

## 아키텍처 요약

- **초기 데이터**: React Query로 `/api/trending` fetch
- **실시간 업데이트**: `/api/events/trends` SSE 구독 → 수신 데이터로 React Query 캐시 갱신 → UI 자동 반영
- **상태**: 서버 상태 = React Query, 클라이언트 상태 = Zustand. Polling 사용 안 함.
- **반응형**: 모바일·태블릿·데스크탑 지원 (Vanilla Extract 브레이크포인트)
- **UI**: 헤더 Toss Blue, 1·2·3등 금/은/동 뱃지로 트렌드 순위 구분

## 코드 규칙

- **컴포넌트**: UI만 담당. 비즈니스 로직은 hooks 또는 services로 분리.
- **TypeScript**: 타입 정의 필수.
- **스타일**: `src/styles/theme.css.ts` — Toss Blue(#0064FF), Toss Gray(#202632). theme contract 사용 시 값만 참조.

## 저장소

- **GitHub**: [https://github.com/StarBamBi/realtime-tech-trend-dashboard](https://github.com/StarBamBi/realtime-tech-trend-dashboard)

## 라이선스

Private project.
