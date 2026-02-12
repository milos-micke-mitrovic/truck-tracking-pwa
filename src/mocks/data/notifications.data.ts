import { NotificationType, ReferenceType } from '@/features/notifications/types/notification.types';
import type { NotificationResponse } from '@/features/notifications/types/notification.types';

export const mockNotifications: NotificationResponse[] = [
  {
    id: 'notif-001',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.ROUTE_ASSIGNED,
    title: 'New Route Assigned',
    message: 'You have been assigned route RL-2025-0413 from Indianapolis, IN to Columbus, OH.',
    referenceId: 'route-002',
    referenceType: ReferenceType.ROUTE,
    read: false,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(), // 30 min ago
    readAt: null,
  },
  {
    id: 'notif-002',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.ROUTE_ASSIGNED,
    title: 'New Route Assigned',
    message: 'You have been assigned route RL-2025-0412 from Chicago, IL to Detroit, MI.',
    referenceId: 'route-001',
    referenceType: ReferenceType.ROUTE,
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    readAt: null,
  },
  {
    id: 'notif-003',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.ROUTE_UPDATED,
    title: 'Route Updated',
    message: 'Route RL-2025-0410 delivery appointment has been changed to 3:00 PM - 5:00 PM.',
    referenceId: 'route-004',
    referenceType: ReferenceType.ROUTE,
    read: false,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    readAt: null,
  },
  {
    id: 'notif-004',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.ROUTE_CANCELLED,
    title: 'Route Cancelled',
    message: 'Route RL-2025-0395 from Atlanta, GA to Miami, FL has been cancelled by dispatch.',
    referenceId: null,
    referenceType: null,
    read: true,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    readAt: new Date(Date.now() - 23 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-005',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.POD_APPROVED,
    title: 'POD Approved',
    message: 'Your proof of delivery for stop Nashville Distribution has been approved.',
    referenceId: 'stop-302',
    referenceType: ReferenceType.POD,
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
    readAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 3600000).toISOString(),
  },
  {
    id: 'notif-006',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.POD_REJECTED,
    title: 'POD Rejected',
    message:
      'Your proof of delivery for stop Detroit Auto Parts has been rejected. Please resubmit with clearer photos.',
    referenceId: 'stop-102',
    referenceType: ReferenceType.POD,
    read: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
    readAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000 + 7200000).toISOString(),
  },
  {
    id: 'notif-007',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.SYSTEM,
    title: 'App Update Available',
    message: 'A new version of Track Drive is available. Please update to get the latest features.',
    referenceId: null,
    referenceType: null,
    read: true,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days ago
    readAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'notif-008',
    tenantId: 'tenant-001',
    driverId: 'drv-1001',
    type: NotificationType.SYSTEM,
    title: 'Scheduled Maintenance',
    message: 'The system will undergo maintenance on Sunday from 2:00 AM to 4:00 AM EST.',
    referenceId: null,
    referenceType: null,
    read: true,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
    readAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
  },
];
