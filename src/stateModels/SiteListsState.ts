import { SharePointList } from '../models/SharePointList';

export class SiteListsState {
  public IsLoading: boolean;
  public Lists: SharePointList[];

  constructor() {
    this.IsLoading = true;
    this.Lists = [];
  }
}
