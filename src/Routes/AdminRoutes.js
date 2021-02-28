import React from "react";
import { Route, Redirect } from "react-router-dom";
import { AdminContextProvider } from "../Context_files/AdminContext";

const AdminRoutes = (props) => {
  //checking for using token is session storage
  const isAuth =
    sessionStorage.getItem("admin") !== null ? (
      <AdminContextProvider>
        <Route {...props} />
      </AdminContextProvider>
    ) : (
      <Redirect to="/admin/signup" />
    );

  return <div>{isAuth}</div>;
};
export default AdminRoutes;
