import { PageLayout } from '@/shared/components';
import { WelcomeCard, QuickStats, ActiveDelivery } from '../components';
import { useRoutes } from '@/features/routes/hooks/use-routes';
import { NotificationBell } from '@/features/notifications/components/NotificationBell';

export function HomePage() {
  const { refresh } = useRoutes();

  return (
    <PageLayout title="Home" headerRightContent={<NotificationBell />} onRefresh={refresh}>
      <div className="home-page">
        <WelcomeCard />
        <QuickStats />
        <ActiveDelivery />
      </div>
    </PageLayout>
  );
}
