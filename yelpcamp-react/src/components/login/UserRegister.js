import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/user";
import Button from "react-bootstrap/Button";

import PropTypes from "prop-types";

const UserRegister = ({ auth, registerUser, ...props }) => {
  // const { isAuthenticated } = auth;

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    password_confirm: "",
    errors: {},
  });

  //   useEffect(() => {
  //     setState({ ...state, errors: {} });
  //   }, [state]);

  // useEffect(() => {
  //   if (isAuthenticated) {
  //     props.history.push("/userEvents");
  //   }
  // });

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
      email: state.email,
      password: state.password,
      password_confirm: state.password_confirm,
    };

    registerUser(user);
  };

  // const onSignUp = () => {
  //   props.history.push("/addUser");
  // };

  // const { errors } = state;

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
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleInputChange}
            value={state.email}
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
          <input
            type="password"
            placeholder="Confirm password"
            name="password_confirm"
            onChange={handleInputChange}
            value={state.password_confirm}
          />
        </div>
        <div>
          <Button variant="primary" type="submit">
            Sign Up!
          </Button>
        </div>
      </form>
    </div>
  );
};

UserRegister.propTypes = {
  auth: PropTypes.object,
  errors: PropTypes.object,
  registerUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(UserRegister);
