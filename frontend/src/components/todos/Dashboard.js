import React, { Fragment } from "react";
import TodosForm from "./TodosForm";
import Todos from "./Todos";

export default function Dashboard() {
  return (
    <Fragment>
      <TodosForm />
      <Todos />
    </Fragment>
  );
}
