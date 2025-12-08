import { IonList, IonItem, IonLabel, IonNote } from '@ionic/react';
import type { ReactNode } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/shared/utils';
import { Heading, Text } from '../typography';

export interface ListProps {
  children: ReactNode;
  inset?: boolean;
  lines?: 'full' | 'inset' | 'none';
  className?: string;
}

export function List({ children, inset = false, lines = 'full', className }: ListProps) {
  return (
    <IonList inset={inset} lines={lines} className={cn('list', className)}>
      {children}
    </IonList>
  );
}

export interface ListItemProps {
  children?: ReactNode;
  title: string;
  subtitle?: string;
  note?: string;
  startContent?: ReactNode;
  endContent?: ReactNode;
  href?: string;
  onClick?: () => void;
  showChevron?: boolean;
  disabled?: boolean;
  className?: string;
}

export function ListItem({
  children,
  title,
  subtitle,
  note,
  startContent,
  endContent,
  href,
  onClick,
  showChevron = false,
  disabled = false,
  className,
}: ListItemProps) {
  const isClickable = !!href || !!onClick;

  return (
    <IonItem
      className={cn('list-item', className)}
      routerLink={href}
      button={isClickable}
      onClick={onClick}
      disabled={disabled}
      detail={false}
    >
      {startContent && <div slot="start">{startContent}</div>}
      <IonLabel>
        <Heading level={6}>{title}</Heading>
        {subtitle && (
          <Text size="sm" color="secondary">
            {subtitle}
          </Text>
        )}
        {children}
      </IonLabel>
      {note && <IonNote slot="end">{note}</IonNote>}
      {endContent && <div slot="end">{endContent}</div>}
      {showChevron && isClickable && (
        <div slot="end">
          <ChevronRight size={20} color="var(--color-text-tertiary)" />
        </div>
      )}
    </IonItem>
  );
}
