import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import api from "../../../utils/api";
import { notify } from "../../../utils/helpers";

import Loader from "../../../components/Loader";

export default function OBVerify() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = ({ digit1, digit2, digit3, digit4 }) => {
    verifyUser({
      code: digit1 + digit2 + digit3 + digit4,
      email: state.welcomeUser.email,
    });
  };

  const verifyUser = (data) => {
    if (state.skipVerify) {
      return history.push("/type");
    }

    setDisabled(true);
    setLoading(true);

    api
      .post(`${process.env.REACT_APP_API}/email/verify-code`, data)
      .then((response) => {
        setDisabled(false);
        setLoading(false);

        if (response.data.is_approved) {
          notify("Success! Please fills out below fields");
          history.push("/type");
        } else {
          notify("Error! Invalid verification code.", "error");
        }
      })
      .catch((error) => {
        notify("Error! Please contact support", "error");

        setDisabled(false);
        setLoading(false);
      });
  };

  const sendVerifyCode = () => {
    if (state.skipVerify) {
      return history.push("/type");
    }

    setDisabled(true);
    setLoading(true);

    api
      .post(`${process.env.REACT_APP_API}/email/send-code`, {
        email: state.welcomeUser.email,
      })
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

  const nextInput = (event) => {
    if (event.target.name !== "digit4" && event.target.value !== "") {
      var form = event.target.form;
      var index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 1].select();
      event.preventDefault();
    } else {
      handleSubmit(onSubmit)();
    }
  };

  useEffect(() => {
    if (!state.welcomeUser.email) return history.goBack();

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
          style={{ paddingBottom: "10rem" }}
        >
          <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>

          <div className="pf-inner flex-fill">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <div className="text-center" style={{ marginBottom: "5rem" }}>
              <img src="/images/verify-email.png" width="180px" />
            </div>

            <h2 className="pf-title">Check your email</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pf-login container"
            >
              <div className="row">
                <div className="col-12 mb-5">
                  <p className="text-center text-secondary small">
                    We sent a 4-digit code to {state.welcomeUser.email}. <br />
                    Please enter it below. <br />
                    Can't find it? Check your span folder
                  </p>
                </div>

                <div className="form-group col-3">
                  <input
                    className="form-control text-center"
                    type="text"
                    name="digit1"
                    ref={register({
                      required: true,
                      pattern: /^[0-9]{1}$/i,
                    })}
                    onKeyUp={nextInput}
                    maxLength="1"
                    autoFocus
                  />

                  {errors.digit1 && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>

                <div className="form-group col-3">
                  <input
                    className="form-control text-center"
                    type="text"
                    name="digit2"
                    ref={register({
                      required: true,
                      pattern: /^[0-9]{1}$/i,
                    })}
                    onKeyUp={nextInput}
                    maxLength="1"
                  />

                  {errors.digit2 && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>

                <div className="form-group col-3">
                  <input
                    className="form-control text-center"
                    type="text"
                    name="digit3"
                    ref={register({
                      required: true,
                      pattern: /^[0-9]{1}$/i,
                    })}
                    onKeyUp={nextInput}
                    maxLength="1"
                  />

                  {errors.digit3 && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>

                <div className="form-group col-3">
                  <input
                    className="form-control text-center"
                    type="text"
                    name="digit4"
                    ref={register({
                      required: true,
                      pattern: /^[0-9]{1}$/i,
                    })}
                    onKeyUp={nextInput}
                    maxLength="1"
                  />

                  {errors.digit4 && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>
              </div>

              <div className="text-center mx-auto" style={{ width: "25rem" }}>
                <button
                  className="btn-custom-link mt-5 small text-dark font-weight-bold text-uppercase"
                  onClick={sendVerifyCode}
                  disabled={disabled}
                  type="button"
                >
                  Resend the code
                </button>

                <p className="my-0 d-flex justify-content-center align-items-center">
                  <span
                    className="flex-fill"
                    style={{ height: "2px", background: "#ccc" }}
                  ></span>
                  <span className="mx-5">or</span>
                  <span
                    className="flex-fill"
                    style={{ height: "2px", background: "#ccc" }}
                  ></span>
                </p>

                <button
                  className="btn-custom-link small text-dark font-weight-bold text-uppercase p-0"
                  // onClick={handleSubmit(onSubmit)}
                  // disabled={disabled}
                  type="button"
                  onClick={() => history.goBack()}
                >
                  Noticed a typo? fix your email address
                </button>
              </div>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="register px-3 pt-4 min-vh-100 bg-white"
          style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h2 className="pf-title mt-7">Check your email</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pf-login container"
          >
            <div className="row">
              <div className="col-12 mb-5">
                <p className="text-center text-secondary small">
                  We sent a 4-digit code to {state.welcomeUser.email}. <br />
                  Please enter it below. <br />
                  Can't find it? Check your span folder
                </p>
              </div>

              <div
                className="col-12 text-center"
                style={{ marginBottom: "5rem" }}
              >
                <img src="/images/verify-email.png" width="180px" />
              </div>
            </div>

            <div className="row">
              <div className="form-group col-3">
                <input
                  className="form-control text-center"
                  type="text"
                  name="digit1"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]{1}$/i,
                  })}
                  onKeyUp={nextInput}
                  maxLength="1"
                  autoFocus
                />

                {errors.digit1 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group col-3">
                <input
                  className="form-control text-center"
                  type="text"
                  name="digit2"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]{1}$/i,
                  })}
                  onKeyUp={nextInput}
                  maxLength="1"
                />

                {errors.digit2 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group col-3">
                <input
                  className="form-control text-center"
                  type="text"
                  name="digit3"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]{1}$/i,
                  })}
                  onKeyUp={nextInput}
                  maxLength="1"
                />

                {errors.digit3 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group col-3">
                <input
                  className="form-control text-center"
                  type="text"
                  name="digit4"
                  ref={register({
                    required: true,
                    pattern: /^[0-9]{1}$/i,
                  })}
                  onKeyUp={nextInput}
                  maxLength="1"
                />

                {errors.digit4 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>
            </div>

            <div className="text-center mx-auto" style={{ width: "25rem" }}>
              <button
                className="btn-custom-link mt-5 small text-dark font-weight-bold text-uppercase"
                onClick={sendVerifyCode}
                disabled={disabled}
                type="button"
              >
                Resend the code
              </button>

              <p className="my-0 d-flex justify-content-center align-items-center">
                <span
                  className="flex-fill"
                  style={{ height: "2px", background: "#ccc" }}
                ></span>
                <span className="mx-5">or</span>
                <span
                  className="flex-fill"
                  style={{ height: "2px", background: "#ccc" }}
                ></span>
              </p>

              <button
                className="btn-custom-link small text-dark font-weight-bold text-uppercase p-0"
                // onClick={handleSubmit(onSubmit)}
                // disabled={disabled}
                type="button"
                onClick={() => history.goBack()}
              >
                Noticed a typo? fix your email address
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
}
