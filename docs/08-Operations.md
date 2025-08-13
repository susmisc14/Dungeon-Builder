# 운영/배포

## 배포

- Vercel 권장. 프로드/스테이징 분리.
- `transpilePackages`에 내부 패키지 명시.

## 환경/버전 고정

- `.nvmrc` 또는 `.node-version`으로 Node 버전 고정
- `package.json#engines` 엄격화, pnpm lockfile 유지

## CI/CD

- PR 파이프라인: `pnpm i --frozen-lockfile` → Turbo 캐시 복원 → `typecheck/lint/test/build`
- 캐시 아티팩트 보존

## 보안/제한

- `serverActions.allowedOrigins` 화이트리스트 관리
- 레이트 리미터(Upstash/Redis 등) 적용 지점 정의
- 파일 업로드는 Storage 사용, `bodySizeLimit` 관리
