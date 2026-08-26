import { SPFI } from '@pnp/sp';
import { SpFxCore } from 'glb-sp-fx-core/lib/services/spFxCore/SpFxCore';

export class CommonsState {
  public SharePointConnection: SPFI;
  public SpFxCore: SpFxCore;
  public Context: any;
  public IsInitialLoading: boolean;
  public HasAppError: boolean;

  constructor() {
    this.SharePointConnection = undefined;
    this.SpFxCore = undefined;
    this.Context = undefined;
    this.IsInitialLoading = true;
    this.HasAppError = false;
  }
}