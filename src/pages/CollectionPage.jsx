// pages/CollectionPage.jsx
import CollectionGrid from '@/features/collection/components/CollectionGrid';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';

const CollectionPage = () => {
  return (
    <MainPageFrame title="ECO-KNOCK">
      <CollectionGrid />
    </MainPageFrame>
  );
};

export default CollectionPage;
