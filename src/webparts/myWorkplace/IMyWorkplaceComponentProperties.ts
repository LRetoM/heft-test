import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IMyWorkplaceComponentProperties {
  SharePointConnection: SPFI;
  GraphConnection: GraphFI;
  Context: WebPartContext;
}
