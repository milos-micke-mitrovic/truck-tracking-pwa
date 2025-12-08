import {
  IonPage,
  IonContent,
  IonMenuButton,
  IonButtons,
  IonRefresher,
  IonRefresherContent,
} from '@ionic/react';
import type { ReactNode } from 'react';
import type { RefresherEventDetail } from '@ionic/react';
import { Header } from '@/shared/ui';
import { cn } from '@/shared/utils';

export interface PageLayoutProps {
  children: ReactNode;
  title: string;
  headerLeftContent?: ReactNode;
  headerRightContent?: ReactNode;
  showMenuButton?: boolean;
  fullscreen?: boolean;
  className?: string;
  contentClassName?: string;
  onRefresh?: () => Promise<void>;
}

export function PageLayout({
  children,
  title,
  headerLeftContent,
  headerRightContent,
  showMenuButton = true,
  fullscreen = false,
  className,
  contentClassName,
  onRefresh,
}: PageLayoutProps) {
  const leftContent =
    headerLeftContent ??
    (showMenuButton ? (
      <IonButtons>
        <IonMenuButton />
      </IonButtons>
    ) : undefined);

  const handleRefresh = async (event: CustomEvent<RefresherEventDetail>) => {
    if (onRefresh) {
      await onRefresh();
    }
    event.detail.complete();
  };

  return (
    <IonPage className={cn('page-layout', className)}>
      <Header title={title} leftContent={leftContent} rightContent={headerRightContent} />
      <IonContent fullscreen={fullscreen} className={cn('page-content', contentClassName)}>
        {onRefresh && (
          <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
            <IonRefresherContent pullingText="Pull to refresh" refreshingSpinner="crescent" />
          </IonRefresher>
        )}
        {children}
      </IonContent>
    </IonPage>
  );
}
