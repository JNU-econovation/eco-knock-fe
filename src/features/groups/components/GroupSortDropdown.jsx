import { GROUP_SORT_OPTIONS } from '@/features/groups/constants/groupSortOptions';
import { useSortDropdown } from '@/features/groups/hooks/useSortDropdown';
import './GroupSortDropdown.css';

const GroupSortDropdown = ({ sortOrder, onSortOrderChange }) => {
  const {
    dropdownRef,
    isOpen,
    toggleDropdown,
    selectSortOrder,
  } = useSortDropdown({ onSortOrderChange });

  return (
    <div className="group-sort-dropdown" ref={dropdownRef}>
      <button
        className="group-sort-dropdown__trigger"
        type="button"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={toggleDropdown}
      >
        정렬 {isOpen ? '▲' : '▼'}
      </button>

      {isOpen && (
        <div
          className="group-sort-dropdown__menu"
          role="listbox"
          aria-label="그룹 정렬"
        >
          {GROUP_SORT_OPTIONS.map((option) => (
            <button
              key={option.value}
              className={`group-sort-dropdown__option${
                sortOrder === option.value ? ' active' : ''
              }`}
              type="button"
              role="option"
              aria-selected={sortOrder === option.value}
              onClick={() => selectSortOrder(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default GroupSortDropdown;
