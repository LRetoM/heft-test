import '@pnp/graph/users';
import { User } from '@microsoft/microsoft-graph-types';
import { ISiteUserProps } from '@pnp/sp/site-users/types';
import { CommonsState } from '../stateModels/CommonsState';
import { GraphSelectFields } from '../constants/GraphQueryConstants';

export class UserService {

  public static async getCurrentUser(commonsState: CommonsState): Promise<{ GraphUser: User; SharePointUserDisplayName: string }> {
    let result: { GraphUser: User; SharePointUserDisplayName: string } = {
      GraphUser: undefined,
      SharePointUserDisplayName: ''
    };

    try {
      const [graphUser, siteUser]: [User | undefined, ISiteUserProps | undefined] = await Promise.all([
        commonsState.SpFxCore.getGraphConnection().me.select(...GraphSelectFields.User)(),
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
