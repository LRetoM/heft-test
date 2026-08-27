import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SiteInfoState } from '../../stateModels/SiteInfoState';

const siteInfoSlice = createSlice({
  name: 'siteInfo',
  initialState: new SiteInfoState(),
  reducers: {
    START_LOADING_SITE_INFO(state: SiteInfoState) {
      return { ...state, IsLoading: true };
    },
    LOADING_SITE_INFO(state: SiteInfoState, action: PayloadAction<{ Web: { Title: string; Url: string }; Site: { Url: string; Id: string } }>) {
      return {
        ...state,
        Web: action.payload.Web,
        Site: action.payload.Site,
        IsLoading: false
      };
    }
  }
});

export default siteInfoSlice;
export const { START_LOADING_SITE_INFO, LOADING_SITE_INFO } = siteInfoSlice.actions;
