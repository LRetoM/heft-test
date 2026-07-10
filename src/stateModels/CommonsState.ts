import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export class CommonsState {
  public SharePointConnection: SPFI;
  public GraphConnection: GraphFI;
  public Context: WebPartContext;
  public IsInitialLoading: boolean;
  public HasAppError: boolean;

  constructor() {
    this.SharePointConnection = undefined;
    this.GraphConnection = undefined;
    this.Context = undefined;
    this.IsInitialLoading = true;
    this.HasAppError = false;
  }
}
