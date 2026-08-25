import * as React from 'react';
import * as strings from 'ApiExplorerWebPartStrings';
import { Spinner, SpinnerSize } from '@fluentui/react';
import { LoggingService } from '../../../../services/LoggingService';
import { useAppDispatch, useAppSelector } from '../../ApiExplorerWebPart';
import { CommonsState } from '../../../../stateModels/CommonsState';
import { UserState } from '../../../../stateModels/UserState';
import { UserService } from '../../../../services/UserService';
import { LOADING_USER, START_LOADING_USER } from '../../../../redux/reducers/UserStateReducer';

export const UserProfileComponent: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const commonsState: CommonsState = useAppSelector(state => state.commonsState);
  const userState: UserState = useAppSelector(state => state.userState);

  const getCurrentUser = async (): Promise<void> => {
    dispatch(START_LOADING_USER());
    dispatch(LOADING_USER(await UserService.getCurrentUser(commonsState)));
  };

  React.useEffect(() => {
    getCurrentUser().catch(async (error: Error) => LoggingService.handleError(error, 'UserProfileComponent:'));
  }, []);

  if (userState.IsLoading) {
    return <Spinner size={SpinnerSize.large} />;
  }

  return (
    <div>
      <h2>{strings.UserProfile.Title}</h2>
      <div><strong>{strings.UserProfile.Labels.GraphDisplayName}</strong> {userState.GraphUser.displayName}</div>
      <div><strong>{strings.UserProfile.Labels.SharePointDisplayName}</strong> {userState.SharePointUserDisplayName}</div>
      <div><strong>{strings.UserProfile.Labels.Email}</strong> {userState.GraphUser.mail}</div>
      <div><strong>{strings.UserProfile.Labels.JobTitle}</strong> {userState.GraphUser.jobTitle}</div>
      <div><strong>{strings.UserProfile.Labels.Department}</strong> {userState.GraphUser.department}</div>
    </div>
  );
};
