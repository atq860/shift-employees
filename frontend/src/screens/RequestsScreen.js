import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { acceptRequest, listRequests } from "../actions/requestActions";
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

function RequestsScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();

  const requestList = useSelector((state) => state.requestList);
  const { loading, error, requests } = requestList;

  const requestAccept = useSelector((state) => state.requestAccept);
  const {
    loading: loadingRequestAccept,
    error: errorRequestAccept,
    success,
  } = requestAccept;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (
      userInfo &&
      (userInfo.type === userType.EMPLOYEE ||
        userInfo.type === userType.MANAGER)
    ) {
      dispatch(listRequests());
    }
    // if (successQuestionDelete) {
    //   navigate("/");
    // }
    // if (successAnswerDelete || successQuestionClose) {
    //   dispatch(listQuestionDetails(params.id));
    // }
    // if (successQuestionAnswer) {
    //   alert("Solution Posted!!");
    //   setNewAnswer("");
    //   dispatch({ type: QUESTION_CREATE_ANSWER_RESET });
    // }

    // dispatch(listQuestionDetails(params.id));
  }, [dispatch, userInfo, success]);

  const submitHandler = (id) => {
    console.log("sdj ", id);
    dispatch(acceptRequest(id));
  };

  return (
    <>
      <div className="container-modified" style={{ marginBottom: "4rem" }}>
        <h1>Requests</h1>
        {userInfo && userInfo.type === userType.EMPLOYEE && (
          <Link to="create-request" className="float-right">
            <Button>Create Request</Button>
          </Link>
        )}
      </div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div className="container-modified">
          {requests &&
            requests.map((request) => (
              <ListGroup key={request._id}>
                <ListGroupItem
                  key={request._id}
                  style={{
                    marginBottom: "1rem",
                    background: "#D2D2D2",
                    fontFamily: "Arial, Helvetica, sans-serif",
                  }}
                >
                  <Row>
                    <Col md={12}>
                      <div className="d-flex">
                        <h1
                          style={{ fontWeight: 300 /* fontSize: "1.2rem" */ }}
                          className="mb-3"
                        >
                          {request.title.toUpperCase()}{" "}
                        </h1>
                        <div className="mt-3 ml-2">
                          (
                          {moment(request.fromDate.split("T")[0]).format(
                            "MMMM Do YYYY"
                          )}
                          {" - "}
                          {moment(request.toDate.split("T")[0]).format(
                            "MMMM Do YYYY"
                          )}
                          )
                        </div>
                      </div>
                      <h5
                        /* style={{ fontWeight: 100, fontSize: "1.2rem" }} */ className="mb-4"
                      >
                        {request.description}
                      </h5>

                      <div>
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                          Posted by:{" "}
                        </span>
                        {request?.employee?.firstName}{" "}
                        {request?.employee?.lastName}
                      </div>
                      <div>
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                          Date:{" "}
                        </span>
                        {request?.createdAt?.substring(0, 10)}
                      </div>

                      <div>
                        <span style={{ fontSize: "1rem", fontWeight: 600 }}>
                          Status:{" "}
                        </span>
                        {request.isAccepted
                          ? "Accepted on " +
                            request?.acceptedAt?.substring(0, 10)
                          : "Pending"}
                      </div>

                      {userInfo &&
                        userInfo.type === userType.MANAGER &&
                        !request.isAccepted && (
                          <Button
                            className="float-right mb-2"
                            onClick={() => submitHandler(request._id)}
                          >
                            Accept Request
                          </Button>
                        )}
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

export default RequestsScreen;
