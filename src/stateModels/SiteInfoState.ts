export class SiteInfoState {
  public IsLoading: boolean;
  public Web: { Title: string; Url: string };
  public Site: { Url: string; Id: string };
  public SpLists: { Id: string; Title: string; ItemCount: number; BaseTemplate: number }[];

  constructor() {
    this.IsLoading = true;
    this.Web = undefined;
    this.Site = undefined;
    this.SpLists = [];
  }
}
