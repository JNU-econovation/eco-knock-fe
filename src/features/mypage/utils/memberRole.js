const MEMBER_ROLE_LABELS = {
  USER: '일반회원',
  ADMIN: '관리자',
  GUEST: '게스트',
};

export const getMemberRoleLabel = (role) => MEMBER_ROLE_LABELS[role] ?? '';
