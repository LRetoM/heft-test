import { Event } from '@microsoft/microsoft-graph-types';

export class UpcomingEventsState {
  public IsLoading: boolean;
  public Events: Event[];

  constructor() {
    this.IsLoading = true;
    this.Events = [];
  }
}
