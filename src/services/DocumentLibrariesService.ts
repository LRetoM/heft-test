import '@pnp/sp/lists';
import { CommonsState } from '../stateModels/CommonsState';
import { SpListSelectFields, buildSpListFilter } from '../constants/SpQueryConstants';
import { LoggingService } from './LoggingService';

export class DocumentLibrariesService {

  public static async getDocumentLibraries(commonsState: CommonsState): Promise<{ Id: string; Title: string; Description: string; DefaultViewUrl: string }[]> {
    let result: { Id: string; Title: string; Description: string; DefaultViewUrl: string }[] = [];

    try {
      const lists = await commonsState.SharepointConnection.web.lists
        .select(...SpListSelectFields.DocumentLibraries)
        .filter(buildSpListFilter(false, 101))();

      result = lists || [];
    } catch (error) {
      await LoggingService.handleError(error, 'DocumentLibrariesService: Fehler beim Laden der Document Libraries.');
    }

    return result;
  }

  public static async saveAndUpdate(commonsState: CommonsState, library: { Id: string; Title: string; Description: string; DefaultViewUrl: string }): Promise<{ Id: string; Title: string; Description: string; DefaultViewUrl: string }> {
    let result: { Id: string; Title: string; Description: string; DefaultViewUrl: string } = undefined;

    try {
      if (library.Id === undefined) {
        const addedList = await commonsState.SharepointConnection.web.lists.add(library.Title, library.Description, 101);

        result = { Id: addedList.Id, Title: addedList.Title, Description: addedList.Description, DefaultViewUrl: addedList.DefaultViewUrl };
      } else {
        await commonsState.SharepointConnection.web.lists.getById(library.Id).update({
          Title: library.Title,
          Description: library.Description
        });
        result = library;
      }
    } catch (error) {
      await LoggingService.handleError(error, 'DocumentLibrariesService: Fehler beim Speichern der Document Library.');
    }

    return result;
  }

  public static async deleteDocumentLibrary(commonsState: CommonsState, library: { Id: string; Title: string; Description: string; DefaultViewUrl: string }): Promise<boolean> {
    let success = false;

    try {
      await commonsState.SharepointConnection.web.lists.getById(library.Id).recycle();
      success = true;
    } catch (error) {
      await LoggingService.handleError(error, 'DocumentLibrariesService: Fehler beim Löschen der Document Library.');
    }

    return success;
  }
}
