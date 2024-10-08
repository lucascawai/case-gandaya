import { createSlice } from "@reduxjs/toolkit";

import { createAppAsyncThunk } from "./withTypes";
import { api } from "../services/axios";
import { RootState } from ".";

interface User {
  id: number;
  name: string;
  email: string;
  balance: number;
}

export const fetchUser = createAppAsyncThunk("users/fetchUser", async () => {
  const response = await api.get<User>("/users/1");
  return response.data;
});

const initialState: User = { id: 0, name: "", email: "", balance: 0 };

const usersSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (_, action) => {
      return action.payload;
    });
  },
});

export default usersSlice.reducer;

export const selectUserId = (state: RootState) => state.user.id;
export const selectUserBalance = (state: RootState) => state.user.balance;
