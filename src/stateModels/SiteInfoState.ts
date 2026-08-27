export class SiteInfoState {
  public IsLoading: boolean;
  public Web: { Title: string; Url: string };
  public Site: { Url: string; Id: string };

  constructor() {
    this.IsLoading = true;
    this.Web = undefined;
    this.Site = undefined;
  }
}
