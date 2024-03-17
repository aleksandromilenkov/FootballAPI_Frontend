import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const Navbar = (props: Props) => {
  const { isLoggedIn, user, logout } = useAuth();
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
        {isLoggedIn() && (
          <div>
            <Link to={"/clubs"}>Clubs</Link>
          </div>
        )}

        <div>
          {isLoggedIn() && (
            <div className="hover:text-darkBlue">
              <Link to={"/countries"}>Countries</Link>
            </div>
          )}
        </div>
        <div>
          {isLoggedIn() && (
            <div className="hover:text-darkBlue">
              <Link to={"/createFootballer"}>Create Footballer</Link>
            </div>
          )}
        </div>
        {isLoggedIn() ? (
          <div>
            <div className="hover:text-darkBlue">
              <Link to={"/"} onClick={logout}>
                Logout
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div>
              <div className="hover:text-darkBlue">
                <Link to={"/login"}>Login</Link>
              </div>
            </div>
            <div>
              <div className="hover:text-darkBlue">
                <Link to={"/register"}>Signup</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
