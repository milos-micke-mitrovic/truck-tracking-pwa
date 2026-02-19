import { StopTimelineItem } from './StopTimelineItem';
import type { RouteStopResponse } from '../types/route.types';

interface RouteStopTimelineProps {
  stops: RouteStopResponse[];
  routeId: number;
}

export function RouteStopTimeline({ stops, routeId }: RouteStopTimelineProps) {
  const sortedStops = [...stops].sort((a, b) => a.stopOrder - b.stopOrder);

  return (
    <div className="route-stop-timeline">
      {sortedStops.map((stop) => (
        <StopTimelineItem key={stop.id} stop={stop} routeId={routeId} />
      ))}
    </div>
  );
}
