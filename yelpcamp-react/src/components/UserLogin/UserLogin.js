import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import classnames from "classnames";
import { loginUser, clearErrors } from "../../actions/user";
import { toggleLogin } from "../../actions/modals";
import { useToasts } from "react-toast-notifications";
import useForm from "../Hooks/useForm";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UserLogin = ({
  show,
  auth,
  clearErrors,
  loginUser,
  dispatch,
  ...props
}) => {
  const initialValues = {
    username: "",
    password: "",
    errors: {},
  };
  const {
    submitError,
    submitting,
    setSubmitting,
    submitData,
    handleInputChange,
    values,
    setValues,
  } = useForm(loginUser, initialValues);

  const { isAuthenticated } = auth;
  const { addToast } = useToasts();

  useEffect(() => {
    if (isAuthenticated) props.history.push("/");
  }, [props.history, isAuthenticated]);

  useEffect(() => {
    if (props.history?.action && props.history.action === "REPLACE") {
      addToast(`Please Login First`, {
        appearance: "error",
        autoDismiss: true,
      });
    }
  }, [props.history, addToast]);

  useEffect(() => {
    setValues((values) => ({ ...values, errors: props.errors }));
  }, [props.errors, setValues]);

  useEffect(() => {
    return clearErrors();
  }, [clearErrors]);

  // useEffect(() => {
  //   console.log(props);
  // }, [props]);

  const handleSubmit = async (e) => {
    setSubmitting(true);
    e.preventDefault();
    const user = {
      username: values.username.toLowerCase(),
      password: values.password,
    };
    const success = await submitData(user);
    if (success === 200) {
      addToast(`Welcome ${user.username}`, {
        appearance: "success",
        autoDismiss: true,
      });
      props.history.push("/");
    }
  };

  const handleCloseModal = () => {
    props.history.goBack();
  };

  const { errors } = values;
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
          <Form onSubmit={(e) => handleSubmit(e, dispatch)}>
            <Form.Group controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={values.username}
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
                value={values.password}
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

            <Button variant="primary" type="submit" disabled={submitting}>
              {submitting ? "Loading..." : "Sign In!"}
            </Button>
          </Form>
        </div>
      </Modal.Body>

      <Modal.Footer>
        {submitting && "Please Wait..."}
        {submitError && "Something Went Wrong, please try again."}
      </Modal.Footer>
    </Modal>
  );
};

UserLogin.propTypes = {
  auth: PropTypes.object,
  loginUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  show: state.modals.showLogin,
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ loginUser, clearErrors, toggleLogin }, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserLogin);
