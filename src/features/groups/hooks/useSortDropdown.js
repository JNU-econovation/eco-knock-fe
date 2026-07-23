import { useEffect, useRef, useState } from 'react';

export const useSortDropdown = ({ onSortOrderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        dropdownRef.current
          ?.querySelector('.group-sort-dropdown__trigger')
          ?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const selectSortOrder = (nextSortOrder) => {
    onSortOrderChange(nextSortOrder);
    setIsOpen(false);
  };

  return {
    dropdownRef,
    isOpen,
    toggleDropdown: () => setIsOpen((current) => !current),
    selectSortOrder,
  };
};
