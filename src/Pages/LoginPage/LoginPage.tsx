import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const LoginPage = (props: Props) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { loginUser } = useAuth();
  useEffect(() => {
    document.title = "Football App - Login";
  }, []);
  const loginHandler = (e: any) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if (username.length > 15) {
      setErrorMessage("Username must be maximum 15 characters long");
      return;
    }
    if (password.length < 4) {
      setErrorMessage("Password must be at least 4 characters");
      return;
    }
    setErrorMessage("");
    loginUser(username, password);
  };
  return (
    <div>
      {errorMessage.length > 0 && errorMessage}
      <form action="" className="form-container" onSubmit={loginHandler}>
        <div className="formField">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
        </div>
        <div className="formField">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
        </div>
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to={"/register"}>Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
