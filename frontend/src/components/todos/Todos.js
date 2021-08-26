import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTodos, deleteTodo, toggleCompleteTodo } from "../../actions/todos";
import { Header, Table, Button, Icon, Tab } from "semantic-ui-react";

export function Todos(props) {
  useEffect(() => {
    props.getTodos(props.user.id, props.activeTab);
  }, []);

  const onCompleteTodo = (todo) => {
    props.toggleCompleteTodo(todo.id, !todo.complete);
  };

  return (
    <>
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>TODO</Table.HeaderCell>
            <Table.HeaderCell>Created at</Table.HeaderCell>
            <Table.HeaderCell>&nbsp;</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {props.todos.map((todo) => (
            <Table.Row
              key={todo.id}
              positive={todo.complete}
              onClick={() => onCompleteTodo(todo)}
            >
              <Table.Cell>
                {todo.complete && <Icon name="checkmark" />} {todo.message}
              </Table.Cell>
              <Table.Cell>
                {todo.created_at.split("T")[0]},{" "}
                {todo.created_at.split("T")[1].split(".")[0]}
              </Table.Cell>
              <Table.Cell>
                <Button
                  floated="right"
                  onClick={props.deleteTodo.bind(this, todo.id)}
                  color="red"
                  icon
                >
                  <Icon name="trash alternate" />
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

Todos.propTypes = {
  todos: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  getTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,
  activeTab: state.tabs.activeTab,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getTodos,
  deleteTodo,
  toggleCompleteTodo,
})(Todos);
