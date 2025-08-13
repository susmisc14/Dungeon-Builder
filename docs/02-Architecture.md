# 아키텍처 개요

## 개요

- Next.js 15(App Router, React 19) 기반. Server Components/Server Actions 중심으로 클라이언트 JS 최소화.
- 데이터 무결성과 캐시: `revalidateTag/revalidatePath` 표준화.
- 보안: `serverActions.allowedOrigins` 화이트리스트, SSR 쿠키 안전 처리.
- 백엔드/데이터: Supabase(PostgreSQL, Row Level Security, Realtime, Storage).

## 통합 구성 요소

- 언어/품질: TypeScript 전면 적용, ESLint/Prettier(+ import 정렬, Tailwind 플러그인).
- UI/스타일: Tailwind CSS(+ 필요 시 Radix UI 프리미티브).
- 상태 관리:
  - 서버 상태: TanStack Query(v5)
  - 클라이언트 UI 상태: 최소(Zustand)
- 폼/검증: React Hook Form + Zod(서버에서 재검증)

## Server Actions 극대화 가이드

- 원칙: 도메인 단위 액션(입력 검증 → 권한 확인 → 비즈니스 로직 → 캐시 무효화 → 결과/리다이렉트)
- 위치: 서버 전용 파일 `'use server'` 사용, 클라이언트는 폼/버튼에서 액션만 호출
- 검증: RHF(클라이언트) + Zod(서버, 최종 신뢰 경계)
- 캐시: 읽기 태깅(`next: { tags: [...] }`), 쓰기 후 `revalidatePath/Tag`
- 보안: `next.config.ts` `serverActions.allowedOrigins`, `bodySizeLimit` 설정, 액션 내 세션/권한 가드
- UX: `useActionState`로 결과/에러 매핑, `useOptimistic/useTransition`으로 낙관적 UI
- 대용량/파일: Storage 업로드 후 메타만 DB 저장, `bodySizeLimit` 조정
- 장기 작업: 액션은 트리거만, 실제 처리(큐/Edge Function)에 위임 후 폴링/채널로 상태 조회
- 테스트: 순수 비즈니스 로직은 모듈로 분리해 Vitest 단위 테스트, 액션 래퍼는 스모크

## Server Actions 보안·DX 체크리스트

- 입력 검증: 모든 액션 입력은 서버에서 Zod로 재검증(클라이언트 RHF 검증과 별개)
- 권한 가드: 공통 가드 유틸(`requireUser`, `requireRole`)로 세션/권한 검사 표준화
- CSRF/기원 제한: `serverActions.allowedOrigins` 엄격 관리(프리뷰·스테이징 분리)
- 레이트 리미트: 세션/사용자/IP 기준 쓰기 액션에 레이트 리미터 적용(예: Upstash/Redis)
- 멱등성: 중복 제출 가능성이 있는 쓰기 액션은 `idempotencyKey` 지원
- 에러 규격: `{ ok: boolean, data?: T, error?: { code: string; message: string } }`
- 로깅/관측: Sentry 연동, 요청 식별자(requestId) 포함 구조화 로그
- 캐시 무효화: 태그 우선(`revalidateTag`) → 경로(`revalidatePath`), 태그 명명 규칙 문서화
- 파일/대용량: 파일은 Storage 업로드 후 메타만 DB 저장, `bodySizeLimit` 수치 명시 관리
- 테스트: 액션 래퍼 스모크 + 권한/검증 실패 케이스 포함

## Supabase 통합

- SSR: `@supabase/supabase-js` + `@supabase/ssr`로 세션 쿠키 안전 처리
- Storage: 이벤트 JSON(NFR1) 버킷 버전 관리, 런타임 로드
- 확장: 무거운 처리/훅은 Edge Functions로 확장 가능

## 아키텍처 확장 트리거(합의안)

- 기본: Next.js Server Actions + Supabase 유지(YAGNI)
- NestJS 고려: 복잡 도메인/모듈화(DDD), 큐·스케줄러·배치, 고급 WebSocket, 서드파티 통합 집약
- tRPC 고려: 엔드투엔드 타입 계약이 최우선이면서 Server Actions로 부족한 라우팅/스트리밍 요구
- 의사결정: 트리거 2개 이상 충족 시 PoC → 도입 여부 결정
