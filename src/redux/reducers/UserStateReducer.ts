import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@microsoft/microsoft-graph-types';
import { UserState } from '../../stateModels/UserState';

const userSlice = createSlice({
  name: 'user',
  initialState: new UserState(),
  reducers: {
    START_LOADING_USER(state: UserState) {
      return { ...state, IsLoading: true };
    },
    LOADING_USER(state: UserState, action: PayloadAction<{ GraphUser: User; SharePointUserDisplayName: string }>) {
      return {
        ...state,
        GraphUser: action.payload.GraphUser,
        SharePointUserDisplayName: action.payload.SharePointUserDisplayName,
        IsLoading: false
      };
    }
  }
});

export default userSlice;
export const { START_LOADING_USER, LOADING_USER } = userSlice.actions;
