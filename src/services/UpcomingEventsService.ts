import '@pnp/graph/users';
import '@pnp/graph/calendars';
import { Event } from '@microsoft/microsoft-graph-types';
import { CommonsState } from '../stateModels/CommonsState';
import { GraphSelectFields, GRAPH_UPCOMING_EVENTS_DAYS, GRAPH_UPCOMING_EVENTS_TOP } from '../constants/GraphQueryConstants';
import { LoggingService } from './LoggingService';

export class UpcomingEventsService {

  public static async getUpcomingEvents(commonsState: CommonsState): Promise<Event[]> {
    let result: Event[] = [];

    try {
      const rangeStart: Date = new Date();
      const rangeEnd: Date = new Date();
      rangeEnd.setDate(rangeEnd.getDate() + GRAPH_UPCOMING_EVENTS_DAYS);

      const events: Event[] = await commonsState.GraphConnection.me
        .calendarView(rangeStart.toISOString(), rangeEnd.toISOString())
        .select(...GraphSelectFields.Event)
        .orderBy('start/dateTime')
        .top(GRAPH_UPCOMING_EVENTS_TOP)();

      result = events || [];
    } catch (error) {
      await LoggingService.handleError(error, 'UpcomingEventsService: Fehler beim Laden der Termine.');
    }

    return result;
  }
}
