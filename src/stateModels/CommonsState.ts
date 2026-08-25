import { SPFI } from '@pnp/sp';
import { GraphFI } from '@pnp/graph';
export class CommonsState {
  public SharepointConnection: SPFI;
  public GraphConnection: GraphFI;
  public Context: any;
  public IsInitialLoading: boolean;
  public HasAppError: boolean;

  constructor() {
    this.SharepointConnection = undefined;
    this.GraphConnection = undefined;
    this.Context = undefined;
    this.IsInitialLoading = true;
    this.HasAppError = false;
  }
}