import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { connect } from "react-redux";
import { logoutUser } from "../actions/user";
import PropTypes from "prop-types";

const Navigation = ({ auth, logoutUser, ...props }) => {
  const { username } = auth.user;
  const { isAuthenticated } = auth;

  const onLogout = (e) => {
    e.preventDefault();
    logoutUser();
  };

  const authLinks = (
    <Nav>
      <Navbar.Text>Welcome {username} </Navbar.Text>
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
        activeClassName="active"
        className="nav-link"
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
      <Navbar.Brand href="#home">YelpCamp</Navbar.Brand>
      <Nav.Link
        as={NavLink}
        eventKey="7"
        exact
        activeClassName="active pull-left"
        to={"/"}
      >
        Home
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Navigation);
