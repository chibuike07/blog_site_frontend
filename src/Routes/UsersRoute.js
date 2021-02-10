import React from "react";
import { Route, Redirect } from "react-router-dom";
import { UserContextProvider } from "../Context_files/UserContext";

const UsersRoutes = (props) => {
  //checking for using token is session storage
  const isAuth = !sessionStorage.getItem("token") ? (
    <UserContextProvider>
      <Route {...props} />
    </UserContextProvider>
  ) : (
    <Redirect to="/signin" />
  );

  return <div>{isAuth}</div>;
};
export default UsersRoutes;
