import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { notify } from "../../../utils/helpers";
import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFVerify() {
  const history = useHistory();
  const { state } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = ({ digit1, digit2, digit3, digit4 }) => {
    verifyUser({ code: digit1 + digit2 + digit3 + digit4 });
  };

  const verifyUser = (data) => {
    console.log("verify user");
    return history.push("/pf-about");

    setDisabled(true);
    setLoading(true);

    api
      .post(`${process.env.REACT_APP_API}/verify`, data)
      .then((response) => {
        if (response.data.user) {
          // localStorage.setItem("honeydu_user", true);

          // dispatch({
          //   type: "LOGGEDIN",
          //   payload: response.data.user,
          // });

          history.push("/pf-about");
        } else {
          notify(response.data.error, "error");

          setDisabled(false);
          setLoading(false);
        }
      })
      .catch((errors) => {
        notify("Error! Please try again later or contact support.", "error");

        setDisabled(false);
        setLoading(false);
      });
  };

  const resendCode = () => {
    setDisabled(true);
    setLoading(true);

    api
      .get(
        `${process.env.REACT_APP_API}/verify?email=${state.welcomeUser.email}`
      )
      .then((response) => {
        if (response.data.message) {
          notify(response.data.message);
        }

        setDisabled(false);
        setLoading(false);
      })
      .catch((errors) => {
        notify("Error! Please try again later or contact support.", "error");

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
  }, []);

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

        <div className="text-center" style={{ marginBottom: "5rem" }}>
          <img src="/images/verify-email.png" width="180px" />
        </div>

        <h2 className="pf-title">Check your email</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pf-login container">
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
                type="text"
                name="digit1"
                className="form-control text-center"
                ref={register({ required: true })}
                autoComplete="off"
                onKeyUp={nextInput}
                autoFocus
              />

              {errors.digit1 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group col-3">
              <input
                type="text"
                name="digit2"
                className="form-control text-center"
                ref={register({ required: true })}
                autoComplete="off"
                onKeyUp={nextInput}
              />

              {errors.digit2 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group col-3">
              <input
                type="text"
                name="digit3"
                className="form-control text-center"
                ref={register({ required: true })}
                autoComplete="off"
                onKeyUp={nextInput}
              />

              {errors.digit3 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group col-3">
              <input
                type="text"
                name="digit4"
                className="form-control text-center"
                ref={register({ required: true })}
                autoComplete="off"
                onKeyUp={nextInput}
              />

              {errors.digit4 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>
          </div>

          <div className="text-center mx-auto" style={{ width: "15rem" }}>
            <button
              className="btn-custom-link mt-5 small text-dark font-weight-bold"
              onClick={resendCode}
              disabled={disabled}
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
              className="btn-custom-link small text-dark font-weight-bold"
              type="button"
            >
              Change email address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
