import commonsSlice from './CommonsStateReducer';
import userSlice from './UserStateReducer';
import groupsSlice from './GroupsStateReducer';
import siteInfoSlice from './SiteInfoStateReducer';
import documentLibrariesSlice from './DocumentLibrariesStateReducer';
import { combineReducers } from 'redux';

export default combineReducers({
  commonsState: commonsSlice.reducer,
  userState: userSlice.reducer,
  groupsState: groupsSlice.reducer,
  siteInfoState: siteInfoSlice.reducer,
  documentLibrariesState: documentLibrariesSlice.reducer
});