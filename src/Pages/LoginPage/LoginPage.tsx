import React, { useEffect } from "react";

type Props = {};

const LoginPage = (props: Props) => {
  useEffect(() => {
    document.title = "Football App - Login";
  }, []);
  return <div>LoginPage</div>;
};

export default LoginPage;
