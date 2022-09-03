import React, { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Tab, Container, Row, Col, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { listShifts, switchShift, listMyShifts } from "../actions/shiftActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";
import { listUsers } from "../actions/userActions";
import { SHIFT_SWITCH_RESET } from "../constants/shiftConstants";
import moment from "moment";

const MyScheduleScreen = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [shiftDay, setShiftDay] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const shiftList = useSelector((state) => state.shiftList);
  const { loading, error, shifts } = shiftList;

  const shiftListMy = useSelector((state) => state.shiftListMy);
  const {
    loading: loadingMyShifts,
    error: errorMyShifts,
    myShifts,
  } = shiftListMy;

  const shiftSwitch = useSelector((state) => state.shiftSwitch);
  const { success } = shiftSwitch;

  const userList = useSelector((state) => state.userList);
  const { loading: loadingUserList, error: errorUserList, users } = userList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      dispatch(listShifts());
      dispatch(listMyShifts());
      dispatch(listUsers());
    } else {
      navigate("/");
    }

    if (success) dispatch({ type: SHIFT_SWITCH_RESET });
  }, [dispatch, navigate, userInfo, success]);

  let employees = [];
  if (users && users.length > 0) {
    employees = users.filter(
      (user) => user.type === userType.EMPLOYEE && user._id !== userInfo._id
    );
  }

  let myWeeklyShift = [];
  if (shifts && shifts.length > 0) {
    myWeeklyShift = shifts.filter(
      (shift) => shift.employee._id === userInfo._id
    );
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (employeeId === "" || shiftDay === "") {
      alert("Please select an employee and a shift day");
    } else {
      dispatch(switchShift(employeeId, shiftDay));
    }
  };

  return (
    <Container>
      <Row className="align-items-center mb-5">
        <Col>
          <h1>My Schedule</h1>
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
                <th>NAME</th>
                <th>MONDAY</th>
                <th>TUESDAY</th>
                <th>WEDNESDAY</th>
                <th>THURSDAY</th>
                <th>FRIDAY</th>
                <th>SATURDAY</th>
                <th>SUNDAY</th>
                {/* <th>CREATION DATE</th>
              {userInfo && userInfo.type === userType.MANAGER && <th></th>} */}
              </tr>
            </thead>

            {myWeeklyShift[0]?.monday && (
              <tbody>
                {/* {shifts.map((shift) => ( */}
                <tr /* key={myShifts[0]._id} */>
                  <td>
                    {myWeeklyShift[0]?.employee.firstName}{" "}
                    {myWeeklyShift[0]?.employee.lastName}
                  </td>
                  <td>{myWeeklyShift[0]?.monday}</td>
                  <td>{myWeeklyShift[0]?.tuesday}</td>
                  <td>{myWeeklyShift[0]?.wednesday}</td>
                  <td>{myWeeklyShift[0]?.thursday}</td>
                  <td>{myWeeklyShift[0]?.friday}</td>
                  <td>{myWeeklyShift[0]?.saturday}</td>
                  <td>{myWeeklyShift[0]?.sunday}</td>
                  {/* <td>{moment(myWeeklyShift?.createdAt).format("MMM Do YY")}</td> */}

                  {/* {userInfo && userInfo.type === userType.MANAGER && (
                <td>
                  <LinkContainer to={`/employees/shifts/${shift._id}/edit`}>
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
                </td>
              )} */}

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
                {/* ))} */}
              </tbody>
            )}
          </Table>
          {!myWeeklyShift[0]?.monday && (
            <Message>No schedule created for this week yet</Message>
          )}
        </>
      )}

      {users && users.length > 0 && (
        <div className="container-switch-form">
          {/* <h3 className="mb-3">Switch Shift</h3> */}
          <Form onSubmit={submitHandler}>
            <Row>
              <Col md={4}>
                <Form.Group controlId="employeeId">
                  <Form.Label>Select Emoloyee</Form.Label>
                  <Form.Control
                    as="select"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                  >
                    <option value="">Select</option>
                    {employees.length > 0 &&
                      employees.map((employee) => (
                        <option key={employee._id} value={employee._id}>
                          {employee.firstName} {employee.lastName}
                        </option>
                      ))}
                    {/* <option value="00-06">00-06</option>
                    <option value="06-12">06-12</option>
                    <option value="12-18">12-18</option>
                    <option value="18-24">18-24</option>
                    <option value="off">OFF</option> */}
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId="shiftDay">
                  <Form.Label>Select Day</Form.Label>
                  <Form.Control
                    as="select"
                    value={shiftDay}
                    onChange={(e) => setShiftDay(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="monday">Monday</option>
                    <option value="tuesday">Tuesday</option>
                    <option value="wednesday">Wednesday</option>
                    <option value="thursday">Thursday</option>
                    <option value="friday">Friday</option>
                    <option value="saturday">Saturday</option>
                    <option value="sunday">Sunday</option>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Button
                  type="submit"
                  variant="primary"
                  style={{ marginTop: "2rem" }}
                >
                  Switch Shift
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      )}

      <Row className="align-items-center my-3">
        <Col>
          <h2>Previous Weeks Schedule</h2>
        </Col>
      </Row>
      {loadingMyShifts ? (
        <Loader />
      ) : errorMyShifts ? (
        <Message variant="danger">{errorMyShifts}</Message>
      ) : (
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
              <th>CREATION DATE</th>
            </tr>
          </thead>

          <tbody>
            {myShifts.map((shift) => (
              <tr key={shift._id}>
                <td>
                  {shift.employee.firstName} {shift?.employee.lastName}
                </td>
                <td>{shift?.monday}</td>
                <td>{shift?.tuesday}</td>
                <td>{shift?.wednesday}</td>
                <td>{shift?.thursday}</td>
                <td>{shift?.friday}</td>
                <td>{shift?.saturday}</td>
                <td>{shift?.sunday}</td>
                <td>{moment(shift?.createdAt).format("MMM Do YY")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyScheduleScreen;
