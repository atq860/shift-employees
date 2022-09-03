import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listAnnouncements } from "../actions/announcementActions";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Table,
  Button,
  Tab,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  Container,
  Form,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { userType } from "../constants/userType";

function AnnouncementsScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const announcementList = useSelector((state) => state.announcementList);
  const { loading, error, announcements } = announcementList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.type === userType.EMPLOYEE ||
        userInfo.type === userType.MANAGER)
    ) {
      dispatch(listAnnouncements());
    }
  }, [dispatch, userInfo]);

  return (
    <>
      <div className="container-modified" style={{ marginBottom: "4rem" }}>
        <h1>Announcements</h1>
        {userInfo && userInfo.type === userType.MANAGER && (
          <Link to="post-announcement" className="float-right">
            <Button>Post Announcement</Button>
          </Link>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container-modified">
          {announcements &&
            announcements.map((announcement) => (
              <ListGroup key={announcement._id}>
                <ListGroupItem
                  key={announcement._id}
                  style={{
                    marginBottom: "1rem",
                    background: "#D2D2D2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <Row>
                    <Col md={12}>
                      <h3
                        style={{ fontWeight: 300 /* fontSize: "1.2rem" */ }}
                        className="mb-3"
                      >
                        {announcement.title.toUpperCase()}
                      </h3>
                      <h5
                        /* style={{ fontWeight: 100, fontSize: "1.2rem" }} */ className="mb-4"
                      >
                        {announcement.announcement}
                      </h5>

                      {userInfo && userInfo.type === userType.EMPLOYEE && (
                        <div>
                          <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                            Posted by:{" "}
                          </span>
                          {announcement?.manager?.firstName}{" "}
                          {announcement?.manager?.lastName}
                        </div>
                      )}

                      <div>
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                          Date:{" "}
                        </span>
                        {announcement?.createdAt?.substring(0, 10)}
                      </div>
                    </Col>
                  </Row>
                </ListGroupItem>
              </ListGroup>
            ))}
        </div>
      )}
    </>
  );
}

export default AnnouncementsScreen;
