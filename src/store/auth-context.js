import React, { useState } from "react";

const AuthContext = React.createContext({
  token: "",
  isLogged: false,
  login: (token) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const [token, setToken] = useState(null);

  const userIsLoggedIn = !!token;

  const loginHandler = (data) => {
    // console.log('data', data);
    setToken(data);
    // console.log('token', token);
  };
  const logoutHandler = () => {
    setToken(null);
  };

  const contextValue = {
    token: token,
    isLogged: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
