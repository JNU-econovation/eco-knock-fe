// shared/components/layout/BottomNav.jsx

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './BottomNav.css';

import { ROUTES } from '@/shared/constants/routes';
import { NAV_ITEMS } from '@/shared/constants/bottomNavItems';
import BottomNavItem, { CLASS_NAMES } from './BottomNavItem';


const BG_WIDTH = 70; // 아이콘 4개있는 트랙의 활성화 배경 너비!


const BottomNav = () => {
  const location = useLocation();

  const trackRef = useRef(null);

  const [bgStyle, setBgStyle] = useState({
    x: 0,
    opacity: 1,
  });

  useEffect(() => {
    const activeItem =
      trackRef.current?.querySelector(
        `.${CLASS_NAMES.prefix}__${CLASS_NAMES.track.item}.active`
      );

    if (
      !activeItem ||
      location.pathname === ROUTES.CHAT
    ) {
      setBgStyle((prev) => ({
        ...prev,
        opacity: 0,
      }));

      return;
    }

    const itemCenter =
      activeItem.offsetLeft +
      activeItem.offsetWidth / 2;

    setBgStyle({
      x: itemCenter - BG_WIDTH / 2,
      opacity: 1,
    });
  }, [location.pathname]);

  return (
    <nav className={`${CLASS_NAMES.prefix}`}>
      <div
        className={`${CLASS_NAMES.prefix}__${CLASS_NAMES.track.wrapper}`}
        ref={trackRef}
      >
        <span
          className={
            `${CLASS_NAMES.prefix}__${CLASS_NAMES.track.activeBg}`
          }
          style={{
            transform:
              `translateX(${bgStyle.x}px) translateY(-50%)`,
            opacity: bgStyle.opacity,
          }}
        />

        {NAV_ITEMS
          .filter((item) => !item.isStandalone)
          .map((item) => (
            <BottomNavItem
              key={item.route}
              {...item}
            />
          ))}
      </div>

      {NAV_ITEMS
        .filter((item) => item.isStandalone)
        .map((item) => (
          <BottomNavItem
            key={item.route}
            {...item}
          />
        ))}
    </nav>
  );
};

export default BottomNav;