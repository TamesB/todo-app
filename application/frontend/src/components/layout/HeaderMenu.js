import React, { Component, Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
} from "semantic-ui-react";

export function HeaderMenu(props) {
  const [activeItem, setActiveItem] = useState("");

  const handleItemClick = (e, { name }) => {
    setActiveItem(name);
  };

  const authLinks = (
    <>
      <Menu.Item
        as={Link}
        to="/"
        name="home"
        active={activeItem === "home"}
        onClick={handleItemClick}
      >
        Home
      </Menu.Item>
      <Menu.Item
        position="right"
        name="logout"
        active={activeItem === "logout"}
        onClick={() => {
          handleItemClick;
          props.logout();
        }}
      >
        Logout
      </Menu.Item>
    </>
  );

  const guestLinks = (
    <>
      <Menu.Item
        as={Link}
        to="/login"
        name="login"
        active={activeItem === "login"}
        onClick={handleItemClick}
      >
        Login
      </Menu.Item>
      <Menu.Item
        position="right"
        as={Link}
        to="/register"
        name="register"
        active={activeItem === "register"}
        onClick={handleItemClick}
      >
        Register
      </Menu.Item>
    </>
  );

  return (
    <Menu style={{ margin: "0 0 2vh 0" }}>
      <Menu.Item>
        <img src="https://react.semantic-ui.com/logo.png" />
      </Menu.Item>
      {props.auth.isAuthenticated ? authLinks : guestLinks}
    </Menu>
  );
}

HeaderMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(HeaderMenu);
