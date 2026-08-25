import '@pnp/graph/users';
import { User } from '@microsoft/microsoft-graph-types';
import { CommonsState } from '../stateModels/CommonsState';
import { GraphSelectFields } from '../constants/GraphQueryConstants';
import { LoggingService } from './LoggingService';

export class UserService {

  public static async getCurrentUser(commonsState: CommonsState): Promise<{ GraphUser: User; SharePointUserDisplayName: string }> {
    let result: { GraphUser: User; SharePointUserDisplayName: string } = {
      GraphUser: undefined,
      SharePointUserDisplayName: ''
    };

    try {
      const graphUser: User = await commonsState.GraphConnection.me
        .select(...GraphSelectFields.User)();

      result = {
        GraphUser: graphUser,
        SharePointUserDisplayName: commonsState.Context.pageContext.user.displayName || ''
      };
    } catch (error) {
      await LoggingService.handleError(error, 'UserService: Fehler beim Laden des Benutzers.');
    }

    return result;
  }
}
