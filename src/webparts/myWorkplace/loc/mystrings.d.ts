declare interface IMyWorkplaceWebPartStrings {
  General: {
    ErrorOccurred: string;
  };
  UpcomingEvents: {
    Title: string;
    Empty: string;
    NoLocation: string;
  };
  SiteDocuments: {
    Title: string;
    Empty: string;
    ColumnNames: {
      Name: string;
      Modified: string;
    };
  };
}

declare module 'MyWorkplaceWebPartStrings' {
  const strings: IMyWorkplaceWebPartStrings;
  export = strings;
}
