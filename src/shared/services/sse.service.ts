type SSEEventType =
  | 'ROUTE_ASSIGNED'
  | 'ROUTE_UPDATED'
  | 'ROUTE_CANCELLED'
  | 'POD_APPROVED'
  | 'POD_REJECTED'
  | 'SYSTEM';
type SSEHandler = (data: unknown) => void;

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const BASE_RECONNECT_DELAY_MS = 1000;
const MAX_RECONNECT_DELAY_MS = 30_000;

// const IS_MSW_ENABLED = import.meta.env.VITE_ENABLE_MSW === 'true';

class SSEService {
  private eventSource: EventSource | null = null;
  private handlers = new Map<SSEEventType, Set<SSEHandler>>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private tenantId: string | null = null;
  private driverId: string | null = null;
  private token: string | null = null;

  get isConnected(): boolean {
    return this.eventSource?.readyState === EventSource.OPEN;
  }

  connect(tenantId: string, driverId: string, token?: string): void {
    this.closeConnection();

    this.tenantId = tenantId;
    this.driverId = driverId;
    this.token = token || null;
    this.reconnectAttempts = 0;

    this.createConnection();
  }

  reconnect(): void {
    if (this.isConnected) return;
    if (!this.tenantId || !this.driverId) return;

    this.closeConnection();
    this.reconnectAttempts = 0;
    this.createConnection();
  }

  disconnect(): void {
    this.closeConnection();
    this.tenantId = null;
    this.driverId = null;
    this.token = null;
  }

  private closeConnection(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.reconnectAttempts = 0;
  }

  on(eventType: SSEEventType, handler: SSEHandler): () => void {
    if (!this.handlers.has(eventType)) {
      this.handlers.set(eventType, new Set());
    }
    this.handlers.get(eventType)!.add(handler);

    return () => {
      this.handlers.get(eventType)?.delete(handler);
    };
  }

  private createConnection(): void {
    if (!this.tenantId || !this.driverId) return;

    let url = `${API_BASE_URL}/sse/subscribe/${this.tenantId}/${this.driverId}`;
    if (this.token) {
      url += `?token=${encodeURIComponent(this.token)}`;
    }

    try {
      this.eventSource = new EventSource(url);

      this.eventSource.onopen = () => {
        this.reconnectAttempts = 0;
      };

      this.eventSource.onerror = () => {
        this.eventSource?.close();
        this.eventSource = null;
        this.scheduleReconnect();
      };

      // Listen for specific event types
      const eventTypes: SSEEventType[] = [
        'ROUTE_ASSIGNED',
        'ROUTE_UPDATED',
        'ROUTE_CANCELLED',
        'POD_APPROVED',
        'POD_REJECTED',
        'SYSTEM',
      ];
      for (const type of eventTypes) {
        this.eventSource.addEventListener(type, (event: MessageEvent) => {
          try {
            const data: unknown = JSON.parse(String(event.data));
            this.emit(type, data);
          } catch {
            // Ignore parse errors
          }
        });
      }

      // Also listen for generic messages
      this.eventSource.onmessage = (event: MessageEvent) => {
        try {
          const data = JSON.parse(String(event.data)) as {
            type?: string;
            payload?: unknown;
          };
          if (data.type && this.handlers.has(data.type as SSEEventType)) {
            this.emit(data.type as SSEEventType, data.payload ?? data);
          }
        } catch {
          // Ignore parse errors
        }
      };
    } catch {
      this.scheduleReconnect();
    }
  }

  private emit(type: SSEEventType, data: unknown): void {
    const typeHandlers = this.handlers.get(type);
    if (typeHandlers) {
      for (const handler of typeHandlers) {
        try {
          handler(data);
        } catch {
          // Don't let handler errors break the event loop
        }
      }
    }
  }

  private scheduleReconnect(): void {
    const delay = Math.min(
      BASE_RECONNECT_DELAY_MS * Math.pow(2, this.reconnectAttempts),
      MAX_RECONNECT_DELAY_MS
    );
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      this.createConnection();
    }, delay);
  }
}

export const sseService = new SSEService();
