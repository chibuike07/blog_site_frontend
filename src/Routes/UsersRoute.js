import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContextProvider } from "../Context_files/UserContext";

const UsersRoutes = (props) => {
  //checking for using token is session storage
  const isAuth = !!sessionStorage.getItem("client") ? (
    <UserContextProvider>
      <Route {...props} />
    </UserContextProvider>
  ) : (
    <Redirect to="/login" />
  );

  return <div>{isAuth}</div>;
};
export default UsersRoutes;
