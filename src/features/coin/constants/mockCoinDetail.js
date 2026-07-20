// TODO: 코인 상세 API 계약이 확정되면 실제 응답 데이터로 교체합니다.
// export const MOCK_COIN_DETAIL = {
//   coinBalance: null,
//   coinLogs: [],
//   coinRecords: [],
// };
export const MOCK_COIN_DETAIL = {
  coinBalance: 13240,
  coinLogs: [
    {
      id: 1,
      description: '동방에 한 시간 있었어요!',
      occurredAtLabel: '2026.03.24.',
      amount: 10,
    },
    {
      id: 2,
      description: '분리수거에 참여했어요!',
      occurredAtLabel: '2026.03.23.',
      amount: 20,
    },
    {
      id: 3,
      description: '코인을 사용했어요.',
      occurredAtLabel: '2026.03.22.',
      amount: -10,
    },
  ],
  coinRecords: [
    {
      id: 1,
      rank: 1,
      userName: '박봄',
      amount: 44444,
    },
    {
      id: 2,
      rank: 2,
      userName: '박선주',
      amount: 44222,
    },
    {
      id: 3,
      rank: 3,
      userName: '조해서',
      amount: 44111,
    },
  ],
};
