// features/collection/components/CollectionItem.jsx
import './CollectionItem.css';

const CollectionItem = ({ item }) => {
  const handleClick = () => {
    // TODO: 각 링크의 URL 연결
    // 예시: window.open(item.url, '_blank')
    window.open(item.url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="collection-item" onClick={handleClick}>
      <div className="collection-item__icon-wrap">
        {item.icon ? (
          <img
            src={item.icon}
            alt={item.name}
            className="collection-item__icon"
          />
        ) : (
          <span >{item.name}</span>
        )}
        {/* TODO: 바로가기 이미지 없을 때 Chrome이나 Notion처럼 생성되게 할 순 없을까... */}
        {/* TODO: 3개 열 맞춰서 없는 부분은 비어있는 empty 이용하기 */}
      </div>
      <span className="collection-item__name">{item.name}</span>
    </div>
  );
};

export default CollectionItem;

// 아이콘 없을 때 빈 상태 -> <div className="collection-item__icon-empty" />