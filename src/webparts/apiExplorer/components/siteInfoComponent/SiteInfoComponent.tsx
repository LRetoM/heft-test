import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { LoggingService } from '../../../../services/LoggingService';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { SiteInfoState } from '../../../../stateModels/SiteInfoState';
import { SiteInfoService } from '../../../../services/SiteInfoService';
import { LOADING_SITE_INFO, START_LOADING_SITE_INFO } from '../../../../redux/reducers/SiteInfoStateReducer';

export const SiteInfoComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const siteInfoState: SiteInfoState = useAppSelector(state => state.siteInfoState);

  const getSiteInfo = async (): Promise<void> => {
    dispatch(START_LOADING_SITE_INFO());
    dispatch(LOADING_SITE_INFO(await SiteInfoService.getSiteInfo(commonsState)));
  };

  React.useEffect(() => {
    getSiteInfo().catch(async (error: Error) => LoggingService.handleError(error, 'SiteInfoComponent:'));
  }, []);

  if (siteInfoState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.SiteInfo.Title}</h2>
      <div><strong>{strings.SiteInfo.Labels.SiteTitle}</strong> {siteInfoState.Web.Title}</div>
      <div><strong>{strings.SiteInfo.Labels.SiteUrl}</strong> {siteInfoState.Web.Url}</div>
      <div><strong>{strings.SiteInfo.Labels.SiteCollectionUrl}</strong> {siteInfoState.Site.Url}</div>
      <div><strong>{strings.SiteInfo.Labels.SiteCollectionId}</strong> {siteInfoState.Site.Id}</div>
    </div>
  );
};
