// features/collection/components/CollectionGrid.jsx
import { useState } from 'react';
import CollectionItem from './CollectionItem';
import './CollectionGrid.css';

// TODO: 각 항목의 url 값을 실제 URL로 교체하기
const DEFAULT_ITEMS = [
  { id: 'whosin',   name: '후즈인',    url: '/* TODO: 후즈인 URL */',        icon: null },
  { id: 'eeos',     name: 'EEOS',      url: '/* TODO: EEOS URL */',          icon: null },
  { id: 'homepage', name: '홈페이지',  url: '/* TODO: 에코노 홈페이지 URL */', icon: null },
  { id: 'news',     name: '뉴스',      url: '/* TODO: 에코노 뉴스 URL */',    icon: null },
  { id: 'band',     name: '밴드',      url: '/* TODO: 에코노 밴드 URL */',    icon: null },
  { id: 'github',   name: '깃허브',    url: '/* TODO: 에코노 깃허브 URL */',  icon: null },
  { id: 'zep',      name: 'ZEP',       url: '/* TODO: ZEP URL */',           icon: null },
];

const CollectionGrid = () => {
  const [items, setItems] = useState(DEFAULT_ITEMS);
  const [isEditMode, setIsEditMode] = useState(false);

  // 드래그 상태
  const [dragId, setDragId] = useState(null);

  // 순서 변경 (드래그 앤 드롭)
  const handleDragStart = (id) => {
    setDragId(id);
  };

  const handleDrop = (targetId) => {
    if (dragId === targetId) return;
    const dragIndex  = items.findIndex((i) => i.id === dragId);
    const dropIndex  = items.findIndex((i) => i.id === targetId);
    const reordered  = [...items];
    const [dragged]  = reordered.splice(dragIndex, 1);
    reordered.splice(dropIndex, 0, dragged);
    setItems(reordered);
    setDragId(null);
  };

  // 항목 숨기기 / 삭제
  const handleRemove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="collection-grid__wrapper">
      {/* 헤더 */}
      <div className="collection-grid__header">
        <span className="collection-grid__title">KNOCK COLLECTION</span>
        <div className="collection-grid__header-actions">
          {/* 프레임 변환 버튼 */}
          <button
            className="collection-grid__icon-btn"
            aria-label="프레임 변환"
            onClick={() => {
              // TODO: 프레임 유형 변환 로직 추가
            }}
          >
            {/* 위아래 화살표 아이콘, TODO: 바꾸기 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M7 16V4m0 0L3 8m4-4l4 4" />
              <path d="M17 8v12m0 0l4-4m-4 4l-4-4" />
            </svg>
          </button>

          {/* 편집 버튼 */}
          <button
            className={`collection-grid__icon-btn ${isEditMode ? 'active' : ''}`}
            aria-label="편집"
            onClick={() => setIsEditMode((prev) => !prev)}
          >
            {/* 연필 아이콘, TODO: 바꾸기 */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 그리드 */}
      <div className="collection-grid">
        {items.map((item) => (
          <div
            key={item.id}
            className={`collection-grid__cell ${isEditMode ? 'edit-mode' : ''}`}
            draggable={isEditMode}
            onDragStart={() => handleDragStart(item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(item.id)}
          >
            <CollectionItem item={item} />

            {/* 편집 모드일 때 삭제 버튼 */}
            {isEditMode && (
              <button
                className="collection-grid__remove-btn"
                onClick={() => handleRemove(item.id)}
                aria-label={`${item.name} 삭제`}
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {/* 편집 모드일 때 항목 추가 버튼 */}
        {isEditMode && (
          <div className="collection-grid__cell">
            <button
              className="collection-grid__add-btn"
              onClick={() => {
                // TODO: 항목 추가 모달/입력 UI 연결
              }}
            >
              <span>＋</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionGrid;