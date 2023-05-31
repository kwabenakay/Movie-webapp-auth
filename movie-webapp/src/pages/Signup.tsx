import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "../components/SVG";
import { signup } from "../api";

type FormErrors = {
  email?: string[];
  password?: string[];
  repeat_password?: string[];
};

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  let navigate = useNavigate();
  console.log(repeatPassword);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      const formData = { email, password, repeatPassword };
      if (
        formData.email &&
        formData.password &&
        formData.password === formData.repeatPassword
      ) {
        signup({ email, password }).then((response) => {
          if (response?.data === "success") {
            console.log("verify email");
            navigate("/login");
          }else{console.log(response)}
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
    <div className=" mx-auto h-screen flex flex-col items-center gap-14 pt-12 tablet:gap-20">
      <div>
        <Logo />
      </div>
      <div className=" text-white text-sm bg-light-teal-blue mx-auto p-6 min-w-[326px] rounded-lg tablet:min-w-[400px] tablet:rounded-xl">
        <form
          className=" flex flex-col items-center gap-6"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl self-start">Sign Up</h1>
          <div className=" w-full h-9">
            <input
              id="email"
              type="email"
              placeholder="Email address"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className={`w-full h-full bg-transparent border-solid ${
                formErrors["email"]?.[0] ? "border-red" : "border-grey"
              } border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer`}
            />
            {formErrors["email"]?.[0] && (
              <div
                id="emailText"
                className=" relative left-[60%] mt-[-2.25rem] w-28 text-red"
              >
                {formErrors["email"]?.[0]}
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
                formErrors["password"]?.[0] ? "border-red" : "border-grey"
              } border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer`}
            />
            {formErrors["password"]?.[0] && (
              <div
                id="passwordText"
                className=" relative left-[60%] mt-[-2.25rem] w-28 text-red"
              >
                {formErrors["password"]?.[0]}
              </div>
            )}
          </div>
          <div className=" w-full h-9">
            <input
              id="repeatPassword"
              type="Password"
              placeholder="Repeat Password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
              className={`w-full h-full bg-transparent border-solid ${
                formErrors["repeat_password"]?.[0]
                  ? "border-red"
                  : "border-grey"
              } border-b-2 outline-none pb-4 px-4 focus:border-white focus:caret-red hover:cursor-pointer`}
            />
            {formErrors["repeat_password"]?.[0] && (
              <div
                id="repeatPasswordText"
                className=" relative left-[60%] mt-[-2.25rem] w-28 text-red"
              >
                {formErrors["repeat_password"]?.[0]}
              </div>
            )}
          </div>
          <input
            type="submit"
            value="Create an account"
            className=" w-full h-12 mt-4 bg-red rounded-lg outline-none text-xl hover:bg-white hover:text-teal-blue hover:cursor-pointer"
          />
        </form>
        <div className="text-center mt-6">
          Already have an account?
          <span className=" text-red">
            <Link to={`/login`}> Login</Link>
          </span>
        </div>
      </div>
    </div>
  );
}
