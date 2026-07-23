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
    description:
      '안녕하세요! 우즐~ 모즐~!! 행사부입니다.\n' +
      '행사부는 직접 다양한 행사를\n' +
      '기획해 나갈 수 있습니다.\n' +
      '또한 다양한 행사가 만들어지는 과정을\n' +
      '직접 경험 할 수 있습니다!!',
    recruitmentPeriod: '2026년 3월 1일 ~ 2026년 3월 24일',
    members: [
      '박봄',
      '박선주',
      '김수랑',
      '신준현',
      '조해시',
      '이상현',
      '박현솔',
      '박태은',
    ],
    applications: [
      {
        id: 'go-junhee',
        applicantName: '고준희',
        message:
          '만약 행사부에 들어가게 된다면\n' +
          '열심히 최선을 다하겠습니다\n' +
          '사랑합니다',
      },
      {
        id: 'hong-gildong',
        applicantName: '홍길동',
        message: '행사부에서 즐겁게 활동하고 싶습니다.',
      },
    ],
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
    description: 'AI를 직접 실습하며 함께 성장하는 스터디입니다.',
    recruitmentPeriod: '상시 모집',
    members: ['안성준', '김지민', '박선주', '이상현'],
    applications: [],
  },
  {
    id: 'video-production',
    name: '영상 제작반',
    category: '스터디',
    memberCount: 3,
    memberLimit: 8,
    leaderName: '김민지',
    recruitmentStatus: '모집중',
    createdAt: '2026-07-20',
    recruitmentEndsAt: '2026-08-15',
    isRecruiting: true,
    isLeader: false,
    description:
      '영상 기획부터 촬영, 편집까지 함께 배우는 스터디입니다.\n' +
      '경험이 없어도 즐겁게 참여할 수 있습니다.',
    recruitmentPeriod: '2026년 7월 24일 ~ 2026년 8월 15일',
    members: ['김민지', '이서준', '박하늘'],
    applications: [],
  },
];

export const MY_GROUP_IDS = ['events', 'ai-practice'];
