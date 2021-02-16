import React from "react";
import { Switch } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import ClientPreviewpage from "../Components/AdminComponents/ClientPreviewpage";
import PreviewComment from "../Components/AdminComponents/PreviewComment";

const AdminDashboardRoutes = () => {
  return (
    <Switch>
      <AdminRoutes path="/admin/dashboard" component={AdminDashboard} />
      <AdminRoutes
        path="/admin/preview_user/:userId"
        component={ClientPreviewpage}
      />

      <AdminRoutes
        path="/admin/preview_comment/:postId"
        component={PreviewComment}
      />
    </Switch>
  );
};

export default AdminDashboardRoutes;
