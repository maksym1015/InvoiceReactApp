import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { store } from "../../../store";
import {
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFAbout() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);

  const onSubmit = ({ first_name, last_name, phone }) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: { ...state.welcomeUser, first_name, last_name, phone },
    });

    history.push("pf-company");
  };

  useEffect(() => {
    if (!state.welcomeUser.email) return history.goBack();
  }, []);

  return (
    <div className="pf">
      <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </Link>

      <div className="pf-inner">
        <Link to="/" className="d-block text-center mb-5">
          <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
        </Link>

        <h2 className="pf-title">First, tell us as little about yourself</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pf-login container">
          <div className="row">
            <div className="form-group col-sm-6">
              <label>First name</label>
              <input
                type="text"
                name="first_name"
                placeholder="Harry"
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
                placeholder="Potter"
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
            <label>Mobile phone number</label>
            <input
              type="text"
              name="phone"
              placeholder=""
              className="form-control"
              ref={register({ required: true })}
              autoComplete="off"
            />
            <small>Minimum 8 characters with at least 1 number</small><br />

            {errors.phone && (
              <small className="text-danger">Field is required</small>
            )}
          </div>

          <button
            className="btn btn-custom mt-5"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}
