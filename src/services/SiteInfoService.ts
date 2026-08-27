import '@pnp/sp/webs';
import '@pnp/sp/sites';
import { IWebInfo } from '@pnp/sp/webs';
import { ISiteInfo } from '@pnp/sp/sites/types';
import { CommonsState } from '../stateModels/CommonsState';
import { SpListSelectFields } from '../constants/SpQueryConstants';

export class SiteInfoService {

  public static async getSiteInfo(commonsState: CommonsState): Promise<{ Web: { Title: string; Url: string }; Site: { Url: string; Id: string } }> {
    let result: { Web: { Title: string; Url: string }; Site: { Url: string; Id: string } } = {
      Web: undefined,
      Site: undefined
    };

    try {
      const [web, site]: [IWebInfo, ISiteInfo] = await Promise.all([
        commonsState.SharePointConnection.web.select(...SpListSelectFields.Web)(),
        commonsState.SharePointConnection.site.select(...SpListSelectFields.Site)()
      ]);

      result = {
        Web: web,
        Site: site
      };
    } catch (error) {
      await commonsState.SpFxCore.getSPFxCoreLoggingService().handleError(error, 'SiteInfoService: Fehler beim Laden der Site-Informationen.');
    }

    return result;
  }
}
