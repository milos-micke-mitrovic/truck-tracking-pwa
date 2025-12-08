import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '@/shared/hooks';
import { cn } from '@/shared/utils';
import { Text } from '@/shared/ui';

interface OfflineBannerProps {
  className?: string;
}

export function OfflineBanner({ className }: OfflineBannerProps) {
  const { isOnline } = useOnlineStatus();

  if (isOnline) {
    return null;
  }

  return (
    <div className={cn('offline-banner', className)}>
      <WifiOff size={16} />
      <Text size="sm" weight="medium">
        You are offline
      </Text>
    </div>
  );
}
