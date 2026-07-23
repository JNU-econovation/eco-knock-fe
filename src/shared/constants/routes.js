// shared/constants/routes.js

export const ROUTES = {

  HOME:       '/',

  LOGIN:      '/login',
  LOGIN_ADMIN: '/login/admin',

  COLLECTION: '/collection',   // 모아두기
  
  ROOM:       '/room',         // 동방
  ROOM_TEMPERATURE: '/room/temperature',
  ROOM_HUMIDITY: '/room/humidity',
  ROOM_FINE_DUST: '/room/fine-dust',
  ROOM_AIR_QUALITY: '/room/air-quality',

  
  GROUPS:     '/groups',       // 그룹
  GROUP_CREATE: '/groups/create',
  GROUP_DETAIL: '/groups/:groupId',
  GROUP_SETTINGS: '/groups/:groupId/settings',
  GROUP_NAME_SETTINGS: '/groups/:groupId/settings/name',
  GROUP_MEMBER_SETTINGS: '/groups/:groupId/settings/members',
  GROUP_APPLICATION: '/groups/:groupId/apply',

  
  MYPAGE:     '/mypage',       // 마이페이지
  MYPAGE_COIN: '/mypage/coin', // 코인 로그
  MYPAGE_COIN_LOG: '/mypage/coin/log', // 전체 코인 내역
  
  
  CHAT:       '/ai-chat',      // LLM 채팅
};
