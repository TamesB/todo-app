import React, { Component, Fragment, useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getTabs, changeTab } from "../../actions/tabs";
import { getTodos, deleteTodo, toggleCompleteTodo } from "../../actions/todos";
import { Todos } from "./Todos";
import { Tab } from "semantic-ui-react";
import { CHANGE_TABS } from "../../actions/types";

export function TodoTabs(props) {
  useEffect(() => {
    props.getTabs(props.user.id);
  }, []);

  const paneToId = props.tabs.map((tab) => tab.id);

  const handleTabChange = (e, data) => {
    props.changeTab(paneToId[data.activeIndex]);
    props.getTodos(props.user.id, paneToId[data.activeIndex]);
  };

  const pane = (menuItem, render) => ({
    menuItem: menuItem,
    render: render,
  });

  const panes = props.tabs.map((tab) =>
    pane(tab.tab, () => <Todos {...props} />)
  );

  return (
    <Fragment>
      <Tab panes={panes} onTabChange={handleTabChange} />
    </Fragment>
  );
}

TodoTabs.propTypes = {
  todos: PropTypes.array.isRequired,
  getTodos: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toggleCompleteTodo: PropTypes.func.isRequired,

  changeTab: PropTypes.func.isRequired,
  tabs: PropTypes.array.isRequired,
  activeTab: PropTypes.number.isRequired,
  getTabs: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  todos: state.todos.todos,

  tabs: state.tabs.tabs,
  activeTab: state.tabs.activeTab,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {
  getTabs,
  getTodos,
  deleteTodo,
  toggleCompleteTodo,
  changeTab,
})(TodoTabs);
