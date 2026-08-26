import '@pnp/sp/lists';
import { CommonsState } from '../stateModels/CommonsState';
import { SpListSelectFields, buildSpListFilter } from '../constants/SpQueryConstants';
import { DocumentLibrary } from '../models/DocumentLibrary';

export class DocumentLibrariesService {

  public static async getDocumentLibraries(commonsState: CommonsState): Promise<DocumentLibrary[]> {
    let result: DocumentLibrary[] = [];

    try {
      const lists = await commonsState.SharePointConnection.web.lists
        .select(...SpListSelectFields.DocumentLibraries)
        .filter(buildSpListFilter(false, 101))();

      result = lists || [];
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'DocumentLibrariesService: Fehler beim Laden der Document Libraries.');
    }

    return result;
  }

  public static async saveAndUpdate(commonsState: CommonsState, library: DocumentLibrary): Promise<DocumentLibrary> {
    let result: DocumentLibrary = undefined;

    try {
      if (library.Id === undefined) {
        const addedList = await commonsState.SharePointConnection.web.lists.add(library.Title, library.Description, 101);

        result = { Id: addedList.Id, Title: addedList.Title, Description: addedList.Description, DefaultViewUrl: addedList.DefaultViewUrl };
      } else {
        await commonsState.SharePointConnection.web.lists.getById(library.Id).update({
          Title: library.Title,
          Description: library.Description
        });
        result = library;
      }
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'DocumentLibrariesService: Fehler beim Speichern der Document Library.');
    }

    return result;
  }

  public static async deleteDocumentLibrary(commonsState: CommonsState, library: DocumentLibrary): Promise<boolean> {
    let success = false;

    try {
      await commonsState.SharePointConnection.web.lists.getById(library.Id).recycle();
      success = true;
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'DocumentLibrariesService: Fehler beim Löschen der Document Library.');
    }

    return success;
  }
}
