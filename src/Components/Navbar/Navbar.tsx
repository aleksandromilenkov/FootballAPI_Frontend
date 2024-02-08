import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav>
      <div className="left">
        <div>
          <Link to={"/"}>
            <p>FootballApp</p>
          </Link>
        </div>
        <div>
          <Link to={"/search"} className="text-black hover:text-darkBlue">
            Search
          </Link>
        </div>
      </div>
      <div className="right">
        <div>
          <Link to={"/clubs"}>Clubs</Link>
        </div>
        <div>
          <div className="hover:text-darkBlue">
            <Link to={"/international"}>International</Link>
          </div>
        </div>
        <div>
          <div className="hover:text-darkBlue">
            <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
