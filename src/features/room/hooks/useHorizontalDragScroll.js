import { useLayoutEffect, useRef } from 'react';

export const useHorizontalDragScroll = (itemCount) => {
  const scrollElementRef = useRef(null);
  const dragRef = useRef(null);
  const hasSetInitialPositionRef = useRef(false);

  useLayoutEffect(() => {
    const scrollElement = scrollElementRef.current;

    if (!scrollElement || hasSetInitialPositionRef.current || itemCount === 0) {
      return;
    }

    scrollElement.scrollLeft = scrollElement.scrollWidth - scrollElement.clientWidth;
    hasSetInitialPositionRef.current = true;
  }, [itemCount]);

  const clearDrag = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    if (drag.element.hasPointerCapture?.(event.pointerId)) {
      drag.element.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
  };

  const onPointerDown = (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0) return;

    dragRef.current = {
      element: event.currentTarget,
      pointerId: event.pointerId,
      startX: event.clientX,
      startScrollLeft: event.currentTarget.scrollLeft,
    };

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    event.preventDefault();
    drag.element.scrollLeft = drag.startScrollLeft - (event.clientX - drag.startX);
  };

  return {
    ref: scrollElementRef,
    onPointerDown,
    onPointerMove,
    onPointerUp: clearDrag,
    onPointerCancel: clearDrag,
  };
};
