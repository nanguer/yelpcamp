import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser } from "../../actions/user";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UserLogin = ({ auth, loginUser, ...props }) => {
  const [state, setState] = useState({
    username: "",
    password: "",
    errors: {},
  });
  const { isAuthenticated } = auth;
  useEffect(() => {
    setState((state) => ({ ...state, errors: props.errors }));
  }, [props.errors]);

  useEffect(() => {
    console.log(state.errors);
  }, [state.errors]);

  useEffect(() => {
    if (isAuthenticated) {
      props.history.push("/");
    }
  });

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
  const { errors } = state;
  return (
    <div className="form-container">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            onChange={handleInputChange}
            value={state.username}
            className={classnames("form-control", {
              "is-invalid": errors.username,
            })}
          />
          {errors.username && (
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleInputChange}
            value={state.password}
            className={classnames("form-control", {
              "is-invalid": errors.password,
            })}
          />
          {errors.password && (
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign In!
        </Button>
      </Form>
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
