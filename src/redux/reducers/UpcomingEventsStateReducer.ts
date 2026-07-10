import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '@microsoft/microsoft-graph-types';
import { UpcomingEventsState } from '../../stateModels/UpcomingEventsState';

const upcomingEventsSlice = createSlice({
  name: 'upcomingEvents',
  initialState: new UpcomingEventsState(),
  reducers: {
    START_LOADING_UPCOMING_EVENTS(state: UpcomingEventsState) {
      return { ...state, IsLoading: true };
    },
    LOADING_UPCOMING_EVENTS(state: UpcomingEventsState, action: PayloadAction<Event[]>) {
      return {
        ...state,
        Events: action.payload,
        IsLoading: false
      };
    }
  }
});

export default upcomingEventsSlice;
export const { START_LOADING_UPCOMING_EVENTS, LOADING_UPCOMING_EVENTS } = upcomingEventsSlice.actions;
