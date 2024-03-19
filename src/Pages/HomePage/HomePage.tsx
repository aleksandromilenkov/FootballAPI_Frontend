import React, { useEffect } from "react";
import Hero from "../../Components/Hero/Hero";

type Props = {};

const HomePage = (props: Props) => {
  useEffect(() => {
    document.title = "Football App - Home";
  }, []);
  return (
    <div>
      <Hero />
    </div>
  );
};

export default HomePage;
