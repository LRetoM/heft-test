import '@pnp/sp/webs';
import '@pnp/sp/sites';
import '@pnp/sp/lists';
import { CommonsState } from '../stateModels/CommonsState';
import { SpListSelectFields, buildSpListFilter } from '../constants/SpQueryConstants';
import { LoggingService } from './LoggingService';

export class SiteInfoService {

  public static async getSiteInfo(commonsState: CommonsState): Promise<{ Web: { Title: string; Url: string }; Site: { Url: string; Id: string }; SpLists: { Id: string; Title: string; ItemCount: number; BaseTemplate: number }[] }> {
    let result: { Web: { Title: string; Url: string }; Site: { Url: string; Id: string }; SpLists: { Id: string; Title: string; ItemCount: number; BaseTemplate: number }[] } = {
      Web: undefined,
      Site: undefined,
      SpLists: []
    };

    try {
      const [web, site, lists] = await Promise.all([
        commonsState.SharepointConnection.web.select(...SpListSelectFields.Web)(),
        commonsState.SharepointConnection.site.select(...SpListSelectFields.Site)(),
        commonsState.SharepointConnection.web.lists
          .select(...SpListSelectFields.Lists)
          .filter(buildSpListFilter(false))()
      ]);

      result = {
        Web: web,
        Site: site,
        SpLists: lists || []
      };
    } catch (error) {
      await LoggingService.handleError(error, 'SiteInfoService: Fehler beim Laden der Site-Informationen.');
    }

    return result;
  }
}
