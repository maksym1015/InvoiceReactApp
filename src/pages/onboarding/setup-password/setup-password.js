import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";
import FormErrors from "../../../components/FormErrors";
import { notify } from "../../../utils/helpers";
import axios from "axios";

export default function SetupPassword(props) {
  const { register, handleSubmit, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();
  const { code } = useParams();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");
  const [isDesktop, setIsDesktop] = useState("");

  const onSubmit = ({ email, password, confirm_password }) => {
    let data = {
      ...state.welcomeUser,
      email,
      password,
      confirm_password,
    };

    if (password !== confirm_password) {
      return notify("Password not matched", "error");
    }

    registerEmployee(data);
  };

  const registerEmployee = (data) => {

    setDisabled(true);
    setLoading(true);
    setFormErrors("");

    api
      .put(`${process.env.REACT_APP_API}/companies/register-employee`, {
        code: code,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirm_password,
      })
      .then((response) => {
        notify("You successfully setup your password.", "success");

        // notify("Great! Let's build your business profile");
        history.push("/login");
      })
      .catch((errors) => {
        // setFormErrors(errors.response.data.errors);
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
          style={{ paddingBottom: "10rem" }}
        >
          {/* <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link> */}

          <div className="pf-inner">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <h2 className="pf-title">Setup your password</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pf-login container"
            >
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

              <div className="row">
                <div className="form-group col-sm-6">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    ref={register({ required: true })}
                    autoComplete="off"
                  />

                  {errors.password && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>
                <div className="form-group col-sm-6">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirm_password"
                    className="form-control"
                    ref={register({ required: true })}
                    autoComplete="off"
                  />

                  {errors.confirm_password && (
                    <small className="text-danger">Field is required</small>
                  )}
                </div>
              </div>

              <button
                className="btn btn-custom mt-5 mb-5"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Save
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
            Setup your password.
          </h3>

          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5">
              <div className="form-group mb-5">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.email && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-control"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.password && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                <input
                  type="password"
                  name="confirm_password"
                  className="form-control"
                  placeholder="Confirm Password"
                  ref={register({ required: true })}
                  autoComplete="off"
                />

                {errors.confirm_password && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              {formErrors && <FormErrors errors={formErrors} />}
            </form>

            <div className="btn-cta bg-custom-light">
              <button
                className="btn btn-custom"
                onClick={handleSubmit(onSubmit)}
                disabled={disabled}
              >
                Save
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
