import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/header/Header";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useFetchAndStoreCurrentUser } from "./services/helpers";
import { useSelector } from "react-redux";
const App = () => {
  const {userData} = useSelector((state)=>state.userSliceReducer)
  //get current logged in user details
  const fetchAndStoreCurrentUser = useFetchAndStoreCurrentUser();
  useEffect(() => {
    fetchAndStoreCurrentUser();
  }, [userData]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default App;
