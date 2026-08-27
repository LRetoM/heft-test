import '@pnp/sp/lists';
import { CommonsState } from '../stateModels/CommonsState';
import { SpListSelectFields, buildSpListFilter } from '../constants/SpQueryConstants';
import { SharePointList } from '../models/SharePointList';

export class SharePointListService {

  public static async getLists(commonsState: CommonsState, template?: number): Promise<SharePointList[]> {
    let result: SharePointList[] = [];

    try {
      const lists = await commonsState.SharePointConnection.web.lists
        .select(...SpListSelectFields.Lists)
        .filter(buildSpListFilter(false, template))();

      result = lists || [];
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'SharePointListService: Fehler beim Laden der Listen.');
    }

    return result;
  }

  public static async saveAndUpdate(commonsState: CommonsState, list: SharePointList, template: number): Promise<SharePointList> {
    let result: SharePointList = undefined;

    try {
      if (list.Id === undefined) {
        const addedList = await commonsState.SharePointConnection.web.lists.add(list.Title, list.Description, template);

        result = { Id: addedList.Id, Title: addedList.Title, Description: addedList.Description, DefaultViewUrl: addedList.DefaultViewUrl, ItemCount: addedList.ItemCount, BaseTemplate: addedList.BaseTemplate };
      } else {
        await commonsState.SharePointConnection.web.lists.getById(list.Id).update({
          Title: list.Title,
          Description: list.Description
        });
        result = list;
      }
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'SharePointListService: Fehler beim Speichern der Liste.');
    }

    return result;
  }

  public static async deleteList(commonsState: CommonsState, list: SharePointList): Promise<boolean> {
    let success = false;

    try {
      await commonsState.SharePointConnection.web.lists.getById(list.Id).recycle();
      success = true;
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'SharePointListService: Fehler beim Löschen der Liste.');
    }

    return success;
  }
}
