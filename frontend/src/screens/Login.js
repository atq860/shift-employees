import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "../components/Message";
import Loader from "../components/Loader";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(email, password);
    dispatch(login(email, password));
  };

  return (
    <>
      <div className="container">
        {error && <Message variant="danger">{error}</Message>}

        {loading && <Loader />}
      </div>
      <div className="align-form">
        <div className="wrapper fadeInDown">
          <div id="formContent">
            <div className="fadeIn first" style={{ marginTop: "2rem" }}>
              {/* <img
              src="http://danielzawadzki.com/codepen/01/icon.svg"
              id="icon"
              alt="User Icon"
            /> */}

              <h2>Login</h2>

              {/* <i class="fas fa-user"></i> */}
            </div>

            <form onSubmit={submitHandler}>
              <input
                type="email"
                id="login"
                className="fadeIn second email"
                name="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                id="password"
                className="fadeIn third password"
                name="login"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input type="submit" className="fadeIn fourth" value="Log In" />
            </form>

            {/* <div id="formFooter">
            <a className="underlineHover" href="#">
              Forgot Password?
            </a>
          </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
