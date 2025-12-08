import { IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import type { ReactNode } from 'react';
import { cn } from '@/shared/utils';

export interface BottomBarItem {
  id: string;
  label: string;
  icon: ReactNode;
  href: string;
  badge?: number | string;
  disabled?: boolean;
}

export interface BottomBarProps {
  items: BottomBarItem[];
  className?: string;
}

export function BottomBar({ items, className }: BottomBarProps) {
  return (
    <IonTabBar slot="bottom" className={cn('bottom-bar', className)}>
      {items.map((item) => (
        <IonTabButton
          key={item.id}
          tab={item.id}
          href={item.href}
          disabled={item.disabled}
          className="bottom-bar__button"
        >
          <span className="bottom-bar__icon">{item.icon}</span>
          <IonLabel className="bottom-bar__label">{item.label}</IonLabel>
          {item.badge !== undefined && (
            <span className="bottom-bar__badge">
              {typeof item.badge === 'number' && item.badge > 99 ? '99+' : item.badge}
            </span>
          )}
        </IonTabButton>
      ))}
    </IonTabBar>
  );
}
