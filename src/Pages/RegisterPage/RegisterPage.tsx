import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const RegisterPage = (props: Props) => {
  const [errors, setErrors] = useState(false);
  const usernameError = useRef("");
  const passwordError = useRef("");
  const emailError = useRef("");
  const { registerUser } = useAuth();
  useEffect(() => {
    document.title = "Football App - Sign up";
  }, []);

  const signupHandler = (e: any) => {
    e.preventDefault();
    console.log("ee");
    if (e.target.username.value.length > 15) {
      usernameError.current = "Username too long.";
      setErrors(true);
      console.log("here name");
      return;
    }
    if (e.target.password.value.length < 4) {
      passwordError.current = "Password too short.";
      setErrors(true);
      console.log("here pw");
      return;
    }
    // const regex = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2-6}$/;
    // if (!regex.test(e.target.email.value)) {
    //   console.log(e.target.email.value);
    //   emailError.current = "Not a valid email";
    //   setErrors(true);
    //   console.log("here ema");
    //   return;
    // }
    setErrors(false);
    usernameError.current = "";
    passwordError.current = "";
    emailError.current = "";
    registerUser(
      e.target.email.value,
      e.target.username.value,
      e.target.password.value
    );
  };
  return (
    <div>
      RegisterPage
      <form action="" onSubmit={signupHandler}>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="username"
        />
        <p>{usernameError.current}</p>
        <input type="email" name="email" id="email" placeholder="email" />
        <p>{emailError.current.length > 0 && emailError.current}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="password"
        />
        <p>{passwordError.current.length > 0 && passwordError.current}</p>
        <button type="submit" disabled={errors}>
          Sign up
        </button>
        <p>
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
