const { createSlice } = require("@reduxjs/toolkit");

const languageSlice = createSlice({
  name: "language",
  initialState: {
    isArabicLanguage: false,
  },
  reducers: {
    toggleSelectedLanguage: (state) => {},
  },
});

export const { toggleSelectedLanguage } = languageSlice.actions;
