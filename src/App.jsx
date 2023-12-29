import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useFetchAndStoreCurrentUser } from "./services/helpers";
import Post from "./pages/Post";
import AddPost from "./pages/AddPost";
import Protected from "./pages/Protected";
const App = () => {
  //get current logged in user details
  const fetchAndStoreCurrentUser = useFetchAndStoreCurrentUser();
  useEffect(() => {
    const getAndSetUser = async () => {
      await fetchAndStoreCurrentUser();
    };
    getAndSetUser();
  }, []);
  return (
    <>
      <Header />
      <Routes>
        <Route element={<Protected />}>
          <Route path="/" element={<Home />} />
          <Route path="/add-post" element={<AddPost />} />
        </Route>
        <Route path="/post" element={<Post />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
