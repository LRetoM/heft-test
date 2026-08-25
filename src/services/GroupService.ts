import '@pnp/graph/groups';
import type { Group } from '@microsoft/microsoft-graph-types';
import { CommonsState } from '../stateModels/CommonsState';
import { GraphSelectFields } from '../constants/GraphQueryConstants';
import { LoggingService } from './LoggingService';

export class GroupService {

  public static async getUserGroups(commonsState: CommonsState): Promise<{ id?: string; displayName?: string }[]> {
    let result: { id?: string; displayName?: string }[] = [];

    try {
      const memberOf: Group[] = await commonsState.GraphConnection.me.memberOf
        .select(...GraphSelectFields.Group)();

      result = memberOf || [];
    } catch (error) {
      await LoggingService.handleError(error, 'GroupService: Fehler beim Laden der Gruppen.');
    }

    return result;
  }
}
