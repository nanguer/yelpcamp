import React from "react";

import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const SecuredRoute = ({ isAuthenticated, path, Component }) => {
  return (
    <Route
      path={path}
      render={(data) =>
        isAuthenticated ? (
          <Component {...data} />
        ) : (
          <Redirect to={{ pathname: "/login" }} />
        )
      }
    ></Route>
  );
};

SecuredRoute.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(SecuredRoute);
