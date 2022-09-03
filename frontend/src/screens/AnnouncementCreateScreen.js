import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import FormContainer from "../components/FormContainer";
import { createAnnouncement } from "../actions/announcementActions";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";
import { ANNOUNCEMENT_CREATE_RESET } from "../constants/announcementConstants";

const AnnouncementCreateScreen = () => {
  const [title, setTitle] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const announcementCreate = useSelector((state) => state.announcementCreate);
  const { loading, error, success } = announcementCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.type !== userType.MANAGER) {
      navigate("/");
    }
    if (success) {
      setTitle("");
      setAnnouncement("");
      dispatch({ type: ANNOUNCEMENT_CREATE_RESET });
      navigate("/announcements");
    }
  }, [userInfo, navigate, success, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (title === "") {
      alert("Please Select a Title");
    } else {
      dispatch(
        createAnnouncement({
          title,
          announcement,
        })
      );
    }
  };

  return (
    <>
      <FormContainer>
        <h1 className="mb-5">Post an Announcement</h1>

        {loading && <Loader />}
        {error && <Message variant="danger"> {error} </Message>}

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="title" className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              as="select"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            >
              <option value="">Select...</option>
              <option value="holiday">Holiday</option>
              <option value="extra-hours">Extra Hours</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="announcement">
            <Form.Label>Announcement</Form.Label>

            <Form.Control
              as="textarea"
              row="3"
              value={announcement}
              onChange={(e) => setAnnouncement(e.target.value)}
            ></Form.Control>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-5">
            Post Announcement
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default AnnouncementCreateScreen;
