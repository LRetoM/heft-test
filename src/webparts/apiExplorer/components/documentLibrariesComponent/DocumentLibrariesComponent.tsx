import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import styles from '../ApiExplorer.module.scss';
import { Link, Panel, PanelType, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { DocumentLibrariesState } from '../../../../stateModels/DocumentLibrariesState';
import { SharePointListService } from '../../../../services/SharePointListService';
import { SharePointList } from '../../../../models/SharePointList';
import { SpListTemplates } from '../../../../constants/SpQueryConstants';
import { LOADING_DOCUMENT_LIBRARIES, START_LOADING_DOCUMENT_LIBRARIES } from '../../../../redux/reducers/DocumentLibrariesStateReducer';
import { DocumentLibraryEditComponent } from './DocumentLibraryEditComponent';

const EMPTY_LIBRARY: SharePointList = new SharePointList();

export const DocumentLibrariesComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const documentLibrariesState: DocumentLibrariesState = useAppSelector(state => state.documentLibrariesState);

  const [selectedLibrary, setSelectedLibrary] = React.useState<SharePointList>(undefined);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const getDocumentLibraries = async (): Promise<void> => {
    dispatch(START_LOADING_DOCUMENT_LIBRARIES());
    dispatch(LOADING_DOCUMENT_LIBRARIES(await SharePointListService.getLists(commonsState, SpListTemplates.DocumentLibrary)));
  };

  React.useEffect(() => {
    getDocumentLibraries().catch(async (error: Error) => commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'DocumentLibrariesComponent:'));
  }, []);

  const openPanel = (library: SharePointList): void => {
    setSelectedLibrary(library);
    setIsPanelOpen(true);
  };

  if (documentLibrariesState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.DocumentLibraries.Title}</h2>
      <PrimaryButton text={strings.DocumentLibraries.Buttons.New} onClick={() => openPanel(EMPTY_LIBRARY)} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{strings.DocumentLibraries.ColumnNames.Id}</th>
            <th>{strings.DocumentLibraries.ColumnNames.Title}</th>
            <th>{strings.DocumentLibraries.ColumnNames.Description}</th>
            <th>{strings.DocumentLibraries.ColumnNames.Url}</th>
          </tr>
        </thead>
        <tbody>
          {documentLibrariesState.Libraries.map((list) => (
            <tr key={list.Id}>
              <td className={styles.idCell}>{list.Id}</td>
              <td><Link onClick={() => openPanel(list)}>{list.Title}</Link></td>
              <td>{list.Description}</td>
              <td>{list.DefaultViewUrl}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText={selectedLibrary?.Id === undefined ? strings.DocumentLibraries.Panel.CreateTitle : strings.DocumentLibraries.Panel.EditTitle}
      >
        {selectedLibrary !== undefined && <DocumentLibraryEditComponent currentLibrary={selectedLibrary} closePanel={() => setIsPanelOpen(false)} />}
      </Panel>
    </div>
  );
};
