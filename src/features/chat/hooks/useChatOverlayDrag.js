import { useCallback, useEffect, useRef } from 'react';

const CLOSE_DISTANCE = 96;
const CLOSE_VELOCITY = 0.6;
const INTERACTIVE_ELEMENT_SELECTOR = 'button, input, textarea, select, a';

const useChatOverlayDrag = ({ isOpen, onClose }) => {
  const sheetRef = useRef(null);
  const dragRef = useRef(null);

  const resetDrag = useCallback(() => {
    const sheet = sheetRef.current;

    sheet?.classList.remove('chat-overlay__sheet--dragging');
    sheet?.style.removeProperty('--chat-drag-offset');
    dragRef.current = null;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetDrag();
    }

    return resetDrag;
  }, [isOpen, resetDrag]);

  const handlePointerDown = useCallback((event) => {
    if (
      !isOpen ||
      !event.isPrimary ||
      (event.pointerType === 'mouse' && event.button !== 0) ||
      event.target.closest(INTERACTIVE_ELEMENT_SELECTOR)
    ) {
      return;
    }

    dragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startTime: event.timeStamp,
    };

    event.currentTarget.setPointerCapture(event.pointerId);
    sheetRef.current?.classList.add('chat-overlay__sheet--dragging');
  }, [isOpen]);

  const handlePointerMove = useCallback((event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = Math.max(0, event.clientY - drag.startY);
    sheetRef.current?.style.setProperty('--chat-drag-offset', `${distance}px`);
  }, []);

  const handlePointerUp = useCallback((event) => {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    const distance = Math.max(0, event.clientY - drag.startY);
    const elapsed = Math.max(1, event.timeStamp - drag.startTime);
    const velocity = distance / elapsed;
    const shouldClose =
      distance >= CLOSE_DISTANCE || velocity >= CLOSE_VELOCITY;

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    resetDrag();

    if (shouldClose) {
      onClose();
    }
  }, [onClose, resetDrag]);

  const handlePointerCancel = useCallback((event) => {
    if (dragRef.current?.pointerId === event.pointerId) {
      resetDrag();
    }
  }, [resetDrag]);

  return {
    sheetRef,
    headerPointerHandlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerUp,
      onPointerCancel: handlePointerCancel,
    },
  };
};

export default useChatOverlayDrag;
