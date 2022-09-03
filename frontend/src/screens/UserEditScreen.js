import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { getUserDetails, updateUser } from "../actions/userActions";
import { USER_UPDATE_RESET } from "../constants/userConstants";
import { useNavigate, useParams } from "react-router-dom";

const UserEditScreen = () => {
  const params = useParams();
  const navigate = useNavigate();
  const userId = params.id;

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

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/users");
    } else {
      if (!user.firstName || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setEmail(user.email);
        setPhone(user.phone);
        setJobPosition(user.jobPosition);
        setTeam(user.team);
      }
    }
  }, [dispatch, user, userId, successUpdate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateUser({
        _id: userId,
        firstName,
        lastName,
        email,
        phone,
        jobPosition,
        team,
      })
    );
    // console.log("Data ==> ", userId, name, email, makeAdmin);
  };

  return (
    <>
      <Link to="/users" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <div> {errorUpdate} </div>}
        {loading ? (
          <Loader />
        ) : error ? (
          <div variant="danger">{error}</div>
        ) : (
          <Form onSubmit={submitHandler}>
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

            <Button type="submit" variant="primary">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
