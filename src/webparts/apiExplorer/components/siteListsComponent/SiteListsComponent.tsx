import * as React from 'react';
import styles from '../ApiExplorer.module.scss';
import { Link, Panel, PanelType, PrimaryButton, Spinner, SpinnerSize } from '@fluentui/react';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import * as strings from 'ApiExplorerWebPartStrings';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { SiteListsState } from '../../../../stateModels/SiteListsState';
import { SharePointListService } from '../../../../services/SharePointListService';
import { SharePointList } from '../../../../models/SharePointList';
import { LOADING_SITE_LISTS, START_LOADING_SITE_LISTS } from '../../../../redux/reducers/SiteListsStateReducer';
import { SiteListEditComponent } from './SiteListEditComponent';

const EMPTY_LIST: SharePointList = new SharePointList();

export const SiteListsComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const siteListsState: SiteListsState = useAppSelector(state => state.siteListsState);

  const [selectedList, setSelectedList] = React.useState<SharePointList>(undefined);
  const [isPanelOpen, setIsPanelOpen] = React.useState(false);

  const getSiteLists = async (): Promise<void> => {
    dispatch(START_LOADING_SITE_LISTS());
    dispatch(LOADING_SITE_LISTS(await SharePointListService.getLists(commonsState)));
  };

  React.useEffect(() => {
    getSiteLists().catch(async (error: Error) => commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'SiteListsComponent:'));
  }, []);

  const openPanel = (list: SharePointList): void => {
    setSelectedList(list);
    setIsPanelOpen(true);
  };

  if (siteListsState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.SiteLists.Title}</h2>
      <PrimaryButton text={strings.SiteLists.Buttons.New} onClick={() => openPanel(EMPTY_LIST)} />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{strings.SiteLists.ColumnNames.Title}</th>
            <th>{strings.SiteLists.ColumnNames.Items}</th>
            <th>{strings.SiteLists.ColumnNames.Template}</th>
            <th>{strings.SiteLists.ColumnNames.Id}</th>
          </tr>
        </thead>
        <tbody>
          {siteListsState.Lists.map((list) => (
            <tr key={list.Id}>
              <td><Link onClick={() => openPanel(list)}>{list.Title}</Link></td>
              <td>{list.ItemCount}</td>
              <td>{list.BaseTemplate}</td>
              <td className={styles.idCell}>{list.Id}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Panel
        isOpen={isPanelOpen}
        onDismiss={() => setIsPanelOpen(false)}
        type={PanelType.medium}
        headerText={selectedList?.Id === undefined ? strings.SiteLists.Panel.CreateTitle : strings.SiteLists.Panel.EditTitle}
      >
        {selectedList !== undefined && <SiteListEditComponent currentList={selectedList} closePanel={() => setIsPanelOpen(false)} />}
      </Panel>
    </div>
  );
};
