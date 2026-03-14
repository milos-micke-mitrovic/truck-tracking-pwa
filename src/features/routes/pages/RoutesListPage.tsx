import { useState, useMemo } from 'react';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/react';
import { Search, X, Package } from 'lucide-react';
import { PageLayout } from '@/shared/components';
import { SkeletonGroup, EmptyState, Button } from '@/shared/ui';
import { RouteCard } from '../components/RouteCard';
import { RoutesFilter, type RouteFilterTab } from '../components/RoutesFilter';
import { useRoutes } from '../hooks/use-routes';
import { RouteStatus } from '../types/route.types';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

const ACTIVE_STATUSES = new Set([
  RouteStatus.BOOKED,
  RouteStatus.DISPATCHED,
  RouteStatus.IN_TRANSIT,
  RouteStatus.AT_PICKUP,
  RouteStatus.LOADED,
  RouteStatus.AT_DELIVERY,
]);

export function RoutesListPage() {
  const [filter, setFilter] = useState<RouteFilterTab>('active');
  const [searchTerm, setSearchTerm] = useState('');
  const { routes, isLoading, error, hasMore, refresh, loadMore } = useRoutes();

  const filteredRoutes = useMemo(() => {
    let result = routes;

    if (filter === 'active') {
      result = result.filter((r) => ACTIVE_STATUSES.has(r.status));
    } else {
      result = result.filter(
        (r) =>
          r.status === RouteStatus.DELIVERED ||
          r.status === RouteStatus.COMPLETED ||
          r.status === RouteStatus.INVOICED ||
          r.status === RouteStatus.PAID ||
          r.status === RouteStatus.CANCELLED
      );
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      result = result.filter(
        (r) =>
          r.brokerIdentifier?.toLowerCase().includes(term) ||
          r.internalIdentifier?.toLowerCase().includes(term) ||
          r.originCity?.toLowerCase().includes(term) ||
          r.destinationCity?.toLowerCase().includes(term)
      );
    }

    return result;
  }, [routes, filter, searchTerm]);

  const handleLoadMore = async (event: CustomEvent<void>) => {
    await loadMore();
    void (event.target as HTMLIonInfiniteScrollElement).complete();
  };

  return (
    <PageLayout title="My Loads" headerRightContent={<NotificationBell />} onRefresh={refresh}>
      <div className="routes-list-page">
        <div className="routes-search">
          <Search size={16} className="routes-search__icon" />
          <input
            type="text"
            className="routes-search__input"
            placeholder="Search by ID, origin or destination..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="routes-search__clear" onClick={() => setSearchTerm('')}>
              <X size={16} />
            </button>
          )}
        </div>

        <RoutesFilter
          value={filter}
          onChange={(newFilter: RouteFilterTab) => {
            setFilter(newFilter);
            void document.querySelector('.routes-list-page')?.closest('ion-content')?.scrollToTop(300);
          }}
        />

        {error && !routes.length ? (
          <div className="routes-list-page__error">
            <p>{error}</p>
            <Button variant="outline" size="small" onClick={refresh}>
              Retry
            </Button>
          </div>
        ) : isLoading && !routes.length ? (
          <SkeletonGroup count={3} />
        ) : filteredRoutes.length === 0 ? (
          <EmptyState
            icon={<Package size={48} />}
            title={filter === 'active' ? 'No active loads' : 'No completed loads'}
            description={
              filter === 'active'
                ? 'You have no active loads right now. New loads will appear here when dispatched.'
                : 'Your completed loads will appear here.'
            }
          />
        ) : (
          <div className="routes-list-page__list">
            {filteredRoutes.map((route) => (
              <RouteCard key={route.id} route={route} />
            ))}
          </div>
        )}
      </div>

      {hasMore && (
        <IonInfiniteScroll threshold="100px" onIonInfinite={handleLoadMore}>
          <IonInfiniteScrollContent loadingSpinner="crescent" />
        </IonInfiniteScroll>
      )}
    </PageLayout>
  );
}
