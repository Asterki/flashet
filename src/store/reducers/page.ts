import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../index";

interface PageState {
	value: number;
}

const initialState: PageState = {
	value: 0,
};

export const PageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<number>) => {
			state.value = action.payload;
		},
	},
});

export const { setLanguage } = PageSlice.actions;
export const selectCount = (state: RootState) => state.page.value;
export default PageSlice.reducer;
