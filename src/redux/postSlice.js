import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPosts: [],
};
const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setAllStorePosts: (state, action) => {
      state.allPosts = action.payload;
    },
    addStorePost: (state, action) => {
      state.allPosts.push(action.payload);
    },
    deleteStorePost: (state, action) => {
      const postIdToDelete = action.payload;
      state.allPosts = state.allPosts.filter(post => post.$id !== postIdToDelete);
    },
    updateStorePost: (state, action) => {
      const updatedPost = action.payload;
      state.allPosts = state.allPosts.map(post => post.$id !== updatedPost.$id ? post : { ...updatedPost });
    },
  },
});
export const { setAllStorePosts, addStorePost, deleteStorePost, updateStorePost } =
  postSlice.actions;
export const postSliceReducer = postSlice.reducer;
