import * as React from 'react';
import * as strings from 'MyWorkplaceWebPartStrings';
import styles from './MyWorkplace.module.scss';
import { MessageBar, MessageBarType, Spinner, SpinnerSize } from '@fluentui/react';
import { SpFxCoreCommonService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreCommonService/SpFxCoreCommonService';
import { SpFxCoreLoggingService } from 'glb-sp-fx-core/lib/services/spFxCore/spfxCoreLoggingService/SpFxCoreLoggingService';
import { IMyWorkplaceComponentProperties } from '../IMyWorkplaceComponentProperties';
import { useAppDispatch, useAppSelector } from '../MyWorkplaceWebPart';
import { CommonsState } from '../../../stateModels/CommonsState';
import { LOADING_COMMONS, LOADING_COMMONS_DONE } from '../../../redux/reducers/CommonsStateReducer';
import { UpcomingEventsComponent } from './upcomingEventsComponent/UpcomingEventsComponent';
import { SiteDocumentsComponent } from './siteDocumentsComponent/SiteDocumentsComponent';

const coreLoggingService = new SpFxCoreLoggingService();
const commonService = new SpFxCoreCommonService(coreLoggingService);

export const MyWorkplaceComponent: React.FunctionComponent<IMyWorkplaceComponentProperties> = (properties) => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);

  React.useEffect(() => {
    dispatch(LOADING_COMMONS(properties));
  }, []);

  React.useEffect(() => {
    if (commonService.isUndefinedOrNull(commonsState.SharePointConnection) || commonService.isUndefinedOrNull(commonsState.GraphConnection)) return;
    dispatch(LOADING_COMMONS_DONE());
  }, [commonsState.SharePointConnection, commonsState.GraphConnection]);

  if (commonsState.HasAppError) {
    return (
      <section className={styles.myWorkplace}>
        <MessageBar messageBarType={MessageBarType.error}>
          {strings.General.ErrorOccurred}
        </MessageBar>
      </section>
    );
  }

  if (commonsState.IsInitialLoading) {
    return (
      <section className={styles.myWorkplace}>
        <Spinner size={SpinnerSize.large} />
      </section>
    );
  }

  return (
    <section className={styles.myWorkplace}>
      <UpcomingEventsComponent />
      <SiteDocumentsComponent />
    </section>
  );
};
