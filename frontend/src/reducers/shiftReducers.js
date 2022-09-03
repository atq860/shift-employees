import {
  SHIFT_CREATE_FAIL,
  SHIFT_CREATE_REQUEST,
  SHIFT_CREATE_RESET,
  SHIFT_CREATE_SUCCESS,
  SHIFT_DETAILS_FAIL,
  SHIFT_DETAILS_REQUEST,
  SHIFT_DETAILS_RESET,
  SHIFT_DETAILS_SUCCESS,
  SHIFT_LIST_FAIL,
  SHIFT_LIST_MY_FAIL,
  SHIFT_LIST_MY_REQUEST,
  SHIFT_LIST_MY_RESET,
  SHIFT_LIST_MY_SUCCESS,
  SHIFT_LIST_REQUEST,
  SHIFT_LIST_RESET,
  SHIFT_LIST_SUCCESS,
  SHIFT_SWITCH_FAIL,
  SHIFT_SWITCH_REQUEST,
  SHIFT_SWITCH_RESET,
  SHIFT_SWITCH_SUCCESS,
  SHIFT_UPDATE_FAIL,
  SHIFT_UPDATE_REQUEST,
  SHIFT_UPDATE_RESET,
  SHIFT_UPDATE_SUCCESS,
} from "../constants/shiftConstants";

export const shiftCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SHIFT_CREATE_REQUEST:
      return { loading: true };
    case SHIFT_CREATE_SUCCESS:
      return { loading: false, success: true, shift: action.payload };
    case SHIFT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const shiftListReducer = (state = { shifts: [] }, action) => {
  switch (action.type) {
    case SHIFT_LIST_REQUEST:
      return { loading: true };
    case SHIFT_LIST_SUCCESS:
      return { loading: false, shifts: action.payload };
    case SHIFT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_LIST_RESET:
      return {
        shifts: [],
      };
    default:
      return state;
  }
};

export const shiftListMyReducer = (state = { myShifts: [] }, action) => {
  switch (action.type) {
    case SHIFT_LIST_MY_REQUEST:
      return { loading: true };
    case SHIFT_LIST_MY_SUCCESS:
      return { loading: false, myShifts: action.payload };
    case SHIFT_LIST_MY_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_LIST_MY_RESET:
      return {
        myShifts: [],
      };
    default:
      return state;
  }
};

export const shiftDetailsReducer = (state = { shift: {} }, action) => {
  switch (action.type) {
    case SHIFT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case SHIFT_DETAILS_SUCCESS:
      return { loading: false, shift: action.payload };
    case SHIFT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_DETAILS_RESET:
      return { shift: {} };
    default:
      return state;
  }
};

export const shiftUpdateReducer = (state = { shift: {} }, action) => {
  switch (action.type) {
    case SHIFT_UPDATE_REQUEST:
      return { loading: true };
    case SHIFT_UPDATE_SUCCESS:
      return { loading: false, success: true, shift: action.payload };
    case SHIFT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_UPDATE_RESET:
      return {
        shift: {},
      };
    default:
      return state;
  }
};

export const shiftSwitchReducer = (state = { shift: {} }, action) => {
  switch (action.type) {
    case SHIFT_SWITCH_REQUEST:
      return { loading: true };
    case SHIFT_SWITCH_SUCCESS:
      return { loading: false, success: true, shift: action.payload };
    case SHIFT_SWITCH_FAIL:
      return { loading: false, error: action.payload };
    case SHIFT_SWITCH_RESET:
      return {
        shift: {},
      };
    default:
      return state;
  }
};
