import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { register } from "../actions/userActions";
import { userType } from "../constants/userType";
import { useNavigate } from "react-router-dom";
import { USER_REGISTER_RESET } from "../constants/userConstants";

const UserCreateScreen = ({ location, history }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [team, setTeam] = useState("");
  const [type, setType] = useState("Employee");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, success } = userRegister;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (userInfo && userInfo.type !== userType.ADMIN) {
      navigate("/");
    }

    if (success) {
      dispatch({ type: USER_REGISTER_RESET });
      navigate("/users");
    }
  }, [navigate, userInfo, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        register(
          firstName,
          lastName,
          email,
          password,
          phone,
          jobPosition,
          team,
          type
        )
      );
    }
  };

  return (
    <FormContainer>
      <h1 className="mb-4">Create User</h1>

      {message ? (
        <Message variant="danger">{message}</Message>
      ) : success ? (
        <Message variant="success">User has been successfully created</Message>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : null}

      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="type" className="pb-5">
          <Form.Label>
            <b>Create Account For</b>
          </Form.Label>

          <Form.Control
            as="select"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="name" className="pt-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="name" className="pt-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="name"
            placeholder="Enter Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="pt-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="phone" className="pt-3">
          <Form.Label>Contact Number</Form.Label>
          <Form.Control
            type="name"
            placeholder="Contact Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="job" className="pt-3">
          <Form.Label>Job Position</Form.Label>
          <Form.Control
            type="name"
            placeholder="Job Position"
            value={jobPosition}
            onChange={(e) => setJobPosition(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="team" className="pt-3">
          <Form.Label>Team</Form.Label>
          <Form.Control
            type="number"
            placeholder="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
            required
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="my-4">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="confirmPassword" className="my-4">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type="submit" variant="primary" className="mb-5">
          Create User
        </Button>
      </Form>

      {/* <Row className="py-3">
        <Col>
          Have an Account?{" "}
          <Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
            Login
          </Link>
        </Col>
      </Row> */}
    </FormContainer>
  );
};

export default UserCreateScreen;
