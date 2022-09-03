import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getShiftDetails, updateShift } from "../actions/shiftActions";
import { SHIFT_UPDATE_RESET } from "../constants/shiftConstants";
import { useParams, useNavigate } from "react-router-dom";

const ShiftEditScreen = () => {
  const [monday, setMonday] = useState("");
  const [tuesday, setTuesday] = useState("");
  const [wednesday, setWednesday] = useState("");
  const [thursday, setThursday] = useState("");
  const [friday, setFriday] = useState("");
  const [saturday, setSaturday] = useState("");
  const [sunday, setSunday] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const userId = params.id;

  const shiftDetails = useSelector((state) => state.shiftDetails);
  const { loading, error, shift } = shiftDetails;

  const shiftUpdate = useSelector((state) => state.shiftUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = shiftUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: SHIFT_UPDATE_RESET });
      navigate("/");
    } else {
      if (!shift.monday || shift._id !== params.id) {
        dispatch(getShiftDetails(params.id));
        console.log("Dispatch");
      } else {
        setMonday(shift.monday);
        setTuesday(shift.tuesday);
        setWednesday(shift.wednesday);
        setThursday(shift.thursday);
        setFriday(shift.friday);
        setSaturday(shift.saturday);
        setSunday(shift.sunday);
      }
    }
  }, [navigate, dispatch, params, shift, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateShift({
        _id: params.id,
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
      <h1 className="mb-4">Edit Shift</h1>

      {successUpdate ? (
        <Message variant="success">Shift has been successfully updated</Message>
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

export default ShiftEditScreen;
