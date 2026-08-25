import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { GroupState } from '../../stateModels/GroupState';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: new GroupState(),
  reducers: {
    START_LOADING_GROUPS(state: GroupState) {
      return { ...state, IsLoading: true };
    },
    LOADING_GROUPS(state: GroupState, action: PayloadAction<{ id?: string; displayName?: string }[]>) {
      return {
        ...state,
        UserGroups: action.payload,
        IsLoading: false
      };
    }
  }
});

export default groupsSlice;
export const { START_LOADING_GROUPS, LOADING_GROUPS } = groupsSlice.actions;
