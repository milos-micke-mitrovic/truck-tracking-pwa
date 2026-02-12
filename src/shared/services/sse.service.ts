type SSEEventType =
  | 'ROUTE_ASSIGNED'
  | 'ROUTE_UPDATED'
  | 'ROUTE_CANCELLED'
  | 'NOTIFICATION_RECEIVED';
type SSEHandler = (data: unknown) => void;

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
const MAX_RECONNECT_ATTEMPTS = 5;
const BASE_RECONNECT_DELAY_MS = 1000;

const IS_MSW_ENABLED = import.meta.env.VITE_ENABLE_MSW === 'true';

class SSEService {
  private eventSource: EventSource | null = null;
  private handlers = new Map<SSEEventType, Set<SSEHandler>>();
  private reconnectAttempts = 0;
  private reconnectTimer: ReturnType<typeof setTimeout> | null = null;
  private tenantId: string | null = null;
  private driverId: string | null = null;

  connect(tenantId: string, driverId: string): void {
    if (this.eventSource) {
      this.disconnect();
    }

    this.tenantId = tenantId;
    this.driverId = driverId;
    this.reconnectAttempts = 0;

    // MSW can't intercept EventSource — skip real connection in dev mock mode
    if (!IS_MSW_ENABLED) {
      this.createConnection();
    }
  }

  disconnect(): void {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }

    if (this.eventSource) {
      this.eventSource.close();
      this.eventSource = null;
    }

    this.tenantId = null;
    this.driverId = null;
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

    const url = `${API_BASE_URL}/sse/subscribe/${this.tenantId}/${this.driverId}`;

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
        'NOTIFICATION_RECEIVED',
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
    if (this.reconnectAttempts >= MAX_RECONNECT_ATTEMPTS) {
      return;
    }

    const delay = BASE_RECONNECT_DELAY_MS * Math.pow(2, this.reconnectAttempts);
    this.reconnectAttempts++;

    this.reconnectTimer = setTimeout(() => {
      this.createConnection();
    }, delay);
  }
}

export const sseService = new SSEService();
