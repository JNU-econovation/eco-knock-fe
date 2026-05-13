// pages/CollectionPage.jsx
import CollectionGrid from '@/features/collection/components/CollectionGrid';
import './CollectionPage.css';

const CollectionPage = () => {
  return (
    <div className="collection-page">
      {/* 로고 */}
      <h1 className="collection-page__logo">ECO-KNOCK</h1>

      {/* 바로가기 컬렉션 그리드 */}
      <CollectionGrid />
    </div>
  );
};

export default CollectionPage;