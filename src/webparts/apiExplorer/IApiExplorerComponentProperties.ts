import { SPFI } from '@pnp/sp';
import { SpFxCore } from 'glb-sp-fx-core/lib/services/spFxCore/SpFxCore';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IApiExplorerComponentProperties {
  SharePointConnection: SPFI;
  SpFxCore: SpFxCore;
  Context: WebPartContext;
}
