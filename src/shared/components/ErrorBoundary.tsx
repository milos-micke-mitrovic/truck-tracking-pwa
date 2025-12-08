import { Component, type ReactNode, type ErrorInfo } from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button, EmptyState } from '@/shared/ui';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleRetry = (): void => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <IonPage>
          <IonContent className="ion-padding">
            <EmptyState
              icon={<AlertTriangle size={64} />}
              title="Something went wrong"
              description="An unexpected error occurred. Please try again."
              action={
                <Button onClick={this.handleRetry}>
                  <RefreshCw size={16} style={{ marginRight: 8 }} />
                  Retry
                </Button>
              }
            />
          </IonContent>
        </IonPage>
      );
    }

    return this.props.children;
  }
}
