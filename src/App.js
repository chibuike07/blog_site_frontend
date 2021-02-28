import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersRoutes from "./Routes/UsersRoute";
import Registration from "./Pages/ClientRegistration/SignUp";

import SignInForm from "./Pages/ClientRegistration/SignIn";
import AdminRegistration from "./Pages/AdminRegistration/SignUp";
import AdminSignIn from "./Pages/AdminRegistration/SignIn";
import UserDashboard from "./Pages/userDashboard/UserDashboard";
import AdminDashboardRoutes from "./Routes/AdminDashboardRoutes";
import ResetPassword from "./Components/Clients/ClientSignUp/ResetPassword";
import LoginFromMail from "./Components/Clients/ClientSignUp/LoginFromMail";
import ClientPreviewComment from "./Components/Clients/ClientPreviewComment/ClientPreviewComment";
import AdminLoginFromMail from "./Components/AdminComponents/AdminLoginFromMail";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Registration} exact />
          <Route path="/signup" component={Registration} exact />
          <Route path="/login" component={SignInForm} exact />
          <Route
            path="/reset_password/:token"
            component={ResetPassword}
            exact
          />
          <Route
            path="/user/:email/:password"
            component={LoginFromMail}
            exact
          />
          <Route
            path="/super/:email/:password"
            component={AdminLoginFromMail}
            exact
          />
          <Route path="/admin/signup" component={AdminRegistration} exact />
          <Route path="/admin/login" component={AdminSignIn} exact />
          <UsersRoutes path="/dashboard" component={UserDashboard} exact />
          <UsersRoutes
            path="/preview_comment/:postId"
            component={ClientPreviewComment}
          />
          <AdminDashboardRoutes />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
