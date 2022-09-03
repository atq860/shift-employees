import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { getUserDetails, updateUserProfile } from "../actions/userActions";
import { userType } from "../constants/userType";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { useNavigate } from "react-router-dom";

const ProfileScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [jobPosition, setJobPosition] = useState("");
  const [team, setTeam] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate("/");
    } else {
      if (!user || !user.firstName || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails("profile"));
      } else {
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setPhone(user.phone);
        setJobPosition(user.jobPosition);
        setTeam(user.team);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
          firstName,
          lastName,
          password,
          phone,
          jobPosition,
          team,
        })
      );
    }
  };

  return (
    <div className="container-modified">
      <h1 className="mb-5">Profile</h1>

      {message && <Message variant="danger">{message}</Message>}
      {success && <Message variant="success">Profile Updated</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Form onSubmit={submitHandler}>
          <Row>
            <Col md={6}>
              <Form.Group controlId="firstName" className="pt-3 px-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="lastName" className="pt-3 px-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Enter Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="phone" className="pt-3 px-3">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Contact Number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="job" className="pt-3 px-3">
                <Form.Label>Job Position</Form.Label>
                <Form.Control
                  type="name"
                  placeholder="Job Position"
                  value={jobPosition}
                  onChange={(e) => setJobPosition(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
            </Col>

            {userInfo && userInfo.type !== userType.ADMIN && (
              <Col md={6}>
                <Form.Group controlId="team" className="pt-3 px-3">
                  <Form.Label>Team</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Team"
                    value={team}
                    onChange={(e) => setTeam(e.target.value)}
                    required
                  ></Form.Control>
                </Form.Group>
              </Col>
            )}

            <Col md={6}>
              <Form.Group controlId="password" className="pt-3 px-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="confirmPassword" className="pt-3 px-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
              </Form.Group>
            </Col>
          </Row>
          <Button type="submit" variant="primary" className="my-5">
            Update Profile
          </Button>
        </Form>
      )}
    </div>
  );
};

export default ProfileScreen;
