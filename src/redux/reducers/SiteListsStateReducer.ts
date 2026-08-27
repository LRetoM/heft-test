import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { SiteListsState } from '../../stateModels/SiteListsState';
import { SharePointList } from '../../models/SharePointList';

const siteListsSlice = createSlice({
  name: 'siteLists',
  initialState: new SiteListsState(),
  reducers: {
    START_LOADING_SITE_LISTS(state: SiteListsState) {
      return { ...state, IsLoading: true };
    },
    LOADING_SITE_LISTS(state: SiteListsState, action: PayloadAction<SharePointList[]>) {
      return {
        ...state,
        Lists: action.payload,
        IsLoading: false
      };
    },
    ADD_UPDATE_SITE_LIST(state: SiteListsState, action: PayloadAction<SharePointList>) {
      const currentLists = current(state).Lists;
      const existingList = currentLists.filter(list => list.Id === action.payload.Id)[0];

      return {
        ...state,
        Lists: existingList === undefined
          ? currentLists.concat(action.payload)
          : currentLists.map(list => list.Id === action.payload.Id ? action.payload : list)
      };
    },
    REMOVE_SITE_LIST(state: SiteListsState, action: PayloadAction<SharePointList>) {
      return {
        ...state,
        Lists: current(state).Lists.filter(list => list.Id !== action.payload.Id)
      };
    }
  }
});

export default siteListsSlice;
export const { START_LOADING_SITE_LISTS, LOADING_SITE_LISTS, ADD_UPDATE_SITE_LIST, REMOVE_SITE_LIST } = siteListsSlice.actions;
