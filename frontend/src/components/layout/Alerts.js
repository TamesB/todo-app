import React, { Component, Fragment, useEffect } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { usePrevious } from "../../customhooks/usePrevious.js";

export function Alerts(props) {
  const { alert, error, message } = props;
  const prevProps = usePrevious({ error, message });

  // if component did get props from state (in this case, if props have changed)
  useEffect(() => {
    if (error !== prevProps?.error) {
      if (error.msg.name) {
        alert.error(`Name: ${error.msg.name.join()}`);
      }
      if (error.msg.email) {
        alert.error(`Email: ${error.msg.email.join()}`);
      }
      if (error.msg.message) {
        alert.error(`Message: ${error.msg.message.join()}`);
      }
      if (error.msg.non_field_errors) {
        alert.error(error.msg.non_field_errors.join());
      }
    }

    if (message !== prevProps?.message) {
      if (message.deleteTodo) {
        alert.success(message.deleteTodo);
      }
      if (message.addTodo) {
        alert.success(message.addTodo);
      }
      if (message.fieldError) {
        alert.error(message.fieldError);
      }
      if (message.passwordsNotMatch) {
        alert.error(message.passwordsNotMatch);
      }
    }
  });

  return <Fragment />;
}

// required prop for this component
Alerts.propTypes = {
  error: PropTypes.object.isRequired,
  message: PropTypes.object.isRequired,
};

// Make a state with error and message
const mapStateToProps = (state) => ({
  error: state.errors,
  message: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
