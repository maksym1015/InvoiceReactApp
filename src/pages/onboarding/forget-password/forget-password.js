import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import api from "../../../utils/api";
import { notify } from "../../../utils/helpers";
import Loader from "../../../components/Loader";

export default function OBForgetPassword() {
  const history = useHistory();
  const { dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [isDesktop, setIsDesktop] = useState("");
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

  useEffect(() => {
    // Mobile & Desktop screen check
    const handleResize = () => {
      window.innerWidth > 767 ? setIsDesktop(true) : setIsDesktop(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ob">
      {loading && <Loader />}

      {isDesktop ? (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="pf"
        >
          {loading && <Loader />}

          <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>

          <div className="pf-inner flex-fill">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <h2 className="pf-title">Reset password</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="pf-login">
              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.email && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <button
                className="btn btn-custom mt-5 text-uppercase"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Send reset link
              </button>

              <p className="text-center mt-5">
                Suddenly remembered your password?
                <br />
                <Link
                  to="#"
                  onClick={() => history.goBack()}
                  className="font-weight-bold text-uppercase"
                >
                  Go back
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="register px-3 pt-4 min-vh-100 bg-custom-light text-primary"
          style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h3 className="text-primary mt-5 ml-4 font-weight-bold">
            Reset password
          </h3>

          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5 pt-5 mt-5">
              <div className="form-group mb-5">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.email && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <button
                className="btn btn-custom mb-3 text-uppercase"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Send reset link
              </button>

              <p className="text-center mt-3 small">
                Suddenly remembered your password?
              </p>

              <div className="text-center">
                <Link
                  to="#"
                  onClick={() => history.goBack()}
                  className="font-weight-bold text-uppercase"
                >
                  Go back
                </Link>
              </div>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
