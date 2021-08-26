import axios from "axios";
import { createMessage, returnErrors } from "./messages";
import {
  GET_TABS,
  DELETE_TAB,
  ADD_TAB,
  ADD_TAB_LOADING,
  ADD_TAB_FAIL,
  CHANGE_TABS,
} from "./types";
import { tokenConfig } from "./auth";

// GET TABS
export const getTabs = (user_id) => (dispatch, getState) => {
  axios
    .get(`/api/tabs/?owner=${user_id}`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_TABS,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// DELETE TAB
export const deleteTab = (id) => (dispatch, getState) => {
  axios
    .delete(`/api/tabs/${id}/`, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ deleteTab: "TAB Deleted" }));
      dispatch({
        type: DELETE_TAB,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// ADD TAB
export const addTab = (tab) => (dispatch, getState) => {
  dispatch({ type: ADD_TAB_LOADING });

  if (tab.tab === "") {
    dispatch(createMessage({ fieldError: "Fill in required fields" }));

    return dispatch({ type: ADD_TAB_FAIL });
  }

  axios
    .post(`/api/tabs/`, tab, tokenConfig(getState))
    .then((res) => {
      dispatch(createMessage({ addTab: "TAB Added" }));
      dispatch({
        type: ADD_TAB,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({ type: ADD_TAB_FAIL });
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const changeTab = (tab_id) => (dispatch, getState) => {
  dispatch({ type: CHANGE_TABS, payload: tab_id });
};
