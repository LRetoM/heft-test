import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { Link, Panel, PanelType, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { GroupState } from '../../../../stateModels/GroupState';
import { GroupService } from '../../../../services/GroupService';
import { UserGroup } from '../../../../models/UserGroup';
import { LOADING_GROUPS, START_LOADING_GROUPS } from '../../../../redux/reducers/GroupsStateReducer';
import { UserGroupEditComponent } from './UserGroupEditComponent';

const EMPTY_GROUP: UserGroup = new UserGroup();

export const GroupsComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const groupsState: GroupState = useAppSelector(state => state.groupsState);

  const [selectedGroup, setSelectedGroup] = React.useState<UserGroup>(undefined);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const getUserGroups = async (): Promise<void> => {
    dispatch(START_LOADING_GROUPS());
    dispatch(LOADING_GROUPS(await GroupService.getUserGroups(commonsState)));
  };

  React.useEffect(() => {
    getUserGroups().catch(async (error: Error) => commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'GroupsComponent:'));
  }, []);

  const openPanel = (group: UserGroup): void => {
    setSelectedGroup(group);
    setIsPanelOpen(true);
  };

  if (groupsState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.Groups.Title}</h2>
      <PrimaryButton text={strings.Groups.Buttons.New} onClick={() => openPanel(EMPTY_GROUP)} />
      <div>
        {groupsState.UserGroups.map((group) => (
          <div key={group.id}><Link onClick={() => openPanel(group)}>{group.displayName}</Link></div>
        ))}
      </div>
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText={selectedGroup?.id === undefined ? strings.Groups.Panel.CreateTitle : strings.Groups.Panel.EditTitle}
      >
        {selectedGroup !== undefined && <UserGroupEditComponent currentGroup={selectedGroup} closePanel={() => setIsPanelOpen(false)} />}
      </Panel>
    </div>
  );
};
