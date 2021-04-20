import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// Components
import NotFound from "../components/layout/NotFound";
import Landing from "../components/layout/Landing";
import Alert from "../components/layout/Alert";
import PrivateRoute from "./PrivateRoute";
//Pages
import Register from "../pages/auth/Register.tsx";
import Login from "../pages/auth/Login.tsx";
import ForgotPassword from "../pages/auth/ForgotPassword.tsx";
import ResetPassword from "../pages/auth/ResetPassword.tsx";
import Dashboard from "../pages/dashboard/Dashboard.tsx";
import OrganizationForm from "../pages/dashboard/OrganizationForm.tsx";
import Clients from "../pages/clients/Clients.tsx";
import Projects from "../pages/projects/Projects.tsx";

const Routes = () => {
  return (
    <section className="container">
      <Alert />
      <Switch>
        <Route exact path="/" component={Register} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot-password" component={ForgotPassword} />
        <Route exact path="/reset-password/:id/:token" component={ResetPassword} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/clients" component={Clients} />
        <PrivateRoute exact path="/projects" component={Projects} />
        <Route component={NotFound} />
      </Switch>
    </section>
  );
};

const MapStateToProps = (state) => {
  return { state: state };
};

export default connect(MapStateToProps)(Routes);
