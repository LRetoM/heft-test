import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { CommonsState } from '../../stateModels/CommonsState';
import { IMyWorkplaceComponentProperties } from '../../webparts/myWorkplace/IMyWorkplaceComponentProperties';

const commonsSlice = createSlice({
  name: 'commons',
  initialState: new CommonsState(),
  reducers: {
    LOADING_COMMONS(state: Draft<CommonsState>, action: PayloadAction<IMyWorkplaceComponentProperties>) {
      return {
        ...state,
        SharePointConnection: action.payload.SharePointConnection,
        GraphConnection: action.payload.GraphConnection,
        Context: action.payload.Context,
        IsInitialLoading: true,
        HasAppError: action.payload.SharePointConnection === undefined
          || action.payload.GraphConnection === undefined
          || action.payload.Context === undefined
      };
    },
    LOADING_COMMONS_DONE(state: Draft<CommonsState>) {
      return { ...state, IsInitialLoading: false };
    },
    ENABLE_ERROR(state: Draft<CommonsState>) {
      return { ...state, HasAppError: true };
    }
  }
});

export default commonsSlice;
export const { LOADING_COMMONS, LOADING_COMMONS_DONE, ENABLE_ERROR } = commonsSlice.actions;
