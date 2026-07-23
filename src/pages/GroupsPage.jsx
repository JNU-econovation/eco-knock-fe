import GroupList from '@/features/groups/components/GroupList';
import GroupsToolbar from '@/features/groups/components/GroupsToolbar';
import { useGroupsView } from '@/features/groups/hooks/useGroupsView';
import { useProfile } from '@/features/mypage/hooks/useProfile';
import MainPageFrame from '@/shared/components/layout/MainPageFrame';
import './GroupsPage.css';

const GroupsPage = () => {
  const profile = useProfile();
  const {
    activeView,
    setActiveView,
    hideClosedGroups,
    setHideClosedGroups,
    sortOrder,
    setSortOrder,
    visibleGroups,
  } = useGroupsView();

  const title = (
    <span className="groups-page__tabs" aria-label="그룹 보기">
      <button
        className={activeView === 'mine' ? 'active' : ''}
        type="button"
        aria-pressed={activeView === 'mine'}
        onClick={() => setActiveView('mine')}
      >
        내소속
      </button>
      <button
        className={activeView === 'browse' ? 'active' : ''}
        type="button"
        aria-pressed={activeView === 'browse'}
        onClick={() => setActiveView('browse')}
      >
        둘러보기
      </button>
    </span>
  );

  return (
    <MainPageFrame title={title} className="groups-page-frame">
      <div className="groups-page__content">
        {activeView === 'browse' && (
          <GroupsToolbar
            hideClosedGroups={hideClosedGroups}
            onHideClosedGroupsChange={setHideClosedGroups}
            sortOrder={sortOrder}
            onSortOrderChange={setSortOrder}
            canCreate={
              profile?.role === 'USER' || profile?.role === 'ADMIN'
            }
          />
        )}
        <GroupList groups={visibleGroups} />
      </div>
    </MainPageFrame>
  );
};

export default GroupsPage;
