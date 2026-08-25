import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { DefaultButton, MessageBar, MessageBarType, PrimaryButton, TextField } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { DocumentLibrariesService } from '../../../../services/DocumentLibrariesService';
import { ADD_UPDATE_DOCUMENT_LIBRARY, REMOVE_DOCUMENT_LIBRARY } from '../../../../redux/reducers/DocumentLibrariesStateReducer';

interface IDocumentLibraryEditComponentProperties {
  currentLibrary: { Id: string; Title: string; Description: string; DefaultViewUrl: string };
  closePanel: VoidFunction;
}

export const DocumentLibraryEditComponent: React.FunctionComponent<IDocumentLibraryEditComponentProperties> = (properties: IDocumentLibraryEditComponentProperties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  const [tempLibrary, setTempLibrary] = React.useState(properties.currentLibrary);
  const [errorMessage, setErrorMessage] = React.useState<string>(undefined);
  const [isSaving, setIsSaving] = React.useState(false);

  const isValid = (): boolean => tempLibrary.Title !== undefined && tempLibrary.Title.length > 0;

  const saveLibrary = async (): Promise<void> => {
    if (!isValid()) {
      setErrorMessage(strings.DocumentLibraries.Panel.ErrorMessages.EmptyTitle);
      return;
    }

    setErrorMessage(undefined);
    setIsSaving(true);
    const library = await DocumentLibrariesService.saveAndUpdate(commonsState, tempLibrary);
    setIsSaving(false);

    if (library === undefined) {
      setErrorMessage(strings.DocumentLibraries.Panel.ErrorMessages.ErrorWhileSaving);
      return;
    }
    dispatch(ADD_UPDATE_DOCUMENT_LIBRARY(library));
    properties.closePanel();
  };

  const deleteLibrary = async (): Promise<void> => {
    setIsSaving(true);
    const success = await DocumentLibrariesService.deleteDocumentLibrary(commonsState, tempLibrary);
    setIsSaving(false);

    if (!success) {
      setErrorMessage(strings.DocumentLibraries.Panel.ErrorMessages.ErrorWhileDeleting);
      return;
    }
    dispatch(REMOVE_DOCUMENT_LIBRARY(tempLibrary));
    properties.closePanel();
  };

  return (
    <div>
      <TextField
        label={strings.DocumentLibraries.Panel.Fields.Title} required
        value={tempLibrary.Title}
        disabled={isSaving}
        onChange={(event, value) => setTempLibrary({ ...tempLibrary, Title: value })}
      />
      <TextField
        label={strings.DocumentLibraries.Panel.Fields.Description}
        value={tempLibrary.Description}
        disabled={isSaving}
        multiline
        onChange={(event, value) => setTempLibrary({ ...tempLibrary, Description: value })}
      />
      <div style={{ marginTop: '16px' }}>
        <PrimaryButton
          style={{ marginRight: '10px' }}
          onClick={saveLibrary}
          text={strings.DocumentLibraries.Buttons.Save}
          disabled={isSaving}
        />
        {tempLibrary.Id !== undefined && <DefaultButton
          style={{ marginRight: '10px' }}
          onClick={deleteLibrary}
          text={strings.DocumentLibraries.Buttons.Delete}
          disabled={isSaving}
        />}
        <DefaultButton
          onClick={properties.closePanel}
          text={strings.DocumentLibraries.Buttons.Cancel}
          disabled={isSaving}
        />
      </div>
      {errorMessage !== undefined && <div style={{ marginTop: '10px' }}><MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar></div>}
    </div>
  );
};
