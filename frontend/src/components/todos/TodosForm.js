import React, { Component, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addTodo, deleteTodo, toggleCompleteTodo } from "../../actions/todos";
import { addTodoLoading } from "../../reducers/todos";
import { addTab, getTabs } from "../../actions/tabs";
import { Fragment } from "react/cjs/react.production.min";
import { Header, Form, Button, Label, Modal } from "semantic-ui-react";

export function TodosForm(props) {
  const [message, setMessage] = useState("");
  const [tab, setTabName] = useState("");
  const [openTabModal, setOpenTabModal] = useState(false);
  const [openAddTODOModal, setOpenAddTODOModal] = useState(false);

  const onChangeMessage = (e) => setMessage(e.target.value);
  const onChangeTab = (e) => setTabName(e.target.value);

  useEffect(() => {
    props.getTabs(props.user.id);
  }, []);

  const onMessageSubmit = (e) => {
    e.preventDefault();
    const todo = { message: message, tab: props.activeTab };
    props.addTodo(todo);
    setMessage("");
    setOpenAddTODOModal(false);
  };

  const onTabSubmit = (e) => {
    e.preventDefault();
    const tabname = { tab };
    props.addTab(tabname);
    setTabName("");
    setOpenTabModal(false);
  };

  return (
    <Fragment>
      <Button.Group floated="left">
        {props.activeTab !== 0 && (
          <>
            <Button positive onClick={() => setOpenAddTODOModal(true)}>
              Add Todo
            </Button>
            <Modal
              as={Form}
              onClose={() => {
                setOpenAddTODOModal(false);
              }}
              open={openAddTODOModal}
              onSubmit={onMessageSubmit}
            >
              <Modal.Header>Add TODO</Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <Form.Input
                    type="message"
                    name="message"
                    placeholder="Take trash out..."
                    label=""
                    onChange={onChangeMessage}
                    value={message}
                  />
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button
                  content="Add"
                  labelPosition="right"
                  icon="checkmark"
                  type="Submit"
                  positive
                  loading={props.addTodoLoading}
                />
              </Modal.Actions>
            </Modal>
          </>
        )}
      </Button.Group>
      <Button.Group floated="right">
        <Button
          positive
          onClick={() => {
            setOpenTabModal(true);
          }}
        >
          Add List
        </Button>
      </Button.Group>
      <Modal
        as={Form}
        onClose={() => setOpenTabModal(false)}
        open={openTabModal}
        onSubmit={onTabSubmit}
      >
        <Modal.Header>Add List</Modal.Header>
        <Modal.Content>
          <Modal.Description>
            <Form.Input
              type="tab"
              name="tab"
              placeholder="Household..."
              label=""
              onChange={onChangeTab}
              value={tab}
            />{" "}
          </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
          <Button
            content="Add"
            labelPosition="right"
            icon="checkmark"
            type="Submit"
            positive
            loading={props.addTabLoading}
          />
        </Modal.Actions>
      </Modal>
    </Fragment>
  );
}

TodosForm.propTypes = {
  addTodo: PropTypes.func.isRequired,
  addTab: PropTypes.func.isRequired,
  activeTab: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  addTodoLoading: state.todos.addTodoLoading,
  addTabLoading: state.tabs.addTabLoading,
  activeTab: state.tabs.activeTab,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  addTodo,
  addTab,
  getTabs,
  deleteTodo,
  toggleCompleteTodo,
})(TodosForm);
