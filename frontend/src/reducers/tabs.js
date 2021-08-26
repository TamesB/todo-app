import {
  GET_TABS,
  DELETE_TAB,
  ADD_TAB,
  ADD_TAB_LOADING,
  ADD_TAB_FAIL,
  CHANGE_TABS,
} from "../actions/types.js";

const initialState = {
  tabs: [],
  addTabLoading: false,
  activeTab: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TABS:
      return {
        ...state,
        tabs: action.payload,
        activeTab: action.payload[0].id,
      };
    case CHANGE_TABS:
      return {
        ...state,
        activeTab: action.payload,
      };
    case DELETE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== action.payload),
        activeTab: state.tabs[-1].id,
      };
    case ADD_TAB_LOADING:
      return {
        ...state,
        addTabLoading: true,
      };
    case ADD_TAB_FAIL:
      return {
        ...state,
        addTabLoading: false,
      };
    case ADD_TAB:
      return {
        ...state,
        tabs: [...state.tabs, action.payload],
        addTabLoading: false,
        activeTab: action.payload.id,
      };
    default:
      return state;
  }
}
