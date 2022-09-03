import axios from "axios";
import {
  ANNOUNCEMENT_CREATE_FAIL,
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_LIST_FAIL,
  ANNOUNCEMENT_LIST_REQUEST,
  ANNOUNCEMENT_LIST_SUCCESS,
} from "../constants/announcementConstants";

export const createAnnouncement =
  (announcement) => async (dispatch, getState) => {
    try {
      dispatch({
        type: ANNOUNCEMENT_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/announcements`,
        announcement,
        config
      );

      dispatch({
        type: ANNOUNCEMENT_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ANNOUNCEMENT_CREATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const listAnnouncements = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ANNOUNCEMENT_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/announcements`, config);

    dispatch({
      type: ANNOUNCEMENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ANNOUNCEMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
