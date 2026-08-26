import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import styles from './ApiExplorer.module.scss';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { SpFxCoreCommonService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreCommonService/SpFxCoreCommonService';
import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import { IApiExplorerComponentProperties } from '../IApiExplorerComponentProperties';
import { useAppDispatch, useAppSelector } from '../ApiExplorerWebPart';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS, LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { UserProfileComponent } from './userProfileComponent/UserProfileComponent';
import { SiteInfoComponent } from './siteInfoComponent/SiteInfoComponent';
import { GroupsComponent } from './groupsComponent/GroupsComponent';
import { SiteListsComponent } from './siteListsComponent/SiteListsComponent';
import { DocumentLibrariesComponent } from './documentLibrariesComponent/DocumentLibrariesComponent';

const coreLoggingService: SpFxCoreLoggingService = new SpFxCoreLoggingService();
const commonService: SpFxCoreCommonService = new SpFxCoreCommonService(coreLoggingService);

export const ApiExplorerComponent: React.FunctionComponent<IApiExplorerComponentProperties> = (properties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  React.useEffect(() => {
    dispatch(LOADING_COMMONS(properties));
  }, []);

  React.useEffect(() => {
    if (commonService.isUndefinedOrNull(commonsState.SharePointConnection) || commonService.isUndefinedOrNull(commonsState.SpFxCore)) return;
    dispatch(LOADING_COMMONS_DONE());
  }, [commonsState.SharePointConnection, commonsState.SpFxCore]);

  if (commonsState.HasAppError) {
    return (
      <section className={styles.apiExplorer}>
        <MessageBar messageBarType={MessageBarType.error}>
          {strings.InitialView.ErrorOccurred}
        </MessageBar>
      </section>
    );
  }

  if (commonsState.IsInitialLoading) {
    return (
      <section className={styles.apiExplorer}>
        <Spinner size={SpinnerSize.large} />
      </section>
    );
  }

  return (
    <section className={styles.apiExplorer}>
      <div className={styles.welcome}>
        <UserProfileComponent />
        <SiteInfoComponent />
        <GroupsComponent />
        <SiteListsComponent />
        <DocumentLibrariesComponent />
      </div>
    </section>
  );
};
