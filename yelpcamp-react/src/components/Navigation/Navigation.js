import React from 'react';
import { bindActionCreators } from 'redux';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/user';
import { toggleLogin } from '../../actions/modals';
import { useToasts } from 'react-toast-notifications';
import PropTypes from 'prop-types';

const Navigation = ({ auth, logoutUser }) => {
  const { username } = auth.user;
  const { isAuthenticated } = auth;
  const { addToast } = useToasts();
  // useEffect(() => {
  //   toggleLogin();
  // }, []);

  const onLogout = (e) => {
    e.preventDefault();
    logoutUser();
    addToast(`Logged out`, {
      appearance: 'info',
      autoDismiss: true,
    });
  };

  const authLinks = (
    <Nav>
      <Navbar.Text className="username">Welcome {username} </Navbar.Text>
      <Nav.Link href="#" eventKey="3" onClick={onLogout}>
        Logout
      </Nav.Link>
    </Nav>
  );

  const guestLinks = (
    <Nav>
      <Nav.Link
        className="nav-link"
        activeClassName="active"
        eventKey="5"
        as={NavLink}
        to="/register"
      >
        Register
      </Nav.Link>
      <Nav.Link
        className="nav-link"
        activeClassName="active"
        eventKey="6"
        as={NavLink}
        to="/login"
      >
        Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar collapseOnSelect bg="light" variant="light">
      <Nav.Link
        as={NavLink}
        eventKey="7"
        exact
        activeClassName="active pull-left"
        to={'/'}
      >
        YelpCamp
      </Nav.Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          {!isAuthenticated && guestLinks}
          {isAuthenticated && authLinks}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

Navigation.propTypes = {
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
  showLoginForm: PropTypes.func,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});
const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    ...bindActionCreators({ logoutUser, toggleLogin }, dispatch),
  };
};
// const mapDispatchToProps = (dispatch) => ({
//   showLoginForm: () => dispatch({ type: TOGGLE_LOGIN }),
//   logoutUser: () => logoutUser(),
// });

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
