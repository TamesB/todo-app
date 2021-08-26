import React, { Fragment } from "react";
import TodosForm from "./TodosForm";
import Todos from "./Todos";
import TodoTabs from "./TodoTabs";

export default function Dashboard() {
  return (
    <Fragment>
      <TodosForm />
      <TodoTabs />
    </Fragment>
  );
}
