import { User } from '@microsoft/microsoft-graph-types';

export class UserState {
  public IsLoading: boolean;
  public GraphUser: User;
  public SharePointUserDisplayName: string;

  constructor() {
    this.IsLoading = true;
    this.GraphUser = undefined;
    this.SharePointUserDisplayName = '';
  }
}
