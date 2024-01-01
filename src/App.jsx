import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import {
  useFetchAndStoreCurrentUser,
  useFetchAndStorePosts,
} from "./services/helpers";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import Protected from "./pages/Protected";
import { Loading } from "./components";
import { useSelector } from "react-redux";
import EditPost from "./pages/EditPost";
import SinglePost from "./pages/SinglePost";
const App = () => {
  const [loading, setLoading] = useState(true);
  const { userData } = useSelector((state) => state.userSliceReducer);
  const { allPosts } = useSelector((state) => state.postSliceReducer);
  //get current logged in user details
  const fetchAndStoreCurrentUser = useFetchAndStoreCurrentUser();
  const fetchAndStorePosts = useFetchAndStorePosts();
  const getPostsAndCurrentUser = async () => {
    try {
      await fetchAndStorePosts();
      await fetchAndStoreCurrentUser();
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getPostsAndCurrentUser();
  }, []);
  return loading ? (
    <div className="flex justify-center items-center w-full h-[100vh] bg-gray-200">
      <Loading color="red" size="16" border="4" />
    </div>
  ) : (
    <>
      <Header />
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/edit/:slug" element={<EditPost />} />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/post/:slug" element={<SinglePost />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
