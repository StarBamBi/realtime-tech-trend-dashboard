# 실시간 기술 트렌드 대시보드

WebSocket과 **Server Sent Events(SSE)** 를 활용해 실시간 데이터를 처리하는 기술 트렌드 대시보드입니다.  
Polling 대신 **스트리밍 기반** 데이터 업데이트 구조로 설계되었습니다.

## 주요 기능

- **GitHub Trending 조회** — repository 이름, star 수, fork 수, language 표시 (React Query 초기 fetch)
- **실시간 업데이트** — SSE로 5초 간격 데이터 전송, React Query 캐시 자동 갱신 (polling 미사용)
- **사용자 인터랙션** — WebSocket 기반 repository 좋아요, 관심 기술 구독
- **데이터 시각화** — Recharts를 이용한 star 증가 추이, 기술 트렌드 차트

## 기술 스택

| 구분 | 기술 |
|------|------|
| 프레임워크 | Next.js 16 (App Router), React 19 |
| 언어 | TypeScript |
| 서버 상태 | React Query (TanStack Query) |
| 클라이언트 상태 | Zustand |
| 실시간 | Server Sent Events (SSE), WebSocket (Socket.io) |
| 시각화 | Recharts |
| 스타일 | Tailwind CSS v4 |

## 시작하기

### 요구 사항

- Node.js 18+
- npm / yarn / pnpm / bun

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 을 열면 대시보드를 확인할 수 있습니다.

### 기타 스크립트

```bash
npm run build   # 프로덕션 빌드
npm run start   # 프로덕션 서버 실행
npm run lint    # ESLint 실행
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
│   │   ├── interaction/    # WebSocket 사용자 이벤트
│   │   └── charts/         # Recharts 시각화
│   ├── components/         # 공통 UI 컴포넌트
│   ├── hooks/              # 공통 훅
│   ├── services/           # API, SSE, WebSocket 레이어
│   ├── store/              # Zustand 전역 상태
│   ├── types/              # TypeScript 타입
│   └── utils/              # 유틸 함수
└── package.json
```

## 아키텍처 요약

- **초기 데이터**: React Query로 fetch
- **실시간 업데이트**: SSE 구독 → 수신 데이터로 React Query 캐시 갱신 → UI 자동 반영
- **사용자 이벤트**: WebSocket으로 좋아요/구독 전송
- **반응형**: 모바일·태블릿·데스크탑 지원 (Tailwind 브레이크포인트)

자세한 폴더 역할과 코드 규칙은 `src/README.md` 를 참고하세요.

## 저장소

- **GitHub**: [https://github.com/StarBamBi/realtime-tech-trend-dashboard](https://github.com/StarBamBi/realtime-tech-trend-dashboard)

## 라이선스

Private project.
