import React, { useEffect } from "react";
import { Link } from "react-router-dom";

type Props = {};

const LoginPage = (props: Props) => {
  useEffect(() => {
    document.title = "Football App - Login";
  }, []);
  return (
    <div>
      LoginPage
      <form action="">
        <input type="text" placeholder="username" />
        <input type="password" placeholder="password" />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to={"/register"}>Sign up here</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
