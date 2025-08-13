# 데이터 모델(초안)

## 엔티티

- Player: 사용자/세션 식별, 누적 업적/계승 포인트
- Dungeon: 위험도, 파티 슬롯 수, 시설 업그레이드
- Resource: 영혼, 뼈 조각 등 보유량
- Unit: 공통 유닛(동료/언데드) 기본 스탯, 피로도/내구도, 전위/후위 배치, 자동 퇴각 임계값
- Party: 방어 파티 구성(여러 Unit), 전투 순서
- Event: 외부 JSON 정의 이벤트 메타(id, 조건, 소모 일수, 선택지, 확률)
- Prisoner: 포로 상태, 저항 의지, 상호작용 로그
- SkillCard: 희귀도, 효과, 초월 규칙
- EndingFlag: 멀티 엔딩 분기를 위한 플래그
- RunProgress: 회차 진행(일수, 로그, 결과 요약)

## 관계(개념)

- Player 1 - N RunProgress
- Player 1 - 1 Dungeon
- Dungeon 1 - N Party, Party N - N Unit
- Player 1 - N Unit, 1 - N Prisoner, 1 - N SkillCard

## 이벤트 스키마 연계

- 이벤트는 외부 JSON으로 관리(NFR1). 자세한 스키마는 `docs/06-Events-Schema.md` 참고.
