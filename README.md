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

```
realtime-tech-trend-dashboard/
├── app/                    # Next.js App Router (페이지, API 라우트)
│   ├── api/
│   │   ├── events/trends/  # SSE 스트림 (/api/events/trends)
│   │   └── trending/       # GitHub Trending API
│   └── page.tsx
├── src/
│   ├── features/           # Feature 단위 모듈
│   │   ├── dashboard/      # 메인 대시보드 조합
│   │   ├── trending/       # GitHub Trending 목록
│   │   ├── realtime/       # SSE 구독 및 캐시 갱신
│   │   └── charts/         # Recharts 시각화
│   ├── components/         # 공통 UI 컴포넌트
│   ├── hooks/              # 공통 훅
│   ├── services/           # API, SSE 레이어
│   ├── store/              # Zustand 전역 상태
│   ├── types/              # TypeScript 타입
│   └── utils/              # 유틸 함수
└── package.json
```

## 아키텍처 요약

- **초기 데이터**: React Query로 fetch
- **실시간 업데이트**: SSE 구독 → 수신 데이터로 React Query 캐시 갱신 → UI 자동 반영
- **반응형**: 모바일·태블릿·데스크탑 지원 (Vanilla Extract 브레이크포인트)
- **UI**: 헤더 Toss Blue, 1·2·3등 금/은/동 뱃지로 트렌드 순위 한눈에 구분

자세한 폴더 역할과 코드 규칙은 `src/README.md` 를 참고하세요.

## 저장소

- **GitHub**: [https://github.com/StarBamBi/realtime-tech-trend-dashboard](https://github.com/StarBamBi/realtime-tech-trend-dashboard)

## 라이선스

Private project.
