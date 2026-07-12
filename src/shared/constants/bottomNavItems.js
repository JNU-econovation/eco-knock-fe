// shared/constants/bottomNavItems.js
import { ROUTES } from "./routes";
import {
  CollectionOutlineIcon, CollectionFilledIcon,
  RoomOutlineIcon, RoomFilledIcon,
  RecruitOutlineIcon, RecruitFilledIcon,
  MypageOutlineIcon, MypageFilledIcon,
  ChatOutlineIcon, ChatFilledIcon,
} from "@/assets/icons/BottomNavIcons";

// 하단바 클래스명 정의
export const CLASS_NAMES = {
  prefix: 'bottom-nav',

  track: {
    wrapper: 'track',
    item: 'item',
    icon: 'icon',
    activeBg: 'active-bg',
  },

  chat: {
    item: 'chat-btn',
    icon: 'chat-icon',
    activeBg: 'chat-active-bg',
  },
};


// -- 왼쪽 4개 아이콘 트랙 아이템(아이콘) 정보
export const NAV_ITEMS = [
  {
    route: ROUTES.COLLECTION,
    label: '모아두기',
    outlineIcon: CollectionOutlineIcon,
    filledIcon: CollectionFilledIcon,
  },
  {
    route: ROUTES.ROOM,
    label: '동방',
    outlineIcon: RoomOutlineIcon,
    filledIcon: RoomFilledIcon,
  },
  {
    route: ROUTES.RECRUIT,
    label: '부서모집',
    outlineIcon: RecruitOutlineIcon,
    filledIcon: RecruitFilledIcon,
  },
  {
    route: ROUTES.MYPAGE,
    label: '마이페이지',
    outlineIcon: MypageOutlineIcon,
    filledIcon: MypageFilledIcon,
  },
  {
    route: ROUTES.CHAT,
    label: 'AI 채팅',
    outlineIcon: ChatOutlineIcon,
    filledIcon: ChatFilledIcon,

    isStandalone: true, // 혼자 동떨어짐. 로직에 반영하기 위해 prop 추가
  },
];
