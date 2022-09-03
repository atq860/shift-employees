import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createRequest } from "../actions/requestActions";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";
import { REQUEST_CREATE_RESET } from "../constants/requestConstants";

const RequestCreateScreen = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const requestCreate = useSelector((state) => state.requestCreate);
  const { loading, error, success } = requestCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.type !== userType.EMPLOYEE) {
      navigate("/");
    }
    if (success) {
      setTitle("");
      setDescription("");
      dispatch({ type: REQUEST_CREATE_RESET });
      navigate("/requests");
    }
  }, [userInfo, navigate, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please Select a Title");
    } else {
      dispatch(
        createRequest({
          title,
          description,
          fromDate,
          toDate,
        })
      );
    }
  };

  let date = new Date();
  date.setDate(date.getDate()); // tomorrow
  const minDateValue = date.toISOString(); // convert to ISO string

  return (
    <>
      <FormContainer>
        <h1 className="mb-5">Post a request</h1>

        {loading && <Loader />}
        {error && <Message variant="danger"> {error} </Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="from">
            <Form.Label>Select From Date</Form.Label>
            <Form.Control
              type="date"
              name="from"
              placeholder="From Date"
              onChange={(e) => setFromDate(e.target.value)}
              min={minDateValue.split("T")[0]}
            />
          </Form.Group>

          <Form.Group controlId="to" className="mt-3">
            <Form.Label>Select To Date</Form.Label>
            <Form.Control
              type="date"
              name="to"
              placeholder="To Date"
              onChange={(e) => setToDate(e.target.value)}
              min={minDateValue.split("T")[0]}
            />
          </Form.Group>

          <Form.Group controlId="title" className="mt-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              as="select"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="vacation">Vacation</option>
              <option value="extra-hours">Extra Hours</option>
              <option value="rol">Rol</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="description" className="mt-3">
            <Form.Label>Description</Form.Label>

            <Form.Control
              as="textarea"
              row="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-5">
            Post Request
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default RequestCreateScreen;
