import { Article, FilterElement } from "@/types/type";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export const globalSlice = createSlice({
  name: "global",
  initialState: {
    menuIndex: 1,
    IsGlobalLoading: false,
    homeArticles: [] as Article[],
    homeCurrentPage: 0,
    homeFilter: {
      headline: "",
      date: "",
      nations: [] as string[],
    },
    scrapFilter: {
      headline: "",
      date: "",
      nations: [] as string[],
    },
  },
  reducers: {
    setMenuIndex: (state, action: PayloadAction<number>) => {
      state.menuIndex = action.payload;
    },
    setIsGlobalLoading: (state, action: PayloadAction<boolean>) => {
      state.IsGlobalLoading = action.payload;
    },
    setHomeFilter: (state, action: PayloadAction<FilterElement>) => {
      state.homeFilter = action.payload;
    },
    setHomeArticles: (state, action: PayloadAction<Article[]>) => {
      state.homeArticles = action.payload;
    },
    setHomeCurrentPage: (state, action: PayloadAction<number>) => {
      state.homeCurrentPage = action.payload;
    },
    setScrapFilter: (state, action: PayloadAction<FilterElement>) => {
      state.scrapFilter = action.payload;
    },
  },
});

export const { setMenuIndex, setIsGlobalLoading, setHomeFilter, setHomeArticles, setHomeCurrentPage, setScrapFilter } = globalSlice.actions;

export default globalSlice.reducer;
