declare interface IApiExplorerWebPartStrings {
  InitialView: {
    Loading: string;
    ErrorOccurred: string;
  };
  UserProfile: {
    Title: string;
    Loading: string;
    Labels: {
      GraphDisplayName: string;
      SharePointDisplayName: string;
      Email: string;
      JobTitle: string;
      Department: string;
    };
  };
  SiteInfo: {
    Title: string;
    Loading: string;
    Labels: {
      SiteTitle: string;
      SiteUrl: string;
      SiteCollectionUrl: string;
      SiteCollectionId: string;
    };
  };
  Groups: {
    Title: string;
    Loading: string;
    Buttons: {
      New: string;
      Join: string;
      Delete: string;
      Cancel: string;
    };
    Panel: {
      CreateTitle: string;
      EditTitle: string;
      Fields: {
        GroupId: string;
        DisplayName: string;
      };
      ErrorMessages: {
        EmptyGroupId: string;
        ErrorWhileJoining: string;
        ErrorWhileLeaving: string;
      };
    };
  };
  SiteLists: {
    Title: string;
    Loading: string;
    ColumnNames: {
      Title: string;
      Items: string;
      Template: string;
      Id: string;
    };
    Buttons: {
      New: string;
      Save: string;
      Delete: string;
      Cancel: string;
    };
    Panel: {
      CreateTitle: string;
      EditTitle: string;
      Fields: {
        Title: string;
        Description: string;
      };
      ErrorMessages: {
        EmptyTitle: string;
        ErrorWhileSaving: string;
        ErrorWhileDeleting: string;
      };
    };
  };
  DocumentLibraries: {
    Title: string;
    Loading: string;
    ColumnNames: {
      Id: string;
      Title: string;
      Description: string;
      Url: string;
    };
    Buttons: {
      New: string;
      Save: string;
      Delete: string;
      Cancel: string;
    };
    Panel: {
      CreateTitle: string;
      EditTitle: string;
      Fields: {
        Title: string;
        Description: string;
      };
      ErrorMessages: {
        EmptyTitle: string;
        ErrorWhileSaving: string;
        ErrorWhileDeleting: string;
      };
    };
  };
}

declare module 'ApiExplorerWebPartStrings' {
  const strings: IApiExplorerWebPartStrings;
  export = strings;
}
