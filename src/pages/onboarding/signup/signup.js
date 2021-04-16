import React, { useState, useContext, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
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

export default function OBSignup() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  const onSubmit = ({ email, password }) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: {
        ...state.welcomeUser,
        email,
        password,
        password_confirmation: password,
      },
    });

    sendVerifyCode({ email });
  };

  const sendVerifyCode = (data) => {
    if (state.skipVerify) {
      return history.push("/verify");
    }

    setDisabled(true);
    setLoading(true);

    api
      .post(`${process.env.REACT_APP_API}/email/send-code`, data)
      .then((response) => {
        setDisabled(false);
        setLoading(false);

        if (response.data.is_dispatched) {
          notify("Verificaton code sent, please check your mail");
          history.push("/verify");
        }
      })
      .catch((error) => {
        notify("Error! Please contact support", "error");

        setDisabled(false);
        setLoading(false);
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

            <h2 className="pf-title">Welcome to Honeydu</h2>

            <form onSubmit={handleSubmit(onSubmit)} className="pf-login">
              <p className="text-center mb-5">
                Let's get your (100% free) account set up. Sign up using your
                email or connect QuickBooks with your Intuit login
              </p>
              <div className="form-group">
                <label>Work email</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.email}
                  autoComplete="off"
                />

                {errors.email && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group">
                <label>Password</label>
                <div className="position-relative">
                  <input
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    ref={register({
                      required: "Field is required",
                      minLength: {
                        value: 8,
                        message: "Too short, should be 8 character long.",
                      },
                    })}
                  />

                  <span
                    className="svg-eye position-absolute"
                    style={{ right: "1rem", bottom: "1.6rem" }}
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    <FontAwesomeIcon
                      icon={togglePassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>

                <small className="d-block text-secondary">
                  Minimum 8 characters with at least 1 number
                </small>

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button
                className="btn btn-custom mt-5 text-uppercase"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Sign up
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

              <button className="btn btn-custom" type="button">
                <img src="/images/intuit.png" alt="INTUIT" />
                <span>Sign in with Intuit</span>
              </button>

              <p className="small text-center mt-4">
                By signing up you agree to Honeydu's
                <a href="#"> Terms of service </a> and
                <a href="#"> Privacy policy</a>.
              </p>

              <p className="text-center mt-5">
                Already have a Honeydu account?
                <br />
                <Link to="/login" className="font-weight-bold text-uppercase">
                  Log in
                </Link>
                <br />
                <br />
                <Link
                  to="/forget-password"
                  className="font-weight-bold text-uppercase text-dark"
                >
                  Forget your Password?
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
          // style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h3 className="text-primary mt-5 ml-4 font-weight-bold">
            Welcome to Honeydu
          </h3>

          <p className="text-center mt-5 px-4">
            Let's get your (100% free) account set up. Sign up using your email
            or connect QuickBooks with your Intuit login
          </p>

          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)} className="px-5  mt-5">
              <div className="form-group mb-5">
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Work email"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.email}
                  autoComplete="off"
                />

                {errors.email && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                <div className="position-relative">
                  <input
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    ref={register({
                      required: "Field is required",
                      minLength: {
                        value: 8,
                        message: "Too short, should be 8 character long.",
                      },
                    })}
                  />

                  <span
                    className="svg-eye position-absolute"
                    style={{ right: "1rem", bottom: "1.6rem" }}
                    onClick={() => setTogglePassword(!togglePassword)}
                  >
                    <FontAwesomeIcon
                      icon={togglePassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>

                <small className="d-block small">
                  Minimum 8 characters with at least 1 number
                </small>

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}
              </div>

              <button
                className="btn btn-custom mb-3 text-uppercase"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Sign up
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

              <button className="btn btn-custom" type="button">
                <img src="/images/intuit.png" alt="INTUIT" />
                <span>Sign in with Intuit</span>
              </button>

              <p className="small text-center mt-4">
                By signing up you agree to Honeydu's
                <a href="#"> Terms of service </a> and
                <a href="#"> Privacy policy</a>.
              </p>

              <p className="text-center mt-5">
                Already have a Honeydu account?
                <br />
                <Link to="/login" className="font-weight-bold text-uppercase">
                  Log in
                </Link>
                <br />
                <br />
                <Link
                  to="/forget-password"
                  className="font-weight-bold text-uppercase text-dark"
                >
                  Forget your Password?
                </Link>
              </p>
            </form>
          </div>
        </motion.div>
      )}
    </div>
  );
}
