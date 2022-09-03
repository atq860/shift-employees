import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, listUsers } from "../actions/userActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetching from from the Store thru the reducer
  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList; // connection between reducer and store

  // Admin Screen Access Security
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // connection between reducer and store

  // Delete a User
  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete; // connection between reducer and store

  // Dispatching Action
  useEffect(() => {
    if (userInfo && userInfo.type === userType.ADMIN) {
      dispatch(listUsers());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, successDelete, userInfo]); // passing successDelete becoz want listUser to reload

  const createUserHandler = () => {
    navigate("/users/create");
  };

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
  };

  let workers = [];
  if (users && users.length > 0) {
    workers = users.filter((user) => user.type !== userType.ADMIN);
  }

  // const date1 = "2022-01-17T06:18:46.146Z";
  // const date2 = new Date().toISOString();

  // const DAY_UNIT_IN_MILLISECONDS = 24 * 3600 * 1000;

  // const diffInMilliseconds =
  //   new Date(date2).getTime() - new Date(date1).getTime();
  // const diffInDays = diffInMilliseconds / DAY_UNIT_IN_MILLISECONDS;

  // console.log(diffInDays, "day(s)");
  // console.log(new Date().toISOString() );

  return (
    <Container>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>Users</h1>
        </Col>

        <Col className="text-right">
          <Button className="my-3" onClick={createUserHandler} variant="dark">
            <i className="fas fa-plus"></i> Create User
          </Button>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>FIRST NAME</th>
                <th>LAST NAME</th>
                <th>EMAIL</th>
                <th>JOB POSITION</th>
                <th>TEAM</th>
                <th>PHONE</th>
                <th>ROLE</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {workers.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.jobPosition}</td>
                  <td>{user.team}</td>
                  <td>{user.phone}</td>

                  {/* <td>
                  {user.type === userType.ADMIN ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td> */}

                  <td>{user.type}</td>
                  <td>
                    <LinkContainer to={`/users/${user._id}/edit`}>
                      <Button variant="light" className="btn-sm mr-2">
                        <i className="fas fa-edit"></i>
                      </Button>
                    </LinkContainer>

                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {workers && workers.length === 0 && (
            <Message variant="info">No User Created Yet</Message>
          )}
        </>
      )}
    </Container>
  );
};

export default UserListScreen;
