import * as React from 'react';
import * as strings from 'MyWorkplaceWebPartStrings';
import styles from '../MyWorkplace.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { Event } from '@microsoft/microsoft-graph-types';
import { escape } from '@microsoft/sp-lodash-subset';
import { useAppDispatch, useAppSelector } from '../../MyWorkplaceWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { UpcomingEventsState } from '../../../../stateModels/UpcomingEventsState';
import { UpcomingEventsService } from '../../../../services/UpcomingEventsService';
import { LoggingService } from '../../../../services/LoggingService';
import { LOADING_UPCOMING_EVENTS, START_LOADING_UPCOMING_EVENTS } from '../../../../redux/reducers/UpcomingEventsStateReducer';

export const UpcomingEventsComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const upcomingEventsState: UpcomingEventsState = useAppSelector(state => state.upcomingEventsState);

  const getUpcomingEvents = async (): Promise<void> => {
    dispatch(START_LOADING_UPCOMING_EVENTS());
    dispatch(LOADING_UPCOMING_EVENTS(await UpcomingEventsService.getUpcomingEvents(commonsState)));
  };

  const formatEventStart = (event: Event): string => {
    const startDate: Date = new Date(`${event.start.dateTime}Z`);
    return event.isAllDay ? startDate.toLocaleDateString() : startDate.toLocaleString();
  };

  React.useEffect(() => {
    getUpcomingEvents().catch(async (error: Error) => LoggingService.handleError(error, 'UpcomingEventsComponent:'));
  }, []);

  if (upcomingEventsState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div className={styles.section}>
      <h2>{strings.UpcomingEvents.Title}</h2>
      {upcomingEventsState.Events.length === 0 && <p className={styles.empty}>{strings.UpcomingEvents.Empty}</p>}
      {upcomingEventsState.Events.map((event: Event) => (
        <div key={event.id} className={styles.event}>
          <strong>{escape(event.subject)}</strong>
          <div>{formatEventStart(event)}</div>
          <div className={styles.eventLocation}>
            {event.location?.displayName ? escape(event.location.displayName) : strings.UpcomingEvents.NoLocation}
          </div>
        </div>
      ))}
    </div>
  );
};
