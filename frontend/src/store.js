import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  employeeRemoveReducer,
  userDeleteReducer,
  userDetailsReducer,
  userListReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
  userUpdateReducer,
} from "./reducers/userReducers";
import {
  shiftCreateReducer,
  shiftDetailsReducer,
  shiftListMyReducer,
  shiftListReducer,
  shiftSwitchReducer,
  shiftUpdateReducer,
} from "./reducers/shiftReducers";
import {
  requestAcceptReducer,
  requestCreateReducer,
  requestListReducer,
} from "./reducers/requestReducers";
import {
  announcementCreateReducer,
  announcementListReducer,
} from "./reducers/announcementReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userList: userListReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  shiftCreate: shiftCreateReducer,
  shiftList: shiftListReducer,
  shiftListMy: shiftListMyReducer,
  shiftDetails: shiftDetailsReducer,
  shiftUpdate: shiftUpdateReducer,
  requestCreate: requestCreateReducer,
  requestList: requestListReducer,
  requestAccept: requestAcceptReducer,
  announcementCreate: announcementCreateReducer,
  announcementList: announcementListReducer,
  employeeRemove: employeeRemoveReducer,
  shiftSwitch: shiftSwitchReducer,
});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
// we can use thunk
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
