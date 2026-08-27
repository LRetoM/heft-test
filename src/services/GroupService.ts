import '@pnp/graph/groups';
import '@pnp/graph/members/groups';
import type { Group } from '@microsoft/microsoft-graph-types';
import { CommonsState } from '../stateModels/CommonsState';
import { GraphSelectFields } from '../constants/GraphQueryConstants';
import { UserGroup } from '../models/UserGroup';

export class GroupService {

  public static async getUserGroups(commonsState: CommonsState): Promise<UserGroup[]> {
    let result: UserGroup[] = [];

    try {
      const memberOf: Group[] = await commonsState.SpFxCore.getGraphConnection().me.memberOf
        .select(...GraphSelectFields.Group)();

      result = memberOf || [];
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'GroupService: Fehler beim Laden der Gruppen.');
    }

    return result;
  }

  public static async joinGroup(commonsState: CommonsState, groupId: string): Promise<UserGroup> {
    let result: UserGroup = undefined;

    try {
      const currentUser = await commonsState.SpFxCore.getSPFxCoreUserService().getCurrentGraphUser();

      await commonsState.SpFxCore.getGraphConnection().groups.getById(groupId).members
        .add(`https://graph.microsoft.com/v1.0/directoryObjects/${currentUser.id}`);

      const group: Group = await commonsState.SpFxCore.getGraphConnection().groups.getById(groupId)
        .select(...GraphSelectFields.Group)();

      result = group;
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'GroupService: Fehler beim Beitreten der Gruppe.');
    }

    return result;
  }

  public static async leaveGroup(commonsState: CommonsState, group: UserGroup): Promise<boolean> {
    let success = false;

    try {
      const currentUser = await commonsState.SpFxCore.getSPFxCoreUserService().getCurrentGraphUser();

      await commonsState.SpFxCore.getGraphConnection().groups.getById(group.id).members
        .getById(currentUser.id).remove();

      success = true;
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'GroupService: Fehler beim Verlassen der Gruppe.');
    }

    return success;
  }
}
