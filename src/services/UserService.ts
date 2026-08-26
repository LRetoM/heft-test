import { User } from '@microsoft/microsoft-graph-types';
import { CommonsState } from '../stateModels/CommonsState';

export class UserService {

  public static async getCurrentUser(commonsState: CommonsState): Promise<{ GraphUser: User; SharePointUserDisplayName: string }> {
    let result: { GraphUser: User; SharePointUserDisplayName: string } = {
      GraphUser: undefined,
      SharePointUserDisplayName: ''
    };

    try {
      const [graphUser, siteUser] = await Promise.all([
        commonsState.SpFxCore.getSPFxCoreUserService().getCurrentGraphUser(),
        commonsState.SpFxCore.getSPFxCoreUserService().getCurrentUser()
      ]);

      result = {
        GraphUser: graphUser,
        SharePointUserDisplayName: siteUser?.Title || ''
      };
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'UserService: Fehler beim Laden des Benutzers.');
    }

    return result;
  }
}
