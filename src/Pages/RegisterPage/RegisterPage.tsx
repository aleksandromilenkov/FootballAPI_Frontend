import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const RegisterPage = (props: Props) => {
  const [errors, setErrors] = useState<string>("");
  const { registerUser } = useAuth();
  useEffect(() => {
    document.title = "Football App - Sign up";
  }, []);

  const signupHandler = (e: any) => {
    e.preventDefault();
    console.log("ee");
    const username = e.target.username.value;
    const password = e.target.password.value;
    const email = e.target.email.value;
    console.log(username, password, email);
    if (e.target.username.value.length > 15) {
      setErrors("");
      setErrors("Username must be maximum 15 characters long");
      console.log("here name");
      return;
    }
    if (e.target.password.value.length < 4) {
      setErrors("Password must be at least 4 characters");
      console.log("Password must be at least 4 characters");
      return;
    }
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = regex.test(email);
    if (!isValidEmail) {
      setErrors("Not a valid e-mail");
      return;
    }
    setErrors("");
    registerUser(
      e.target.email.value,
      e.target.username.value,
      e.target.password.value
    );
  };
  return (
    <div>
      RegisterPage
      <p>{errors.length > 0 && errors}</p>
      <form action="" onSubmit={signupHandler}>
        <div className="formSection">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
        </div>
        <div className="formSection">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" placeholder="email" />
        </div>
        <div className="formSection">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Sign up</button>
        <p>
          Already have an account? <Link to={"/login"}>Login here</Link>
        </p>
      </form>
    </div>
  );
};

export default RegisterPage;
