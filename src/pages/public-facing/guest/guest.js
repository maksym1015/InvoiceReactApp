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

export default function PFGuest() {
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
    // login(email, password);
    history.push("/pf-pay");
  };

  const login = (email, password) => {
    api
      .post("/users/login", { email, password })
      .then((response) => response.data)
      .then((response) => {
        if (response.status == "success") {
          localStorage.setItem("token", response.token);
          api.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.token}`;

          dispatch({
            type: "LOGGEDIN",
            payload: response.data.user,
          });

          notify("Success! Logged in.");
          history.replace("/home");
        }
      })
      .catch((errors) => {
        if (errors.response && errors.response.status === 401) {
          notify("Error! Invalid Credentials.", "error");
        }

        setLoading(false);
        setDisabled(false);
      });
  };

  return (
    <div className="pf">
      <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="pf-inner">
        <Link to="/" className="d-block text-center mb-5">
          <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
        </Link>

        <h2 className="pf-title">Let's get started</h2>
        <p className="font-weight-bold mb-5 text-center">
          Pay as a guest or sign up for a Honeydu account to use all our free
          payment features.
        </p>

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

          <button
            className="btn btn-custom mt-5"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          >
            Pay as guest
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

          <button
            className="btn btn-custom-outline"
            onClick={() => history.push("/pf-signup")}
          >
            Sing up and pay
          </button>

          <p className="text-center mt-4">
            Already have a Honeydu account?{" "}
            <Link to="/pf-login" className="font-weight-bold">
              Log in instead.
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
