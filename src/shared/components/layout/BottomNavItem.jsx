// shared/components/layout/BottomNavItem.jsx

import { NavLink, useLocation } from 'react-router-dom';
import { ROUTES } from '@/shared/constants/routes';
import { CLASS_NAMES } from '@/shared/constants/bottomNavItems';

const BottomNavItem = ({
  route,

  outlineIcon: OutlineIcon,
  filledIcon: FilledIcon,

  isStandalone = false, // 기본으로 false, 채팅 버튼만 true로 적용되게
}) => {
  const location = useLocation();
  const typeClassNames = isStandalone
    ? CLASS_NAMES.chat
    : CLASS_NAMES.track;
  const isCollectionHome =
    route === ROUTES.COLLECTION &&
    location.pathname === ROUTES.HOME;

  const itemClassName =
    `${CLASS_NAMES.prefix}__${typeClassNames.item}`;

  const iconClassName =
    `${CLASS_NAMES.prefix}__${typeClassNames.icon}`;

  const activeBgClassName =
    typeClassNames.activeBg
      ? `${CLASS_NAMES.prefix}__${typeClassNames.activeBg}`
      : null;

  return (
    <NavLink
      to={route}
      className={({ isActive }) =>
        `${itemClassName} ${
          isActive || isCollectionHome ? 'active' : ''
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isStandalone && (
            <span className={activeBgClassName} />
          )}

          <span className={iconClassName}>
            {isActive || isCollectionHome
              ? <FilledIcon />
              : <OutlineIcon />}
          </span>
        </>
      )}
    </NavLink>
  );
};

export default BottomNavItem;
