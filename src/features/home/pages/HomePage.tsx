import { PageLayout } from '@/shared/components';
import { WelcomeCard, QuickStats, ActiveDelivery, QuickActions } from '../components';

export function HomePage() {
  const handleRefresh = async () => {
    // Simulate refresh - will be replaced with real data fetch
    await new Promise((resolve) => setTimeout(resolve, 1000));
  };

  return (
    <PageLayout title="Home" onRefresh={handleRefresh}>
      <div className="home-page">
        <WelcomeCard />
        <QuickStats />
        <ActiveDelivery />
        <QuickActions />
      </div>
    </PageLayout>
  );
}
