import React from "react";
import { Switch } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";

const AdminDashboardRoutes = () => {
  return (
    <Switch>
      <AdminRoutes path="/admin/dashboard" component={AdminDashboard} />
    </Switch>
  );
};

export default AdminDashboardRoutes;
