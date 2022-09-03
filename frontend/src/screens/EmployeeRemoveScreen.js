import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { deleteUser, listUsers } from "../actions/userActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";

const EmployeeRemoveScreen = ({ history }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userDelete);
  const { success: successDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.type === userType.ADMIN) {
      dispatch(listUsers());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, successDelete, userInfo]);

  const deleteHandler = (id) => {
    if (window.confirm("Are You Sure")) {
      dispatch(deleteUser(id));
    }
  };

  let employees = [];
  if (users && users.length > 0) {
    employees = users.filter(
      (user) => user.type !== userType.ADMIN && user.deleteRequest
    );
  }

  return (
    <Container>
      {/* <h1>Users</h1> */}
      <Row className="align-items-center mb-5">
        <Col>
          <h1>Remove Employees Requests</h1>
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
              {employees.map((user) => (
                <tr key={user._id}>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>{user.jobPosition}</td>
                  <td>{user.team}</td>
                  <td>{user.phone}</td>

                  <td>{user.type}</td>
                  <td>
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
          {employees.length === 0 && (
            <Message variant="info">No Request(s)</Message>
          )}
        </>
      )}
    </Container>
  );
};

export default EmployeeRemoveScreen;
