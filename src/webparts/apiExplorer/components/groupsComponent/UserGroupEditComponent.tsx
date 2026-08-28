import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { DefaultButton, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { GroupService } from '../../../../services/GroupService';
import { UserGroup } from '../../../../models/UserGroup';
import { ADD_GROUP, REMOVE_GROUP } from '../../../../redux/reducers/GroupsStateReducer';

interface IUserGroupEditComponentProperties {
  currentGroup: UserGroup;
  closePanel: VoidFunction;
}

export const UserGroupEditComponent: React.FunctionComponent<IUserGroupEditComponentProperties> = (properties: IUserGroupEditComponentProperties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  const [tempGroup, setTempGroup] = React.useState(properties.currentGroup);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
  const [isSaving, setIsSaving] = React.useState(false);

  const isNew = properties.currentGroup.id === undefined;
  const isValid = (): boolean => tempGroup.id !== undefined && tempGroup.id.length > 0;

  const joinGroup = async (): Promise<void> => {
    if (!isValid()) {
      setErrorMessage(strings.Groups.Panel.ErrorMessages.EmptyGroupId);
      return;
    }

    setErrorMessage(undefined);
    setIsSaving(true);
    try {
      const group = await GroupService.joinGroup(commonsState, tempGroup.id);

      if (group === undefined) {
        setErrorMessage(strings.Groups.Panel.ErrorMessages.ErrorWhileJoining);
        return;
      }
      dispatch(ADD_GROUP(group));
      properties.closePanel();
    } finally {
      setIsSaving(false);
    }
  };

  const leaveGroup = async (): Promise<void> => {
    setIsSaving(true);
    try {
      const success = await GroupService.leaveGroup(commonsState, tempGroup);

      if (!success) {
        setErrorMessage(strings.Groups.Panel.ErrorMessages.ErrorWhileLeaving);
        return;
      }
      dispatch(REMOVE_GROUP(tempGroup));
      properties.closePanel();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div>
      {isNew
        ? <TextField
          label={strings.Groups.Panel.Fields.GroupId} required
          value={tempGroup.id === undefined ? '' : tempGroup.id}
          disabled={isSaving}
          onChange={(event, value) => setTempGroup({ ...tempGroup, id: value })}
        />
        : <>
          <div><strong>{strings.Groups.Panel.Fields.GroupId}</strong> {tempGroup.id}</div>
          <div><strong>{strings.Groups.Panel.Fields.DisplayName}</strong> {tempGroup.displayName}</div>
        </>
      }
      <div style={{ marginTop: '16px' }}>
        {isNew && <PrimaryButton
          style={{ marginRight: '10px' }}
          onClick={joinGroup}
          text={strings.Groups.Buttons.Join}
          disabled={isSaving}
        />}
        {!isNew && <DefaultButton
          style={{ marginRight: '10px' }}
          onClick={leaveGroup}
          text={strings.Groups.Buttons.Delete}
          disabled={isSaving}
        />}
        <DefaultButton
          onClick={properties.closePanel}
          text={strings.Groups.Buttons.Cancel}
          disabled={isSaving}
        />
      </div>
      {errorMessage !== undefined && <div style={{ marginTop: '10px' }}><MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar></div>}
    </div>
  );
};
