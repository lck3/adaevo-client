import React, { useEffect, useState } from "react";

import ImageLight from "../assets/img/login-office.jpeg";
import ImageDark from "../assets/img/login-office-dark.jpeg";
import { Label, Input, Button } from "@windmill/react-ui";
import { useAuth } from "src/context/auth-context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import '../assets/css/login.scss'

function Login() {
  const [userForm, setUserForm] = useState({
    username: undefined,
    password: undefined,
  });
  const { login, clearStorageAuthItems } = useAuth();

  // form validation rules
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Email is required")
      .email("Email is invalid"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  useEffect(() => {
    clearStorageAuthItems();
  }, [clearStorageAuthItems]);

  return (
    <div className="flex items-center min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <div className="flex-1 h-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-xl dark:bg-gray-800">
        <div className="flex flex-col overflow-y-auto md:flex-row">
          <div className="h-32 md:h-auto md:w-1/2">
            <img
              aria-hidden="true"
              className="object-cover w-full h-full dark:hidden"
              src={ImageLight}
              alt="Office"
            />
            <img
              aria-hidden="true"
              className="hidden object-cover w-full h-full dark:block"
              src={ImageDark}
              alt="Office"
            />
          </div>
          <main className="flex items-center justify-center p-6 sm:p-12 md:w-1/2">
            <form className="w-full" onSubmit={handleSubmit(login)}>
              <h1 className="mb-4 text-xl font-semibold text-gray-700 dark:text-gray-200">
                Login
              </h1>
              <Label>
                <span>Email</span>
                <Input
                  type="email"
                  placeholder="john@doe.com"
                  name="username"
                  {...register("username")}
                  className={`mt-1 form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                />
                <div className="invalid-feedback">
                  {errors.username?.message}
                </div>
              </Label>

              <Label className="mt-4">
                <span>Password</span>
                <Input
                  className={`mt-1 form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  type="password"
                  placeholder="***************"
                  {...register("password")}
                  name="password"
                />
                <div className="invalid-feedback">
                  {errors.password?.message}
                </div>
              </Label>

              <Button className="mt-4" block type="submit">
                Log in
              </Button>

              <hr className="my-8" />
            </form>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Login;
