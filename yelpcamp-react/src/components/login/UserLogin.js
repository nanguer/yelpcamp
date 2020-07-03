import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/user";

import Button from "react-bootstrap/Button";

const UserLogin = ({ auth, loginUser, ...props }) => {
  const [state, setState] = useState({ username: "", password: "" });

  useEffect(() => {
    setState((state) => ({ ...state, errors: props.errors }));
  }, [props.errors]);

  const handleInputChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      username: state.username,
      password: state.password,
    };
    loginUser(user);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={state.username}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={handleInputChange}
            value={state.password}
          />
        </div>
        <div>
          <Button variant="primary" type="submit">
            Sign In!
          </Button>
        </div>
      </form>
    </div>
  );
};

UserLogin.propTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  auth: state.auth,
});

export default connect(mapStateToProps, { loginUser })(UserLogin);
