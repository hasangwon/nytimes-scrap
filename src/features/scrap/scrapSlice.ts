import { Article } from "@/types/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ScrapState {
  scraps: Article[];
}

const initialState: ScrapState = {
  scraps: [],
};

export const scrapSlice = createSlice({
  name: "scrap",
  initialState,
  reducers: {
    addScrap: (state, action: PayloadAction<Article>) => {
      state.scraps.push(action.payload);
    },
    removeScrapById: (state, action: PayloadAction<string>) => {
      state.scraps = state.scraps.filter((scrap) => scrap._id !== action.payload);
    },
  },
});

export const { addScrap, removeScrapById } = scrapSlice.actions;
export default scrapSlice.reducer;
