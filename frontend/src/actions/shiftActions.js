import axios from "axios";
import {
  SHIFT_CREATE_FAIL,
  SHIFT_CREATE_REQUEST,
  SHIFT_CREATE_SUCCESS,
  SHIFT_DETAILS_FAIL,
  SHIFT_DETAILS_REQUEST,
  SHIFT_DETAILS_SUCCESS,
  SHIFT_LIST_FAIL,
  SHIFT_LIST_MY_FAIL,
  SHIFT_LIST_MY_REQUEST,
  SHIFT_LIST_MY_SUCCESS,
  SHIFT_LIST_REQUEST,
  SHIFT_LIST_SUCCESS,
  SHIFT_SWITCH_FAIL,
  SHIFT_SWITCH_REQUEST,
  SHIFT_SWITCH_SUCCESS,
  SHIFT_UPDATE_FAIL,
  SHIFT_UPDATE_REQUEST,
  SHIFT_UPDATE_SUCCESS,
} from "../constants/shiftConstants";

export const createShift = (shift) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIFT_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/shifts`, shift, config);

    dispatch({
      type: SHIFT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIFT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listShifts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIFT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/shifts`, config);

    dispatch({
      type: SHIFT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIFT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyShifts = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIFT_LIST_MY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/shifts/myAllShifts`, config);

    dispatch({
      type: SHIFT_LIST_MY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIFT_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getShiftDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIFT_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/shifts/${id}`, config);

    dispatch({
      type: SHIFT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIFT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateShift = (shift) => async (dispatch, getState) => {
  try {
    dispatch({
      type: SHIFT_UPDATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/shifts/${shift._id}`, shift, config);

    dispatch({
      type: SHIFT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SHIFT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const switchShift =
  (employeeId, shiftDay) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHIFT_SWITCH_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/shifts/switch`,
        { employeeId, shiftDay },
        config
      );

      dispatch({
        type: SHIFT_SWITCH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SHIFT_SWITCH_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
