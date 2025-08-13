# 이벤트 JSON 스키마(NFR1)

## 개요

- 이벤트는 Supabase Storage 버킷에 버전 관리된 JSON으로 배포하고, 런타임에 로드하여 실행합니다.

## 스키마 예시(Zod)

```ts
import { z } from "zod";

export const EventChoiceSchema = z.object({
  id: z.string(),
  label: z.string(),
  results: z.array(
    z.object({
      probability: z.number().min(0).max(1),
      effects: z.array(z.string()), // ex) "resource:+SOUL:10"
    }),
  ),
});

export const EventSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  availableIf: z.array(z.string()).optional(),
  consumeDays: z.number().int().min(0).default(0),
  choices: z.array(EventChoiceSchema).min(2).max(4),
});

export const EventsFileSchema = z.object({
  version: z.string(),
  events: z.array(EventSchema),
});
```

## 배포/캐시 전략

- 버킷 경로에 버전 디렉터리 분리(예: `events/v1/events.json`)
- 클라이언트는 RSC/Server Action에서 로드하고 `revalidateTag`로 캐시 태깅
- 중대한 변경 시 버전 상승(하위 호환 유지 불가 시 강제)
