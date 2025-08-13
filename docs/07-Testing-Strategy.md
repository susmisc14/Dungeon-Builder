# 테스트 전략

## 단위/통합

- Vitest + React Testing Library
- 순수 비즈니스 로직(계산/판정/확률)은 모듈로 분리해 단위 테스트 집중

## 품질 게이트

- 프리푸시 훅: `typecheck && test`
- CI: `pnpm i --frozen-lockfile` 후 `typecheck/lint/test/build` 병렬 실행

## 비고

- 현재 E2E 테스트는 제외. 추후 필요 시나리오 정리 후 단계적 도입 검토
