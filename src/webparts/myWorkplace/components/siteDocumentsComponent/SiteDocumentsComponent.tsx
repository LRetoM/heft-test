import * as React from 'react';
import * as strings from 'MyWorkplaceWebPartStrings';
import styles from '../MyWorkplace.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { escape } from '@microsoft/sp-lodash-subset';
import { useAppDispatch, useAppSelector } from '../../MyWorkplaceWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { SiteDocumentsState } from '../../../../stateModels/SiteDocumentsState';
import { ISiteDocument } from '../../../../interfaces/ISiteDocument';
import { SiteDocumentsService } from '../../../../services/SiteDocumentsService';
import { LoggingService } from '../../../../services/LoggingService';
import { LOADING_SITE_DOCUMENTS, START_LOADING_SITE_DOCUMENTS } from '../../../../redux/reducers/SiteDocumentsStateReducer';

export const SiteDocumentsComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const siteDocumentsState: SiteDocumentsState = useAppSelector(state => state.siteDocumentsState);

  const getSiteDocuments = async (): Promise<void> => {
    dispatch(START_LOADING_SITE_DOCUMENTS());
    dispatch(LOADING_SITE_DOCUMENTS(await SiteDocumentsService.getSiteDocuments(commonsState)));
  };

  React.useEffect(() => {
    getSiteDocuments().catch(async (error: Error) => LoggingService.handleError(error, 'SiteDocumentsComponent:'));
  }, []);

  if (siteDocumentsState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  if (siteDocumentsState.Documents.length === 0) {
    return (
      <div className={styles.section}>
        <h2>{strings.SiteDocuments.Title}</h2>
        <p className={styles.empty}>{strings.SiteDocuments.Empty}</p>
      </div>
    );
  }

  return (
    <div className={styles.section}>
      <h2>{strings.SiteDocuments.Title}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>{strings.SiteDocuments.ColumnNames.Name}</th>
            <th>{strings.SiteDocuments.ColumnNames.Modified}</th>
          </tr>
        </thead>
        <tbody>
          {siteDocumentsState.Documents.map((siteDocument: ISiteDocument) => (
            <tr key={siteDocument.Id}>
              <td><a href={siteDocument.FileRef}>{escape(siteDocument.FileLeafRef)}</a></td>
              <td>{new Date(siteDocument.Modified).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
