import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo } from "../../actions/todos";
import { addTodoLoading } from "../../reducers/todos";
import { Fragment } from "react/cjs/react.production.min";
import { Header, Form, Button, Label } from "semantic-ui-react";

export function TodosForm(props) {
  const [message, setMessage] = useState("");

  const onChange = (e) => setMessage(e.target.value);

  const onSubmit = (e) => {
    e.preventDefault();
    const todo = { message };
    props.addTodo(todo);
    setMessage("");
  };

  const form_padding = {
    padding: "0 10vw 0 10vw",
  };
  return (
    <Fragment>
      <div style={form_padding}>
        <Header as="h2">Add TODO</Header>
        <Form onSubmit={onSubmit}>
          <Form.Input
            type="message"
            name="message"
            label=""
            onChange={onChange}
            value={message}
          />
          <Button type="submit" primary loading={props.addTodoLoading}>
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
}

TodosForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  addTodoLoading: state.todos.addTodoLoading,
});

export default connect(mapStateToProps, { addTodo })(TodosForm);
