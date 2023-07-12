import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    users: [],
  },
  reducers: {
    addUser(state, action) {
      const newUser = action.payload;
      state.users.push({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
      });
    },
    getAllUser(state, action) {
      const allUser = action.payload;
      state.users = allUser;
    },
    updateUser(state, action) {
      const updatedUser = action.payload;
      const index = state.users.findIndex(
        (user) => user._id === updatedUser._id
      );
      state.users[index] = updatedUser;
    },
    removeUser(state, action) {
      const userId = action.payload;
      state.users = state.users.filter((user) => user._id !== userId._id);
    },
  },
});

export const userAction = userSlice.actions;

export default userSlice;
