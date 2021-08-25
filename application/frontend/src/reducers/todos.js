import {
  GET_TODOS,
  DELETE_TODO,
  ADD_TODO,
  COMPLETE_TODO,
  ADD_TODO_LOADING,
  ADD_TODO_FAIL,
} from "../actions/types.js";

const initialState = {
  todos: [],
  addTodoLoading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };
    case COMPLETE_TODO:
      return {
        ...state,
        // This time, we need to make a copy of the old todos array
        todos: state.todos.map((todo) => {
          // If this isn't the todo item we're looking for, leave it alone
          if (todo.id !== action.payload) {
            return todo;
          }

          // We've found the todo that has to change. Return a copy:
          return {
            ...todo,
            complete: !todo.complete,
          };
        }),
      };
    case ADD_TODO_LOADING:
      return {
        ...state,
        addTodoLoading: true,
      };
    case ADD_TODO_FAIL:
      return {
        ...state,
        addTodoLoading: false,
      };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        addTodoLoading: false,
      };
    default:
      return state;
  }
}
