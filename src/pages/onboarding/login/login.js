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

export default function OBLogin() {
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

          setCompany(response.data.user.companies)

          notify("Success! Logged in.");
          history.replace("/dashboard");
        })
        .catch((errors) => console.log(errors.response));
    });
  };

  const setCompany = (companies) => {
    // set initial company
    if (companies.length) {
      let company = companies.find(
        (c) => c.id == localStorage.getItem("honeydu_company")
      );

      // console.log(company, localStorage.getItem("honeydu_company"));

      if (company) {
        dispatch({
          type: "SET_COMPANY",
          payload: company,
        });
      } else {
        dispatch({
          type: "SET_COMPANY",
          payload: companies[0],
        });

        localStorage.setItem(
          "honeydu_company",
          companies[0].id
        );
      }
    }
  }

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

            <h2 className="pf-title">Log in to Honeydu</h2>

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
                    <FontAwesomeIcon
                      icon={togglePassword ? faEyeSlash : faEye}
                    />
                  </span>
                </div>

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
                Log in
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
                Don't have an account?
                <br />
                <Link to="/signup" className="font-weight-bold text-uppercase">
                  Sign up
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
          style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h3 className="text-primary mt-5 ml-4 font-weight-bold">
            Log in to Honeydu
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

              <div className="form-group mb-5">
                <div className="position-relative">
                  <input
                    type={togglePassword ? "text" : "password"}
                    name="password"
                    className="form-control"
                    placeholder="Password"
                    ref={register({
                      required: "Field is required",
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
                Log in
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
                Don't have an account?
                <br />
                <Link to="/signup" className="font-weight-bold text-uppercase">
                  Sign up
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
