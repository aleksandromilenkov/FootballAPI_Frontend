import { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginAPI, registerAPI } from "../Services/AuthService";
import { toast } from "react-toastify";
import axios from "axios";
import React from "react";

type UserContextType = {
  user: UserProfile | null;
  token: string | null;
  registerUser: (email: string, username: string, password: string) => void;
  loginUser: (username: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("footballerUser");
    const token = localStorage.getItem("token");
    console.log(JSON.parse(user!));
    console.log(token);
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      // axios will add this to every single request
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    setIsReady(true);
  }, [token]);

  const registerUser = async (
    email: string,
    userName: string,
    password: string
  ) => {
    try {
      const resp = await registerAPI(email, userName, password);
      console.log(resp);
      console.log("zxczxc");
      const data = await resp;
      if (data) {
        localStorage.setItem("token", data?.data.token);
        const userObj = {
          username: data?.data.userName,
          email: data?.data.email,
        };
        localStorage.setItem("footballerUser", JSON.stringify(userObj));
        setToken(data?.data.token!);
        setUser(userObj!);
        toast.success("Register successfully.");
        navigate("/");
      }
    } catch (err) {
      toast.warning("Server error occured.");
    }
  };

  const loginUser = async (userName: string, password: string) => {
    await loginAPI(userName, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("token", res?.data.token);
          const userObj = {
            username: res?.data.userName,
            email: res?.data.email,
          };
          console.log(userObj.username, userObj.email);
          localStorage.setItem("footballerUser", JSON.stringify(userObj));
          setToken(res?.data.token!);
          setUser(userObj!);
          toast.success("Login successfully.");
          console.log("Will");
          navigate("/search");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("footballerUser");
    setUser(null);
    setToken("");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, token, isLoggedIn, logout, registerUser, user }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => useContext(UserContext);
