import { DocumentLibrary } from '../models/DocumentLibrary';

export class DocumentLibrariesState {
  public IsLoading: boolean;
  public Libraries: DocumentLibrary[];

  constructor() {
    this.IsLoading = true;
    this.Libraries = [];
  }
}
