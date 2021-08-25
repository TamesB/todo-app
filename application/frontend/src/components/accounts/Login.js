import React, { Component, useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import {
  Button,
  Divider,
  Form,
  Grid,
  Segment,
  Header,
} from "semantic-ui-react";
import MediaQuery from "react-responsive";
import { Fragment } from "react/cjs/react.production.min";
import { useDidMountEffect } from "../../customhooks/useDidMountEffect.js";

export function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userLoading, setUserLoading] = useState(false);

  const onChangeUser = (e) => {
    setUsername(e.target.value);
  };

  const onChangePass = (e) => {
    setPassword(e.target.value);
  };

  useDidMountEffect(() => {
    props.login(username, password);
  }, [userLoading]);

  if (props.isAuthenticated) return <Redirect to="/" />;

  return (
    <>
      <Grid
        columns={2}
        relaxed="very"
        stackable
        verticalAlign="middle"
        textAlign="center"
        style={{ height: "90vh" }}
      >
        <Grid.Column style={{ padding: "0 15vw 0 15vw" }}>
          <Form onSubmit={() => setUserLoading(true)}>
            <Form.Input
              icon="user"
              iconPosition="left"
              label="Username"
              placeholder="Username"
              name="username"
              onChange={onChangeUser}
              value={username}
            />
            <Form.Input
              icon="lock"
              iconPosition="left"
              label="Password"
              name="password"
              type="password"
              onChange={onChangePass}
              value={password}
            />

            {userLoading ? (
              <Button type="submit" content="Login" loading primary />
            ) : (
              <Button type="submit" content="Login" primary />
            )}
          </Form>
        </Grid.Column>

        <MediaQuery maxWidth={768}>
          <Divider horizontal verticalAlign="middle">
            Or
          </Divider>
        </MediaQuery>

        <Grid.Column verticalAlign="middle" style={{ padding: "15vw" }}>
          <Button
            as={Link}
            to="/register"
            content="Sign up"
            icon="signup"
            size="big"
          />
        </Grid.Column>
      </Grid>

      <MediaQuery minWidth={768}>
        <Divider vertical>Or</Divider>
      </MediaQuery>
    </>
  );
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
