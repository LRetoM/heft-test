import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISiteDocument } from '../../interfaces/ISiteDocument';
import { SiteDocumentsState } from '../../stateModels/SiteDocumentsState';

const siteDocumentsSlice = createSlice({
  name: 'siteDocuments',
  initialState: new SiteDocumentsState(),
  reducers: {
    START_LOADING_SITE_DOCUMENTS(state: SiteDocumentsState) {
      return { ...state, IsLoading: true };
    },
    LOADING_SITE_DOCUMENTS(state: SiteDocumentsState, action: PayloadAction<ISiteDocument[]>) {
      return {
        ...state,
        Documents: action.payload,
        IsLoading: false
      };
    }
  }
});

export default siteDocumentsSlice;
export const { START_LOADING_SITE_DOCUMENTS, LOADING_SITE_DOCUMENTS } = siteDocumentsSlice.actions;
