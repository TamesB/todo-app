import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  COMPLETE_TODO,
  ADD_TODO_LOADING,
  ADD_TODO_FAIL,
} from "./types";
import { tokenConfig } from "./auth";

// GET TODOS
export const getTodos = (user_id, activeTab) => (dispatch, getState) => {
  axios
    .get(`/api/todos/?owner=${user_id}&tab=${activeTab}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TODOS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE TODO
export const deleteTodo = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/todos/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteTodo: "TODO Deleted" }));
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD TODO
export const addTodo = (todo) => (dispatch, getState) => {
  dispatch({ type: ADD_TODO_LOADING });

  if (todo.message === "") {
    dispatch(createMessage({ fieldError: "Fill in required fields" }));

    return dispatch({ type: ADD_TODO_FAIL });
  }
  console.log(todo);
  axios
    .post(`/api/todos/`, todo, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addTodo: "TODO Added" }));
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_TODO_FAIL });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

// TOGGLE TODO
export const toggleCompleteTodo = (id, complete) => (dispatch, getState) => {
  axios
    .put(`/api/todos/${id}/`, { complete: complete }, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: COMPLETE_TODO,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};
