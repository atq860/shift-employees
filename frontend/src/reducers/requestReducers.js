import {
  REQUEST_ACCEPT_FAIL,
  REQUEST_ACCEPT_REQUEST,
  REQUEST_ACCEPT_RESET,
  REQUEST_ACCEPT_SUCCESS,
  REQUEST_CREATE_FAIL,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_RESET,
  REQUEST_CREATE_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_RESET,
  REQUEST_LIST_SUCCESS,
} from "../constants/requestConstants";

export const requestCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_CREATE_REQUEST:
      return { loading: true };
    case REQUEST_CREATE_SUCCESS:
      return { loading: false, success: true, request: action.payload };
    case REQUEST_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const requestListReducer = (state = { requests: [] }, action) => {
  switch (action.type) {
    case REQUEST_LIST_REQUEST:
      return { loading: true };
    case REQUEST_LIST_SUCCESS:
      return { loading: false, requests: action.payload };
    case REQUEST_LIST_FAIL:
      return { loading: false, error: action.payload };
    case REQUEST_LIST_RESET:
      return {
        requests: [],
      };
    default:
      return state;
  }
};

export const requestAcceptReducer = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_ACCEPT_REQUEST:
      return {
        loading: true,
      };

    case REQUEST_ACCEPT_SUCCESS:
      return {
        loading: false,
        success: true,
      };

    case REQUEST_ACCEPT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REQUEST_ACCEPT_RESET:
      return {};

    default:
      return state;
  }
};
