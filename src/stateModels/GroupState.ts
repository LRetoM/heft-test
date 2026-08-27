import { UserGroup } from '../models/UserGroup';

export class GroupState {
  public IsLoading: boolean;
  public UserGroups: UserGroup[];

  constructor() {
    this.IsLoading = true;
    this.UserGroups = [];
  }
}
