import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UsersRoutes from "./Routes/UsersRoute";
import Registration from "./Pages/ClientRegistration/SignUp";

import SignInForm from "./Pages/ClientRegistration/SignIn";
import AdminRegistration from "./Pages/AdminRegistration/SignUp";
import AdminSignIn from "./Pages/AdminRegistration/SignIn";
import UserDashboard from "./Pages/userDashboard/UserDashboard";

const App = () => {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" component={Registration} exact />
          <Route path="/login" component={SignInForm} exact />
          <Route path="/signup" component={Registration} exact />
          <Route path="/admin/signup" component={AdminRegistration} exact />
          <Route path="/admin/login" component={AdminSignIn} exact />
          <UsersRoutes path="/dashboard" component={UserDashboard} exact />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
