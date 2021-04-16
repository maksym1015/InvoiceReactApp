import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { pageVariants } from "../../../utils/transitions";
import { notify } from "../../../utils/helpers";
import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";

export default function Login() {
  const history = useHistory();
  const { dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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
          history.replace("/home");
        })
        .catch((errors) => console.log(errors.response));
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="register px-3 pt-4 min-vh-100 bg-custom-light text-primary"
    >
      {loading && <Loader />}
      <div className="font-weight-bold mt-3 ml-3">
        <Link to="/">Honeydu</Link>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="login-form flex-fill p-5 mt-5"
      >
        <div className="form-group mb-4">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            ref={register({ required: true })}
            autoComplete="off"
          />

          {errors.email && (
            <small className="text-danger">Field is required</small>
          )}
        </div>

        <div className="form-group mb-4">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            ref={register({
              required: "Field is required",
              minLength: {
                value: 6,
                message: "Too short, should be 6 character long.",
              },
            })}
          />

          {errors.password && (
            <small className="text-danger">{errors.password.message}</small>
          )}
        </div>

        <button
          className="btn btn-custom my-4"
          onClick={handleSubmit(onSubmit)}
          disabled={disabled}
        >
          Login
        </button>

        <p className="text-center mt-4 small">
          Not a member?{" "}
          <Link to="/signup" className="font-weight-bold">
            Signup instead.
          </Link>
        </p>
      </form>
    </motion.div>
  );
}
