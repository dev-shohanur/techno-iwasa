import axios from "axios";
import React, { useEffect } from "react";
import { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const signIn = (user) => {
    setUser(user);
  };

  const logOut = () => {
    setUser(null);
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const getCurentUser = async () => {
      try {
        const token = localStorage.getItem("authToken"); // Replace with your actual token

        if (!token) {
          return;
        }
        const data = {
          // Specify the data to be sent in the request body
          // ...
        };

        const response = await axios.post(
          "http://localhost:5000/user/curent-user",
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
      } catch (error) {
        console.error("Error:", error.response.data);
      }
    };

    getCurentUser();
    setLoading(false);
  }, []);

  const authInfo = { signIn, user, loading, logOut };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
