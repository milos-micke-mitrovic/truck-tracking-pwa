// --- Enums ---

export enum NotificationType {
  ROUTE_ASSIGNED = 'ROUTE_ASSIGNED',
  ROUTE_UPDATED = 'ROUTE_UPDATED',
  ROUTE_CANCELLED = 'ROUTE_CANCELLED',
  POD_APPROVED = 'POD_APPROVED',
  POD_REJECTED = 'POD_REJECTED',
  SYSTEM = 'SYSTEM',
}

export enum ReferenceType {
  ROUTE = 'ROUTE',
  STOP = 'STOP',
  POD = 'POD',
}

// --- Response Types ---

export interface NotificationResponse {
  id: number;
  tenantId: number;
  recipientDriverId: number;
  type: NotificationType;
  channel: string;
  title: string;
  body: string;
  referenceId: number | null;
  referenceType: ReferenceType | null;
  read: boolean;
  createdAt: string;
  readAt: string | null;
}

export interface UnreadCountResponse {
  count: number;
}
