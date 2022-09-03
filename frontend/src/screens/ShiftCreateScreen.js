import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createShift } from "../actions/shiftActions";
import { userType } from "../constants/userType";
import { useNavigate, useParams } from "react-router-dom";
import { SHIFT_CREATE_RESET } from "../constants/shiftConstants";

const ShiftCreateScreen = () => {
  const [monday, setMonday] = useState("00-06");
  const [tuesday, setTuesday] = useState("00-06");
  const [wednesday, setWednesday] = useState("00-06");
  const [thursday, setThursday] = useState("00-06");
  const [friday, setFriday] = useState("00-06");
  const [saturday, setSaturday] = useState("00-06");
  const [sunday, setSunday] = useState("00-06");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const shiftCreate = useSelector((state) => state.shiftCreate);
  const { loading, error, success, shift } = shiftCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.type !== userType.MANAGER) {
      navigate("/");
    }

    if (success) {
      dispatch({ type: SHIFT_CREATE_RESET });
      navigate("/");
    }
  }, [navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(
      createShift({
        employee: userId,
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      })
    );
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Create Shift</h1>

      {success ? (
        <Message variant="success">Shift has been successfully created</Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="monday">
              <Form.Label>Monday</Form.Label>
              <Form.Control
                as="select"
                value={monday}
                onChange={(e) => setMonday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="tuesday">
              <Form.Label>Tuesday</Form.Label>
              <Form.Control
                as="select"
                value={tuesday}
                onChange={(e) => setTuesday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="wednesday" className="pt-3">
              <Form.Label>Wednesday</Form.Label>
              <Form.Control
                as="select"
                value={wednesday}
                onChange={(e) => setWednesday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="thursday" className="pt-3">
              <Form.Label>Thursday</Form.Label>
              <Form.Control
                as="select"
                value={thursday}
                onChange={(e) => setThursday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="friday" className="pt-3">
              <Form.Label>Friday</Form.Label>
              <Form.Control
                as="select"
                value={friday}
                onChange={(e) => setFriday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="saturday" className="pt-3">
              <Form.Label>Saturday</Form.Label>
              <Form.Control
                as="select"
                value={saturday}
                onChange={(e) => setSaturday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="sunday" className="pt-3">
              <Form.Label>Sunday</Form.Label>
              <Form.Control
                as="select"
                value={sunday}
                onChange={(e) => setSunday(e.target.value)}
              >
                <option value="00-06">00-06</option>
                <option value="06-12">06-12</option>
                <option value="12-18">12-18</option>
                <option value="18-24">18-24</option>
                <option value="off">OFF</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>

        <Button type="submit" variant="primary" className="my-4">
          Create Shift
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShiftCreateScreen;
