import React, { Component, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import { Fragment } from "react/cjs/react.production.min";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";
import { useDidMountEffect } from "../../customhooks/useDidMountEffect.js";

export function Register(props) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  // Logic after form submitted (also do check-logic here)
  const onSubmit = () => {
    if (!username) {
      props.createMessage({ passwordsNotMatch: "Fill in username." });
    } else if (!password) {
      props.createMessage({ passwordsNotMatch: "Choose a password." });
    } else if (password !== password2) {
      props.createMessage({ passwordsNotMatch: "Passwords do not match." });
    } else if (!email) {
      props.createMessage({ passwordsNotMatch: "Fill in an email." });
    } else {
      // make account
      const newUser = {
        username,
        password,
        email,
      };

      props.register(newUser);
    }
  };

  // Allows input
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangePassword2 = (e) => {
    setPassword2(e.target.value);
  };

  if (props.isAuthenticated) {
    return <Redirect to="/" />;
  }
  return (
    <Fragment>
      <Header as="h2">Register</Header>
      <Form onSubmit={onSubmit}>
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username"
          name="username"
          onChange={onChangeUsername}
          value={username}
        />
        <Form.Input
          icon="mail"
          iconPosition="left"
          label="Email"
          placeholder="E-mail"
          name="email"
          type="email"
          onChange={onChangeEmail}
          value={email}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Password"
          name="password"
          type="password"
          onChange={onChangePassword}
          value={password}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Password"
          name="password2"
          type="password"
          onChange={onChangePassword2}
          value={password2}
        />

        <Button
          type="submit"
          content="Register"
          loading={props.userIsLoading}
          primary
        />
      </Form>
    </Fragment>
  );
}

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  userIsLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userIsLoading: state.auth.userIsLoading,
});

export default connect(mapStateToProps, { register, createMessage })(Register);
