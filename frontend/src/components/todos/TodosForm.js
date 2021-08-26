import React, { Component, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo, deleteTodo, toggleCompleteTodo } from "../../actions/todos";
import { addTodoLoading } from "../../reducers/todos";
import { addTab } from "../../actions/tabs";
import { Fragment } from "react/cjs/react.production.min";
import { Header, Form, Button, Label } from "semantic-ui-react";

export function TodosForm(props) {
  const [message, setMessage] = useState("");
  const [tab, setTabName] = useState("");

  const onChangeMessage = (e) => setMessage(e.target.value);
  const onChangeTab = (e) => setTabName(e.target.value);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const todo = { message: message, tab: props.activeTab };
    props.addTodo(todo);
    setMessage("");
  };

  const onTabSubmit = (e) => {
    e.preventDefault();
    const tabname = { tab };
    props.addTab(tabname);
    setTabName("");
  };

  const form_padding = {
    padding: "0 10vw 3vh 10vw",
  };

  return (
    <Fragment>
      <div style={form_padding}>
        {props.activeTab && (
          <>
            <Header as="h2">Add TODO</Header>
            <Form onSubmit={onMessageSubmit}>
              <Form.Input
                type="message"
                name="message"
                label=""
                onChange={onChangeMessage}
                value={message}
              />
              <Button type="submit" primary loading={props.addTodoLoading}>
                Submit
              </Button>
            </Form>
          </>
        )}
        <Header as="h2">Add Tab</Header>
        <Form onSubmit={onTabSubmit}>
          <Form.Input
            type="tab"
            name="tab"
            label=""
            onChange={onChangeTab}
            value={tab}
          />
          <Button type="submit" primary loading={props.addTabLoading}>
            Submit
          </Button>
        </Form>
      </div>
    </Fragment>
  );
}

TodosForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  addTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  addTodoLoading: state.todos.addTodoLoading,
  addTabLoading: state.tabs.addTabLoading,
  activeTab: state.tabs.activeTab,
});

export default connect(mapStateToProps, {
  addTodo,
  addTab,
  deleteTodo,
  toggleCompleteTodo,
})(TodosForm);
