# API 규격(Server Actions)

## 공통 응답

```ts
type ActionResult<T> =
  | { ok: true; data: T }
  | { ok: false; error: { code: string; message: string } };
```

## 액션 별 I/O(초안)

### startGame

- 입력: `{ seed?: string }`
- 출력: `{ day: number; turn: 'MORNING'|'NOON'|'EVENING'; resources: Record<string, number>; risk: number }`

### takeTurn

- 입력: `{ choice: 'EXPLORE'|'EVENT'|'CRAFT'|'REST'|'EXPAND' }`
- 출력: `{ logs: string[]; risk: number; resources: Record<string, number> }`

### recruit

- 입력: `{ traits: string[]; cost: Record<string, number> }`
- 출력: `{ unitId: string; name: string; stats: Record<string, number>; skills: string[] }`

### craft

- 입력: `{ recipeId: string }`
- 출력: `{ unitId: string }`

### saveProgress

- 입력: `{ day: number; summary: string }`
- 출력: `{ savedAt: string }`

## 검증/보안/캐시 규칙

- 모든 입력은 서버에서 Zod 재검증
- 권한 가드 표준화(`requireUser`), 레이트 리미트 적용 대상 명시
- 태깅: 읽기 `next: { tags: [...] }`, 쓰기 후 `revalidateTag` 우선
