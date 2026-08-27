export class SharePointList {

  public Id: string;
  public Title: string;
  public Description: string;
  public DefaultViewUrl: string;
  public ItemCount: number;
  public BaseTemplate: number;

  constructor() {
    this.Id = undefined;
    this.Title = undefined;
    this.Description = undefined;
    this.DefaultViewUrl = undefined;
    this.ItemCount = undefined;
    this.BaseTemplate = undefined;
  }
}
