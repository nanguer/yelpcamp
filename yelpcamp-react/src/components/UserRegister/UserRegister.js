import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { registerUser, clearErrors } from '../../actions/user';
import classnames from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import useForm from '../Hooks/useForm';

import PropTypes from 'prop-types';

const UserRegister = ({ registerUser, clearErrors, ...props }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    errors: {},
  });

  useEffect(() => {
    setState((state) => ({ ...state, errors: props.errors }));
  }, [props.errors]);

  useEffect(() => {
    return clearErrors();
  }, [clearErrors]);

  const { submitError, submitting, setSubmitting, submitData } = useForm(
    registerUser
  );

  const handleInputChange = (e) => {
    clearErrors();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const user = {
      username: state.username.toLowerCase(),
      email: state.email.toLowerCase(),
      password: state.password,
      password_confirm: state.password_confirm,
    };

    submitData(user);
  };
  const handleCloseModal = () => {
    props.history.goBack();
  };

  const { errors } = state;

  return (
    <Modal
      dialogClassName="modal-login"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={true}
      onHide={() => handleCloseModal()}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Login To YelpCamp!
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
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
                className={classnames('form-control', {
                  'is-invalid': errors.username,
                })}
              />
              {errors.username && (
                <Form.Control.Feedback type="invalid">
                  <span className="error-feedback">{errors.username}</span>
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Email"
                name="email"
                onChange={handleInputChange}
                value={state.email}
                className={classnames('form-control', {
                  'is-invalid': errors.email,
                })}
              />
              {errors.email && (
                <Form.Control.Feedback type="invalid">
                  <span className="error-feedback">{errors.email}</span>
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
                className={classnames('form-control', {
                  'is-invalid': errors.password,
                })}
              />
              {errors.password && (
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <Form.Group controlId="formBasicPasswordConfirm">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                name="password_confirm"
                onChange={handleInputChange}
                value={state.password_confirm}
                className={classnames('form-control', {
                  'is-invalid': errors.password_confirm,
                })}
              />
              {errors.password_confirm && (
                <Form.Control.Feedback type="invalid">
                  {errors.password_confirm}
                </Form.Control.Feedback>
              )}
            </Form.Group>
            <div>
              <Button variant="primary" type="submit" disabled={submitting}>
                {submitting ? 'Loading...' : 'Sign Up!'}
              </Button>
            </div>
          </Form>
        </div>
      </Modal.Body>
      <Modal.Footer>
        {submitting && 'Please Wait...'}
        {submitError && 'Something Went Wrong, please try again.'}
      </Modal.Footer>
    </Modal>
  );
};

UserRegister.propTypes = {
  auth: PropTypes.object,
  errors: PropTypes.object,
  registerUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser, clearErrors })(
  UserRegister
);
