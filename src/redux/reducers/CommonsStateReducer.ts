import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CommonsState } from '../../stateModels/CommonsState';
import { IApiExplorerComponentProperties } from '../../webparts/apiExplorer/IApiExplorerComponentProperties';

const commonsSlice = createSlice({
  name: 'commons',
  initialState: new CommonsState(),
  reducers: {
    LOADING_COMMONS(state, action: PayloadAction<IApiExplorerComponentProperties>) {
      return {
        ...state,
        SharepointConnection: action.payload.SharepointConnection,
        GraphConnection: action.payload.GraphConnection,
        Context: action.payload.Context,
        IsInitialLoading: true,
        HasAppError: action.payload.SharepointConnection === undefined || action.payload.GraphConnection === undefined || action.payload.Context === undefined
      };
    },
    LOADING_COMMONS_DONE(state) {
      return { ...state, IsInitialLoading: false };
    },
    ENABLE_ERROR(state) {
      return { ...state, HasAppError: true };
    }
  }
});

export default commonsSlice;
export const { LOADING_COMMONS, LOADING_COMMONS_DONE, ENABLE_ERROR } = commonsSlice.actions;
