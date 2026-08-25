export class GroupState {
  public IsLoading: boolean;
  public UserGroups: { id?: string; displayName?: string }[];

  constructor() {
    this.IsLoading = true;
    this.UserGroups = [];
  }
}
