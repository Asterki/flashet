import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Types
import { LangPack } from "../../shared/types/lang";
interface PageState {
	lang: LangPack;
}

// Language packs
import langTemplate from "../../shared/locales/template";

const initialState: PageState = {
	lang: langTemplate, // Empty language file
};

// Create the slice
export const PageSlice = createSlice({
	name: "page",
	initialState,
	reducers: {
		setLanguage: (state, action: PayloadAction<LangPack>) => {
			state.lang = action.payload;
		},
	},
});

// Export
export const { setLanguage } = PageSlice.actions;
export default PageSlice.reducer;
