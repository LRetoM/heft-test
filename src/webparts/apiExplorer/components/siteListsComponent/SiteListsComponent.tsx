import * as React from 'react';
import styles from '../ApiExplorer.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { useAppSelector } from '../../ApiExplorerWebPart';
import * as strings from 'ApiExplorerWebPartStrings';
import { SiteInfoState } from '../../../../stateModels/SiteInfoState';

export const SiteListsComponent: React.FunctionComponent = () => {
  const siteInfoState: SiteInfoState = useAppSelector(state => state.siteInfoState);

  if (siteInfoState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.SiteLists.Title}</h2>
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
          {siteInfoState.SpLists.map((list) => (
            <tr key={list.Id}>
              <td>{list.Title}</td>
              <td>{list.ItemCount}</td>
              <td>{list.BaseTemplate}</td>
              <td className={styles.idCell}>{list.Id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
