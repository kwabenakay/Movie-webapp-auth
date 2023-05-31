import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/SVG";
import { login } from "../api";
import useSignIn from "react-auth-kit/dist/hooks/useSignIn";

interface FormErrors {
  email?: string[];
  password?: string[];
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  let navigate = useNavigate();
  const signIn = useSignIn();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = { email: email, password: password };
      if (formData.email && formData.password) {
        login(formData).then((response) => {
          if (response?.data.result) {
            console.log(response.data);
            //authentication
            signIn({
              token: response.data.token,
              expiresIn: 3600,
              tokenType: "Bearer",
              authState: { email: formData.email },
            });
            localStorage.setItem(
              "data",
              JSON.stringify(response.data.finalMovie)
            );
            navigate("/home");
          } else {
            alert("login failed");
          }
        });
      } else if (!formData.email) {
        console.log("Something went wrong");
        setFormErrors({
          email: ["can't be empty"],
        });
      } else if (!formData.password) {
        console.log("Something went wrong");
        setFormErrors({
          password: ["can't be empty"],
        });
      }
    } catch (error) {
      setFormErrors({
        email: ["can't be empty"],
        password: ["can't be empty"],
      });
      console.log(error);
    }
  }

  return (
    <div className=" mx-auto flex flex-col items-center gap-14 pt-12 tablet:gap-20">
      <div>
        <Logo />
      </div>
      <div className=" text-white text-sm bg-light-teal-blue mx-auto p-6 min-w-[326px] rounded-lg tablet:min-w-[400px] tablet:rounded-xl">
        <form
          className=" flex flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl self-start">Login</h1>
          <div className=" w-full h-9">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`w-full h-full bg-transparent border-solid ${
                formErrors.email?.[0] ? "border-red" : "border-grey"
              } border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer`}
            />
            {formErrors.email?.[0] && (
              <div
                id="emailText"
                className=" relative left-[60%] mt-[-2.25rem] w-28 text-red"
              >
                {formErrors.email?.[0]}
              </div>
            )}
          </div>
          <div className=" w-full h-9">
            <input
              id="password"
              type="Password"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className={`w-full h-full bg-transparent border-solid ${
                formErrors.password?.[0] ? "border-red" : "border-grey"
              } border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer`}
            />
            {formErrors.password?.[0] && (
              <div
                id="passwordText"
                className=" relative left-[60%] mt-[-2.25rem] w-28 text-red"
              >
                {formErrors.password?.[0]}
              </div>
            )}
          </div>
          <input
            type="submit"
            value="Login to your account"
            className=" w-full h-12 mt-4 bg-red rounded-lg outline-none text-xl hover:bg-white hover:text-teal-blue hover:cursor-pointer"
          />
        </form>
        <div className="text-center mt-6">
          Don't have an account?
          <span className=" text-red">
            <Link to={`/signup`}> Sign up</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
