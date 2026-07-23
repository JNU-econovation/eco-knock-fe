// TODO: Replace this temporary data when the groups API contract is confirmed.
export const GROUPS = [
  {
    id: 'events',
    name: '행사부',
    category: '부서',
    memberCount: 7,
    memberLimit: 10,
    leaderName: '박봄',
    recruitmentStatus: '상시모집',
    createdAt: '2026-06-15',
    recruitmentEndsAt: null,
    isRecruiting: true,
    isLeader: true,
  },
  {
    id: 'ai-practice',
    name: 'AI 실전반',
    category: '스터디',
    memberCount: 4,
    memberLimit: 4,
    leaderName: '안성준',
    recruitmentStatus: '마감',
    createdAt: '2026-05-20',
    recruitmentEndsAt: '2026-06-10',
    isRecruiting: false,
    isLeader: false,
  },
];

export const MY_GROUP_IDS = ['events', 'ai-practice'];
