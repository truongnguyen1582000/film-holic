import { createSlice } from "@reduxjs/toolkit";
import StorageKeys from "constants/storage-keys";

const userSlice = createSlice({
  name: "user",
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    login: (state, action) => {
      state.current = action.payload.account;
      localStorage.setItem(
        StorageKeys.USER,
        JSON.stringify(action.payload.account)
      );
      localStorage.setItem(StorageKeys.SESSION_ID, action.payload.session_id);
    },
    logout: (state) => {
      state.current = {};
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.SESSION_ID);
    },
  },
  extraReducers: {},
});

const { actions, reducer } = userSlice;
export const { logout, login } = actions;
export default reducer;
