import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { CommonsState } from '../stateModels/CommonsState';
import { ISiteDocument } from '../interfaces/ISiteDocument';
import { SpListSelectFields, SP_SITE_DOCUMENTS_TOP } from '../constants/SpQueryConstants';
import { LoggingService } from './LoggingService';

export class SiteDocumentsService {

  public static async getSiteDocuments(commonsState: CommonsState): Promise<ISiteDocument[]> {
    let result: ISiteDocument[] = [];

    try {
      const siteDocuments: ISiteDocument[] = await commonsState.SharePointConnection.web.defaultDocumentLibrary.items
        .select(...SpListSelectFields.SiteDocuments)
        .orderBy('Modified', false)
        .top(SP_SITE_DOCUMENTS_TOP)();

      result = siteDocuments || [];
    } catch (error) {
      await LoggingService.handleError(error, 'SiteDocumentsService: Fehler beim Laden der Dokumente.');
    }

    return result;
  }
}
