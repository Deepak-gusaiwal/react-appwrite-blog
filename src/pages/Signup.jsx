import React, { useEffect, useState } from "react";
import { Input, Button, ErrorTxt } from "../components/index";
import { authService } from "../services/auth";
import { useFetchAndStoreCurrentUser } from "../services/helpers";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const fetchAndStoreCurrentUser = useFetchAndStoreCurrentUser();
  const navigate = useNavigate();
  const { isUserActive } = useSelector((state) => state.userSliceReducer);

  const formSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData;
    setLoading(true);

    //validate fields
    if (!name || !email || !password || password.length < 8) {
      setError(true);
      setLoading(false);
      return;
    } 
    //signup logic
    try {
      await authService.createAccount({ ...formData });
      await fetchAndStoreCurrentUser();
      navigate("/");
    } catch (error) {
      console.log("Signup failed:", error.message);
    } finally {
      setError(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    isUserActive && navigate("/");
  }, [isUserActive]);
  return (
    <>
      <div className="max-w-[500px] mx-auto my-2 p-2 rounded bg-zinc-200">
        <h2 className="text-center text-3xl uppercase font-semibold text-blue-500 mb-2 select-all">
          Signup
        </h2>

        <form onSubmit={formSubmit}>
          <Input
            label={"name"}
            type={"text"}
            placeholder="enter your name"
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, name: e.target.value });
            }}
          />
          {error && !formData.name && <ErrorTxt>Invalid Name</ErrorTxt>}
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
            label={"passowrd"}
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
            Signup
          </Button>
        </form>
      </div>
    </>
  );
};

export default Signup;
