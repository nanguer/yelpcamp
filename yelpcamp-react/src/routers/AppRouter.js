import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import Routes from "./routes";
import ModalRoutes from "./ModalRoute";
import { connect } from "react-redux";
import Navigation from "../components/Navigation/Navigation";

const AppRouter = () => {
  return (
    <Router>
      <Navigation />
      <ModalRoutes />
      <Switch>
        <Routes />
      </Switch>
    </Router>
  );
};

const mapStateToProps = (state) => ({
  showLogin: state.modals.showLogin,
  showNewCamp: state.modals.showNewCamp,
});

export default connect(mapStateToProps)(AppRouter);
