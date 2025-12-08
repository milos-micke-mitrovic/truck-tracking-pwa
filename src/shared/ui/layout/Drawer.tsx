import {
  IonMenu,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonMenuToggle,
} from '@ionic/react';
import type { ReactNode } from 'react';
import { Home, Map, Settings, LogOut, HelpCircle, User } from 'lucide-react';
import { useAuthStore } from '@/shared/stores';
import { Avatar } from '../data-display';
import { Text } from '../typography';
import { cn } from '@/shared/utils';

export interface DrawerItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
}

export interface DrawerSection {
  title?: string;
  items: DrawerItem[];
}

export interface DrawerProps {
  contentId: string;
  sections?: DrawerSection[];
  className?: string;
}

const defaultSections: DrawerSection[] = [
  {
    title: 'Navigation',
    items: [
      { id: 'home', label: 'Home', icon: <Home size={20} />, href: '/home' },
      { id: 'map', label: 'Map', icon: <Map size={20} />, href: '/map' },
    ],
  },
  {
    title: 'Account',
    items: [
      {
        id: 'profile',
        label: 'Profile',
        icon: <User size={20} />,
        href: '/profile',
        disabled: true,
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings size={20} />,
        href: '/settings',
        disabled: true,
      },
      {
        id: 'help',
        label: 'Help & Support',
        icon: <HelpCircle size={20} />,
        href: '/help',
        disabled: true,
      },
    ],
  },
];

export function Drawer({ contentId, sections = defaultSections, className }: DrawerProps) {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <IonMenu contentId={contentId} className={cn('drawer', className)}>
      <IonHeader className="ion-no-border">
        <IonToolbar color="primary">
          <div className="drawer__header">
            <div className="drawer__user">
              <Avatar size="lg" fallback={user?.name ? getInitials(user.name) : 'U'} />
              <div className="drawer__user-info">
                <Text weight="semibold" className="drawer__user-name">
                  {user?.name || 'Driver'}
                </Text>
                <Text size="sm" className="drawer__user-email">
                  {user?.email || ''}
                </Text>
              </div>
            </div>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent className="drawer__content">
        {sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="drawer__section">
            {section.title && (
              <Text size="xs" weight="semibold" className="drawer__section-title">
                {section.title}
              </Text>
            )}
            <IonList lines="none">
              {section.items.map((item) => (
                <IonMenuToggle key={item.id} autoHide={false}>
                  <IonItem
                    className="drawer__item"
                    routerLink={item.href}
                    routerDirection="root"
                    button
                    disabled={item.disabled}
                    onClick={item.onClick}
                    detail={false}
                  >
                    <span className="drawer__item-icon">{item.icon}</span>
                    <IonLabel>{item.label}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              ))}
            </IonList>
          </div>
        ))}

        <div className="drawer__section">
          <IonList lines="none">
            <IonMenuToggle autoHide={false}>
              <IonItem className="drawer__item" button onClick={logout} detail={false}>
                <span className="drawer__item-icon">
                  <LogOut size={20} />
                </span>
                <IonLabel color="danger">Logout</IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </div>

        <div className="drawer__footer">
          <Text size="xs" color="tertiary" align="center" className="drawer__version">
            Truck Drive v{import.meta.env.VITE_APP_VERSION || '1.0.0'}
          </Text>
        </div>
      </IonContent>
    </IonMenu>
  );
}
