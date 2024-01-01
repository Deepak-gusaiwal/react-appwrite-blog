import { useDispatch } from "react-redux";
import { authService } from "./auth";
import { storeLogin } from "../redux/userSlice";
import { postService } from "./post";
import { setAllStorePosts } from "../redux/postSlice";

/// for get current user if he is logged in

export const useFetchAndStoreCurrentUser = () => {
  const dispatch = useDispatch();

  const fetchAndStoreCurrentUser = async () => {
    try {
      const currentUser = await authService.getCurrentUser();
      currentUser && dispatch(storeLogin(currentUser));
      return currentUser;
    } catch (error) {
      console.log(
        "Failed At use Fetch And Store Current User::",
        error.message
      );
      return null;
    }
  };
  return fetchAndStoreCurrentUser;
};

export const useFetchAndStorePosts = () => {
  const dispatch = useDispatch();
  const fetchAndStorePosts = async () => {
    try {
      const allPosts = await postService.getPosts();
      allPosts && dispatch(setAllStorePosts(allPosts?.documents));
      return allPosts;
    } catch (error) {
      console.log("Failed At use fetch and store posts", error.message);
    }
  };

  return fetchAndStorePosts;
};
