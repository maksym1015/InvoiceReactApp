import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";
import FormErrors from "../../../components/FormErrors";

export default function OBAboutUser() {
  const { register, handleSubmit, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [isDesktop, setIsDesktop] = useState("");

  const onSubmit = ({ first_name, last_name, phone }) => {
    let data = {
      ...state.welcomeUser,
      first_name,
      last_name,
      phone,
    };

    dispatch({
      type: "SET_WELCOME_USER",
      payload: data,
    });

    // history.push("/about-company");
    saveUser(data);
  };

  const saveUser = (data) => {
    setDisabled(true);
    setLoading(true);
    setFormErrors("");

    api.get(`${process.env.REACT_APP_API}/sanctum/csrf-cookie`).then(() => {
      api
        .post(`${process.env.REACT_APP_API}/register`, data)
        .then((response) => {
          if (response.data.user) {
            // make decision - should we allow user to login if not verified yet?
            localStorage.setItem("honeydu_user", true);

            dispatch({
              type: "LOGGEDIN",
              payload: response.data.user,
            });

            // notify("Great! Let's build your business profile");
            history.push("/about-company");
          }
        })
        .catch((errors) => {
          setFormErrors(errors.response.data.errors);
          setDisabled(false);
          setLoading(false);
        });
    });
  };

  useEffect(() => {
    if (!state.welcomeCompany.type) return history.goBack();

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

          <div className="pf-inner">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <h2 className="pf-title">First, tell us about yourself</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pf-login container"
            >
              <div className="row">
                <div className="form-group col-sm-6">
                  <label>First name</label>
                  <input
                    type="text"
                    name="first_name"
                    className="form-control"
                    ref={register({ required: true })}
                    autoComplete="off"
                  />

                  {errors.first_name && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>
                <div className="form-group col-sm-6">
                  <label>Last name</label>
                  <input
                    type="text"
                    name="last_name"
                    className="form-control"
                    ref={register({ required: true })}
                    autoComplete="off"
                  />

                  {errors.last_name && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Mobile number</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                <small className="text-secondary">
                  The best number to reach you
                </small>
                <br />

                {errors.phone && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              {/* <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
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

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}

                <p className="text-right">
                  <small className="extra-small">
                    Must be 8+ characters, A-Z, 123
                  </small>
                </p>
              </div> */}

              <button
                className="btn btn-custom mt-5 mb-5"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Continue
              </button>

              {formErrors && <FormErrors errors={formErrors} />}
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
            First, tell us about yourself
          </h3>

          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5">
              <div className="form-group mb-5">
                <input
                  type="text"
                  name="first_name"
                  placeholder="First name"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.first_name && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                <input
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.last_name && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Mobile number"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                <small>The best number to reach you</small>
                <br />

                {errors.phone && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              {/* <div className="form-group mb-5">
                <input
                  type="password"
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

                {errors.password && (
                  <small className="text-danger">
                    {errors.password.message}
                  </small>
                )}

                <p className="text-right">
                  <small className="extra-small">
                    Must be 8+ characters, A-Z, 123
                  </small>
                </p>
              </div> */}

              {formErrors && <FormErrors errors={formErrors} />}
            </form>

            <div className="btn-cta bg-custom-light">
              <button
                className="btn btn-custom"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
