import commonsSlice from './CommonsStateReducer';
import upcomingEventsSlice from './UpcomingEventsStateReducer';
import siteDocumentsSlice from './SiteDocumentsStateReducer';
import { combineReducers } from '@reduxjs/toolkit';

export default combineReducers({
  commonsState: commonsSlice.reducer,
  upcomingEventsState: upcomingEventsSlice.reducer,
  siteDocumentsState: siteDocumentsSlice.reducer
});
