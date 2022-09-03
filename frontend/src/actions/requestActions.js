import axios from "axios";
import {
    REQUEST_ACCEPT_FAIL,
  REQUEST_ACCEPT_REQUEST,
  REQUEST_ACCEPT_SUCCESS,
  REQUEST_CREATE_FAIL,
  REQUEST_CREATE_REQUEST,
  REQUEST_CREATE_SUCCESS,
  REQUEST_LIST_FAIL,
  REQUEST_LIST_REQUEST,
  REQUEST_LIST_SUCCESS,
} from "../constants/requestConstants";

export const createRequest = (request) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/requests`, request, config);

    dispatch({
      type: REQUEST_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listRequests = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/requests`, config);

    dispatch({
      type: REQUEST_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const acceptRequest = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REQUEST_ACCEPT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/requests/${id}/accept`,
      {},
      config
    );

    dispatch({
      type: REQUEST_ACCEPT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: REQUEST_ACCEPT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
