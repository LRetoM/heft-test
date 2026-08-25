export class DocumentLibrariesState {
  public IsLoading: boolean;
  public Libraries: { Id: string; Title: string; Description: string; DefaultViewUrl: string }[];

  constructor() {
    this.IsLoading = true;
    this.Libraries = [];
  }
}
