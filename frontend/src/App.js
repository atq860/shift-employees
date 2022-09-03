import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import "boxicons/css/boxicons.min.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./components/layout/AppLayout";
// import Blank from "./screens/Blank";
import User from "./screens/User";
import Login from "./screens/Login";
import UserListScreen from "./screens/UserListScreen";
import UserCreateScreen from "./screens/UserCreateScreen";
import UserEditScreen from "./screens/UserEditScreen";
import DashboardScreen from "./screens/DashboardScreen";
import EmployeeListScreen from "./screens/EmployeeListScreen";
import ShiftCreateScreen from "./screens/ShiftCreateScreen";
import ShiftEditScreen from "./screens/ShiftEditScreen";
import RequestsScreen from "./screens/RequestsScreen";
import RequestCreateScreen from "./screens/RequestCreateScreen";
import AnnouncementsScreen from "./screens/AnnouncementsScreen";
import AnnouncementCreateScreen from "./screens/AnnouncementCreateScreen";
import ProfileScreen from "./screens/ProfileScreen";
import { userType } from "./constants/userType";
import EmployeeRemoveScreen from "./screens/EmployeeRemoveScreen";
import MyScheduleScreen from "./screens/MyScheduleScreen";
// import { useNavigate } from "react-router-dom";

function App() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   const navigate = useNavigate();

  //   useEffect(() => {
  //    if(!userInfo) {
  //        navigate("/login");
  //    }
  //   }, [userInfo]);

  return (
    <BrowserRouter>
      <Routes>
        {userInfo ? (
          <Route path="/" element={<AppLayout />}>
            {/* <Route index element={<Blank />} /> */}
            <Route path="/" element={<DashboardScreen />} />
            <Route
              path="/requests"
              element={
                userInfo && userInfo.type === userType.ADMIN ? (
                  <EmployeeRemoveScreen />
                ) : (
                  <RequestsScreen />
                )
              }
            />
            <Route
              path="/requests/create-request"
              element={<RequestCreateScreen />}
            />
            <Route path="/announcements" element={<AnnouncementsScreen />} />
            <Route
              path="/announcements/post-announcement"
              element={<AnnouncementCreateScreen />}
            />
            <Route path="/employees" element={<EmployeeListScreen />} exact />
            <Route
              path="/employees/:id/createShift"
              element={<ShiftCreateScreen />}
              exact
            />
            <Route
              path="/employees/shifts/:id/edit"
              element={<ShiftEditScreen />}
              exact
            />
            <Route path="/mySchedule" element={<MyScheduleScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/users" element={<UserListScreen />} />
            <Route path="/users/create" element={<UserCreateScreen />} />
            <Route path="/users/:id/edit" element={<UserEditScreen />} />
            {/* <Route path="/shifts" element={<Blank />} /> */}
          </Route>
        ) : (
          <Route path="/" element={<Login />} />

          // <Route path="/login" element={!userInfo ? <Navigate to="/login" replace /> :  <Blank />}  />
          //   <Route path="/login" element={<Blank />} />
        )}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
