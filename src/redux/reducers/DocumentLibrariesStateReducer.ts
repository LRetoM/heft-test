import { createSlice, PayloadAction, current } from '@reduxjs/toolkit';
import { DocumentLibrariesState } from '../../stateModels/DocumentLibrariesState';
import { DocumentLibrary } from '../../models/DocumentLibrary';

const documentLibrariesSlice = createSlice({
  name: 'documentLibraries',
  initialState: new DocumentLibrariesState(),
  reducers: {
    START_LOADING_DOCUMENT_LIBRARIES(state: DocumentLibrariesState) {
      return { ...state, IsLoading: true };
    },
    LOADING_DOCUMENT_LIBRARIES(state: DocumentLibrariesState, action: PayloadAction<DocumentLibrary[]>) {
      return {
        ...state,
        Libraries: action.payload,
        IsLoading: false
      };
    },
    ADD_UPDATE_DOCUMENT_LIBRARY(state: DocumentLibrariesState, action: PayloadAction<DocumentLibrary>) {
      const currentLibraries = current(state).Libraries;
      const existingLibrary = currentLibraries.filter(library => library.Id === action.payload.Id)[0];

      return {
        ...state,
        Libraries: existingLibrary === undefined
          ? currentLibraries.concat(action.payload)
          : currentLibraries.map(library => library.Id === action.payload.Id ? action.payload : library)
      };
    },
    REMOVE_DOCUMENT_LIBRARY(state: DocumentLibrariesState, action: PayloadAction<DocumentLibrary>) {
      return {
        ...state,
        Libraries: current(state).Libraries.filter(library => library.Id !== action.payload.Id)
      };
    }
  }
});

export default documentLibrariesSlice;
export const { START_LOADING_DOCUMENT_LIBRARIES, LOADING_DOCUMENT_LIBRARIES, ADD_UPDATE_DOCUMENT_LIBRARY, REMOVE_DOCUMENT_LIBRARY } = documentLibrariesSlice.actions;
