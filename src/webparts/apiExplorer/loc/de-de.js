define([], function() {
  return {
    InitialView: {
      Loading: 'Laden...',
      ErrorOccurred: 'Fehler beim Initialisieren der Anwendung.'
    },
    UserProfile: {
      Title: 'Profil',
      Loading: 'Profil wird geladen...',
      Labels: {
        GraphDisplayName: 'Name (Graph):',
        SharePointDisplayName: 'Name (SP):',
        Email: 'E-Mail:',
        JobTitle: 'Position:',
        Department: 'Abteilung:'
      }
    },
    SiteInfo: {
      Title: 'Site Informationen',
      Loading: 'Site-Informationen werden geladen...',
      Labels: {
        SiteTitle: 'Titel:',
        SiteUrl: 'URL:',
        SiteCollectionUrl: 'Site Collection URL:',
        SiteCollectionId: 'Site Collection ID:'
      }
    },
    Groups: {
      Title: 'Benutzer-Gruppen',
      Loading: 'Gruppen werden geladen...'
    },
    SiteLists: {
      Title: 'Verfügbare Listen auf dieser Site',
      Loading: 'Listen werden geladen...',
      ColumnNames: {
        Title: 'Titel',
        Items: 'Items',
        Template: 'Template',
        Id: 'ID'
      }
    },
    DocumentLibraries: {
      Title: 'Document-Libraries',
      Loading: 'Document Libraries werden geladen...',
      ColumnNames: {
        Id: 'ID',
        Title: 'Titel',
        Description: 'Description',
        Url: 'URL'
      },
      Buttons: {
        New: 'Neue Bibliothek',
        Save: 'Speichern',
        Delete: 'Löschen',
        Cancel: 'Abbrechen'
      },
      Panel: {
        CreateTitle: 'Neue Document Library',
        EditTitle: 'Document Library bearbeiten',
        Fields: {
          Title: 'Titel',
          Description: 'Beschreibung'
        },
        ErrorMessages: {
          EmptyTitle: 'Titel ist erforderlich.',
          ErrorWhileSaving: 'Fehler beim Speichern der Document Library.',
          ErrorWhileDeleting: 'Fehler beim Löschen der Document Library.'
        }
      }
    }
  };
});
