define([], function() {
  return {
    InitialView: {
      Loading: 'Loading...',
      ErrorOccurred: 'Error while initializing the application.'
    },
    UserProfile: {
      Title: 'Profile',
      Loading: 'Loading profile...',
      Labels: {
        GraphDisplayName: 'Name (Graph):',
        SharePointDisplayName: 'Name (SP):',
        Email: 'Email:',
        JobTitle: 'Job Title:',
        Department: 'Department:'
      }
    },
    SiteInfo: {
      Title: 'Site Information',
      Loading: 'Loading site information...',
      Labels: {
        SiteTitle: 'Title:',
        SiteUrl: 'URL:',
        SiteCollectionUrl: 'Site Collection URL:',
        SiteCollectionId: 'Site Collection ID:'
      }
    },
    Groups: {
      Title: 'User Groups',
      Loading: 'Loading groups...',
      Buttons: {
        New: 'Join Group',
        Join: 'Join',
        Delete: 'Leave Group',
        Cancel: 'Cancel'
      },
      Panel: {
        CreateTitle: 'Join Group',
        EditTitle: 'Group Membership',
        Fields: {
          GroupId: 'Group ID',
          DisplayName: 'Name'
        },
        ErrorMessages: {
          EmptyGroupId: 'Group ID is required.',
          ErrorWhileJoining: 'Error while joining the group.',
          ErrorWhileLeaving: 'Error while leaving the group.'
        }
      }
    },
    SiteLists: {
      Title: 'Available Lists on this Site',
      Loading: 'Loading lists...',
      ColumnNames: {
        Title: 'Title',
        Items: 'Items',
        Template: 'Template',
        Id: 'ID'
      }
    },
    DocumentLibraries: {
      Title: 'Document Libraries',
      Loading: 'Loading document libraries...',
      ColumnNames: {
        Id: 'ID',
        Title: 'Title',
        Description: 'Description',
        Url: 'URL'
      },
      Buttons: {
        New: 'New Library',
        Save: 'Save',
        Delete: 'Delete',
        Cancel: 'Cancel'
      },
      Panel: {
        CreateTitle: 'New Document Library',
        EditTitle: 'Edit Document Library',
        Fields: {
          Title: 'Title',
          Description: 'Description'
        },
        ErrorMessages: {
          EmptyTitle: 'Title is required.',
          ErrorWhileSaving: 'Error while saving the document library.',
          ErrorWhileDeleting: 'Error while deleting the document library.'
        }
      }
    }
  };
});
