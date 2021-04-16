import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { notify } from "../../../utils/helpers";
import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";
import {
  faChevronLeft,
  faEye,
  faEyeDropper,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFLogin() {
  const history = useHistory();
  const { dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  // handle form submission
  const onSubmit = ({ email, password }) => {
    setDisabled(true);
    setLoading(true);

    login(email, password);
  };

  const login = (email, password) => {
    api.get(`${process.env.REACT_APP_API}/sanctum/csrf-cookie`).then(() => {
      api
        .post(`${process.env.REACT_APP_API}/login`, { email, password })
        .then((response) => {
          if (response.data.error) {
            notify("Error! Invalid Credentials.", "error");

            setDisabled(false);
            setLoading(false);
            return;
          }

          localStorage.setItem("honeydu_user", true);

          dispatch({
            type: "LOGGEDIN",
            payload: response.data.user,
          });

          notify("Success! Logged in.");
          history.replace("/dashboard");
        })
        .catch((errors) => console.log(errors.response));
    });
  };

  return (
    <div className="pf">
      {loading && <Loader />}
      
      <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="pf-inner flex-fill">
        <Link to="/" className="d-block text-center mb-5">
          <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
        </Link>

        <h2 className="pf-title">Log in to Honeydu</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pf-login">
          <div className="form-group">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="you@yourbusiness.com"
              ref={register({ required: true })}
              autoComplete="off"
            />

            {errors.email && (
              <small className="text-danger">Field is required</small>
            )}
          </div>

          <div className="form-group position-relative">
            <label>Password</label>
            <input
              type={togglePassword ? "text" : "password"}
              name="password"
              className="form-control"
              placeholder="*******************"
              ref={register({
                required: "Field is required",
                minLength: {
                  value: 6,
                  message: "Too short, should be 6 character long.",
                },
              })}
            />

            <span
              className="svg-eye position-absolute"
              style={{ right: "1rem", bottom: "1.6rem" }}
              onClick={() => setTogglePassword(!togglePassword)}
            >
              <FontAwesomeIcon icon={togglePassword ? faEyeSlash : faEye} />
            </span>

            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}
          </div>

          <button
            className="btn btn-custom mt-5"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          >
            Login
          </button>

          <p className="my-4 d-flex justify-content-center align-items-center">
            <span
              className="flex-fill"
              style={{ height: "2px", background: "#ccc" }}
            ></span>
            <span className="mx-5">Or</span>
            <span
              className="flex-fill"
              style={{ height: "2px", background: "#ccc" }}
            ></span>
          </p>

          <button className="btn btn-custom text-uppercase" type="button">
            <img src="/images/intuit.png" alt="INTUIT" />
            <span>Sign in with INTUIT</span>
          </button>

          <p className="text-center mt-4">
            Not a member?{" "}
            <Link to="/pf-signup" className="font-weight-bold">
              Signup instead.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
