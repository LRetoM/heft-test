import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { GroupState } from '../../../../stateModels/GroupState';
import { GroupService } from '../../../../services/GroupService';
import { LOADING_GROUPS, START_LOADING_GROUPS } from '../../../../redux/reducers/GroupsStateReducer';

export const GroupsComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const groupsState: GroupState = useAppSelector(state => state.groupsState);

  const getUserGroups = async (): Promise<void> => {
    dispatch(START_LOADING_GROUPS());
    dispatch(LOADING_GROUPS(await GroupService.getUserGroups(commonsState)));
  };

  React.useEffect(() => {
    getUserGroups().catch(async (error: Error) => commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'GroupsComponent:'));
  }, []);

  if (groupsState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.Groups.Title}</h2>
      <div>
        {groupsState.UserGroups.map((group) => (
          <div key={group.id}>{group.displayName}</div>
        ))}
      </div>
    </div>
  );
};
