import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersRoutes from "./Routes/UsersRoute";
import Registration from "./Pages/ClientRegistration/SignUp";
import AdminRoutes from "./Routes/AdminRoutes";
import SignInForm from "./Pages/ClientRegistration/SignIn";
import AdminDashboardRoutes from "./Routes/AdminDashboardRoutes";
import AdminRegistration from "./Pages/AdminRegistration/SignUp";
import AdminSignIn from "./Pages/AdminRegistration/SignIn";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <UsersRoutes path="/" component={Registration} exact />
          <UsersRoutes path="/signup" component={Registration} exact />
          <UsersRoutes path="/login" component={SignInForm} exact />
          <AdminRoutes
            path="/admin/signup"
            component={AdminRegistration}
            exact
          />
          <AdminRoutes path="/admin/login" component={AdminSignIn} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
