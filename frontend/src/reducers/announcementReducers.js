import {
  ANNOUNCEMENT_CREATE_REQUEST,
  ANNOUNCEMENT_CREATE_SUCCESS,
  ANNOUNCEMENT_CREATE_FAIL,
  ANNOUNCEMENT_CREATE_RESET,
  ANNOUNCEMENT_LIST_REQUEST,
  ANNOUNCEMENT_LIST_SUCCESS,
  ANNOUNCEMENT_LIST_FAIL,
  ANNOUNCEMENT_LIST_RESET,
} from "../constants/announcementConstants";

export const announcementCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_CREATE_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_CREATE_SUCCESS:
      return { loading: false, success: true, announcement: action.payload };
    case ANNOUNCEMENT_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_CREATE_RESET:
      return {};
    default:
      return state;
  }
};

export const announcementListReducer = (state = { announcements: [] }, action) => {
  switch (action.type) {
    case ANNOUNCEMENT_LIST_REQUEST:
      return { loading: true };
    case ANNOUNCEMENT_LIST_SUCCESS:
      return { loading: false, announcements: action.payload };
    case ANNOUNCEMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ANNOUNCEMENT_LIST_RESET:
      return {
        requests: [],
      };
    default:
      return state;
  }
};
