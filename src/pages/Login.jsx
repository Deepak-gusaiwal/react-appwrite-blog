import React, { useEffect, useState } from "react";
import { Input, Button, ErrorTxt } from "../components";
import { authService } from "../services/auth";
import {
  useFetchAndStoreCurrentUser,
  useFetchAndStorePosts,
} from "../services/helpers";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const fetchAndStoreCurrentUser = useFetchAndStoreCurrentUser();
  const fetchAndStorePosts = useFetchAndStorePosts();
  const { isUserActive } = useSelector((state) => state.userSliceReducer);

  const formSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    setLoading(true);
    if (!email || !password || password.length < 8) {
      setError(true);
      setLoading(false);
      return;
    }
    try {
      await authService.login({ ...formData });
      await fetchAndStoreCurrentUser();
      await fetchAndStorePosts();
      navigate("/");
    } catch (error) {
      console.log("Login failed:", error.message);
    } finally {
      setLoading(false);
      setError(false);
    }
  };

  useEffect(() => {
    isUserActive && navigate("/");
  }, [isUserActive]);
  return (
    <>
      <div className="max-w-[500px] mx-auto my-2 p-2 rounded bg-zinc-200">
        <h2 className="text-center text-3xl uppercase font-semibold text-blue-500 mb-2 select-all">
          Login
        </h2>

        <form onSubmit={formSubmit}>
          <Input
            label={"email"}
            type={"email"}
            placeholder="enter your email"
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
          />
          {error && !formData.email && <ErrorTxt>Invalid Email</ErrorTxt>}
          <Input
            label={"password"}
            type={"password"}
            placeholder="enter your password"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
          />
          {error && !formData.password && formData.password.length < 8 && (
            <ErrorTxt>Invalid Passowrd</ErrorTxt>
          )}
          {error && formData.password && formData.password.length < 8 && (
            <ErrorTxt>
              Password Length Should be more than 8 charachters
            </ErrorTxt>
          )}
          <Button loading={loading} type="submit" className="mx-auto">
            login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;
