import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { GroupState } from '../../stateModels/GroupState';
import { UserGroup } from '../../models/UserGroup';

const groupsSlice = createSlice({
  name: 'groups',
  initialState: new GroupState(),
  reducers: {
    START_LOADING_GROUPS(state: GroupState) {
      return { ...state, IsLoading: true };
    },
    LOADING_GROUPS(state: GroupState, action: PayloadAction<UserGroup[]>) {
      return {
        ...state,
        UserGroups: action.payload,
        IsLoading: false
      };
    },
    ADD_GROUP(state: GroupState, action: PayloadAction<UserGroup>) {
      return {
        ...state,
        UserGroups: current(state).UserGroups.concat(action.payload)
      };
    },
    REMOVE_GROUP(state: GroupState, action: PayloadAction<UserGroup>) {
      return {
        ...state,
        UserGroups: current(state).UserGroups.filter(group => group.id !== action.payload.id)
      };
    }
  }
});

export default groupsSlice;
export const { START_LOADING_GROUPS, LOADING_GROUPS, ADD_GROUP, REMOVE_GROUP } = groupsSlice.actions;
