# 실시간 기술 트렌드 대시보드 — Feature 기반 구조

TASK.md 및 .cursorrules에 따른 폴더 구조입니다.

- **App Router**: 프로젝트 루트 `app/`
- **비즈니스/공통 코드**: `src/`
- **경로 별칭**: `@/*` → `./src/*`

---

## Feature 기반 아키텍처

| Feature | 역할 | 데이터/이벤트 |
|--------|------|----------------|
| **trending** | GitHub Trending 조회·표시 | React Query 초기 fetch (repository 이름, star, fork, language) |
| **realtime** | 실시간 업데이트 | SSE 구독 → React Query 캐시 갱신 (polling 미사용) |
| **interaction** | 사용자 인터랙션 | WebSocket (repository 좋아요, 관심 기술 구독) |
| **charts** | 데이터 시각화 | Recharts (star 증가 추이, 기술 트렌드) |
| **dashboard** | 메인 화면 | 위 Feature 조합 |

---

## 폴더 역할

| 폴더 | 역할 |
|------|------|
| **app/** (루트) | Next.js App Router: 레이아웃, 페이지, API 라우트 (`/api/trends`, `/api/trending`, `/api/events/trends`) |
| **src/components/** | 공통 UI (Card 등) — feature 비의존 |
| **src/features/** | 기능 단위 모듈. 각 feature는 `components/`, `hooks/`, `index.tsx` 포함 |
| **src/hooks/** | 공통 훅 (기존 useTechTrends 등) |
| **src/services/** | REST API, SSE, WebSocket 레이어 |
| **src/store/** | Recoil — UI·클라이언트 상태 (연결 상태, 좋아요, 구독 등) |
| **src/types/** | 공통 TypeScript 타입 |
| **src/utils/** | 순수 유틸 |

---

## 상태·실시간 규칙

- **서버 상태**: React Query (초기 데이터 + SSE로 캐시 갱신)
- **클라이언트 상태**: Recoil
- **실시간 데이터**: SSE (스트리밍, 5초 간격 등)
- **사용자 이벤트**: WebSocket (좋아요, 구독)
- **polling 사용 안 함**

---

## 코드 규칙

- **컴포넌트**: UI만 담당
- **비즈니스 로직**: hooks 또는 services
- **TypeScript 타입 정의 필수**

---

## 확장 방법

- 새 Feature: `src/features/<name>/` 에 `components/`, `hooks/`, `index.tsx` 추가 후 `src/features/index.ts` 에서 export
- 새 API: `src/services/api.ts` 또는 `services/<domain>.ts` + `app/api/...` 라우트
- 새 전역 상태: `src/store/atoms.ts` 에 atom 추가
