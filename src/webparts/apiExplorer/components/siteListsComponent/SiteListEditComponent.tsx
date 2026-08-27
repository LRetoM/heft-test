import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { DefaultButton, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { SharePointListService } from '../../../../services/SharePointListService';
import { SharePointList } from '../../../../models/SharePointList';
import { SpListTemplates } from '../../../../constants/SpQueryConstants';
import { ADD_UPDATE_SITE_LIST, REMOVE_SITE_LIST } from '../../../../redux/reducers/SiteListsStateReducer';

interface ISiteListEditComponentProperties {
  currentList: SharePointList;
  closePanel: VoidFunction;
}

export const SiteListEditComponent: React.FunctionComponent<ISiteListEditComponentProperties> = (properties: ISiteListEditComponentProperties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  const [tempList, setTempList] = React.useState(properties.currentList);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
  const [isSaving, setIsSaving] = React.useState(false);

  const isValid = (): boolean => tempList.Title !== undefined && tempList.Title.length > 0;

  const saveList = async (): Promise<void> => {
    if (!isValid()) {
      setErrorMessage(strings.SiteLists.Panel.ErrorMessages.EmptyTitle);
      return;
    }

    setErrorMessage(undefined);
    setIsSaving(true);
    const list = await SharePointListService.saveAndUpdate(commonsState, tempList, SpListTemplates.GenericList);
    setIsSaving(false);

    if (list === undefined) {
      setErrorMessage(strings.SiteLists.Panel.ErrorMessages.ErrorWhileSaving);
      return;
    }
    dispatch(ADD_UPDATE_SITE_LIST(list));
    properties.closePanel();
  };

  const deleteList = async (): Promise<void> => {
    setIsSaving(true);
    const success = await SharePointListService.deleteList(commonsState, tempList);
    setIsSaving(false);

    if (!success) {
      setErrorMessage(strings.SiteLists.Panel.ErrorMessages.ErrorWhileDeleting);
      return;
    }
    dispatch(REMOVE_SITE_LIST(tempList));
    properties.closePanel();
  };

  return (
    <div>
      <TextField
        label={strings.SiteLists.Panel.Fields.Title} required
        value={tempList.Title === undefined ? '' : tempList.Title}
        disabled={isSaving}
        onChange={(event, value) => setTempList({ ...tempList, Title: value })}
      />
      <TextField
        label={strings.SiteLists.Panel.Fields.Description}
        value={tempList.Description === undefined ? '' : tempList.Description}
        disabled={isSaving}
        multiline
        onChange={(event, value) => setTempList({ ...tempList, Description: value })}
      />
      <div style={{ marginTop: '16px' }}>
        <PrimaryButton
          style={{ marginRight: '10px' }}
          onClick={saveList}
          text={strings.SiteLists.Buttons.Save}
          disabled={isSaving}
        />
        {tempList.Id !== undefined && <DefaultButton
          style={{ marginRight: '10px' }}
          onClick={deleteList}
          text={strings.SiteLists.Buttons.Delete}
          disabled={isSaving}
        />}
        <DefaultButton
          onClick={properties.closePanel}
          text={strings.SiteLists.Buttons.Cancel}
          disabled={isSaving}
        />
      </div>
      {errorMessage !== undefined && <div style={{ marginTop: '10px' }}><MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar></div>}
    </div>
  );
};
