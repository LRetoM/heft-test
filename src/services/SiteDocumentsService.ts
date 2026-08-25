import '@pnp/sp/webs';
import '@pnp/sp/lists';
import '@pnp/sp/items';
import { CommonsState } from '../stateModels/CommonsState';
import { ISiteDocument } from '../interfaces/ISiteDocument';
import { SpListSelectFields, SP_SITE_DOCUMENTS_TOP } from '../constants/SpQueryConstants';
import { LoggingService } from './LoggingService';

export class SiteDocumentsService {

  public static async getSiteDocuments(commonsState: CommonsState): Promise<ISiteDocument[]> {
    //parse model(validieren) Schnittstelle nicht blind vertrauen
    let result: ISiteDocument[] = [];

    try { //jeder service sollte siene iegen getrequestfields methode verwnden und FeldNamen aus constants kommen so sind feldnamen wiederverwendbar über verschiedene Services
      const siteDocuments: ISiteDocument[] = await commonsState.SharePointConnection.web.defaultDocumentLibrary.items
        .select(...SpListSelectFields.SiteDocuments)
        .orderBy('Modified', false)//site Constants
        .top(SP_SITE_DOCUMENTS_TOP)();

      result = siteDocuments || [];
    } catch (error) {
      await LoggingService.handleError(error, 'SiteDocumentsService: Fehler beim Laden der Dokumente.');
    }

    return result;
  }
}
