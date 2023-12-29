import React, { useState } from "react";
import { Input, Button } from "../components";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidator } from "../config/formValidator";
import { authService } from "../services/auth";
const Login = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidator),
  });

  const formSubmit = async (data) => {
    setLoading(true);
    try {
      await authService.login({ ...data });
    } catch (error) {
      console.log("Login failed:", error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="max-w-[500px] mx-auto my-2 p-2 rounded bg-zinc-200">
        <h2 className="text-center text-3xl uppercase font-semibold text-blue-500 mb-2 select-all">
          Login
        </h2>

        <form onSubmit={handleSubmit(formSubmit)}>
          <Input
            label={"email"}
            type={"email"}
            placeholder="enter your email"
            errors={errors}
            name={"email"}
            register={register}
          />
          <Input
            label={"password"}
            type={"password"}
            placeholder="enter your password"
            errors={errors}
            name={"password"}
            register={register}
          />
          <Button loading={loading} type="submit" className="mx-auto">
            login
          </Button>
        </form>
      </div>
    </>
  );
};

export default Login;