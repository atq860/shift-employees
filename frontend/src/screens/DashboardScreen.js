import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listShifts } from "../actions/shiftActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // fetching from from the Store thru the reducer
  const shiftList = useSelector((state) => state.shiftList);
  const { loading, error, shifts } = shiftList; // connection between reducer and store

  // Admin Screen Access Security
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin; // connection between reducer and store

  // Dispatching Action
  useEffect(() => {
    if (userInfo) {
      dispatch(listShifts());
    } else {
      navigate("/");
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <Container>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>All Employees Schedule</h1>
        </Col>

        {/* <Col md={12}>
          <span style={{ display: "flex" }}>
            <div>
            <strong>Week Starts: </strong>
            {shifts && moment(shifts[shifts.length-1]?.createdAt?.split("T")[0]).format('MMMM Do YYYY')}
            </div>

            <div className="ml-5">
            <strong>Week Ends: </strong>
            {shifts && moment(shifts[shifts.length-1]?.createdAt?.split("T")[0].setDate(shifts[shifts.length-1]?.createdAt?.split("T")[0].getDate() + 7).toISOString()).format('MMMM Do YYYY')}
            </div>
            

          </span>
        </Col> */}
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
                <th>NAME</th>
                <th>MONDAY</th>
                <th>TUESDAY</th>
                <th>WEDNESDAY</th>
                <th>THURSDAY</th>
                <th>FRIDAY</th>
                <th>SATURDAY</th>
                <th>SUNDAY</th>
                {userInfo && userInfo.type === userType.MANAGER && <th></th>}
              </tr>
            </thead>

            <tbody>
              {shifts.map((shift) => (
                <tr key={shift._id}>
                  <td>
                    {shift?.employee?.firstName} {shift?.employee?.lastName}
                  </td>
                  <td>{shift.monday}</td>
                  <td>{shift.tuesday}</td>
                  <td>{shift.wednesday}</td>
                  <td>{shift.thursday}</td>
                  <td>{shift.friday}</td>
                  <td>{shift.saturday}</td>
                  <td>{shift.sunday}</td>
                  {userInfo && userInfo.type === userType.MANAGER && (
                    <td>
                      <LinkContainer to={`/employees/shifts/${shift._id}/edit`}>
                        <Button variant="light" className="btn-sm">
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>

                      {/* <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(shift._id)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button> */}
                    </td>
                  )}

                  {/*                 
                <td>
                  <a href={`mailto:${shift.email}`}>{shift.email}</a>
                </td>

                <td>
                  {shift.type === shiftType.ADMIN ? (
                    <i className="fas fa-check" style={{ color: "green" }}></i>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }}></i>
                  )}
                </td>

                <td>{shift.type}</td>

                <td>
                  <LinkContainer to={`/shifts/${shift._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit"></i>
                    </Button>
                  </LinkContainer>

                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(shift._id)}
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </td> */}
                </tr>
              ))}
            </tbody>
          </Table>
          {shifts && shifts.length === 0 && (
            <Message variant="info">No Shift created yet</Message>
          )}
        </>
      )}
    </Container>
  );
};

export default DashboardScreen;
