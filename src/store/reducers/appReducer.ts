import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { TempUnit } from "@/utils/unitConversion";

const DARK_MODE_LABEL = "weatherxDarkMode";

export interface IAppState {
  tempUnit: TempUnit;
  isLoading: boolean;
  darkMode: boolean;
}

const initialState: IAppState = {
  tempUnit: TempUnit.CELCIUS,
  isLoading: false,
  darkMode: false,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleDarkMode: (state: IAppState) => {
      state.darkMode = !state.darkMode;
    },
    changeTempUnit: (state: IAppState) => {
      state.tempUnit =
        state.tempUnit === TempUnit.CELCIUS
          ? TempUnit.FAHRENHEIT
          : TempUnit.CELCIUS;
    },
    setIsLoading: (state: IAppState, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { changeTempUnit, toggleDarkMode, setIsLoading } =
  appSlice.actions;
export default appSlice.reducer;
