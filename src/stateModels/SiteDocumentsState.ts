import { ISiteDocument } from '../interfaces/ISiteDocument';

export class SiteDocumentsState {
  public IsLoading: boolean;
  public Documents: ISiteDocument[];

  constructor() {
    this.IsLoading = true;
    this.Documents = [];
  }
}
