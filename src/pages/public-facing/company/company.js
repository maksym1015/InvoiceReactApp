import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { store } from "../../../store";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFCompany() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);

  const onSubmit = ({ company }) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: { ...state.welcomeUser, company },
    });

    history.push("pf-type");
  };

  useEffect(() => {
    if (!state.welcomeUser.first_name) return history.goBack();
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

        <h2 className="pf-title">Now tell us about your company</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pf-login">
          <div className="form-group">
            <label>What's the name of your company? The DBA</label>
            <input
              type="company"
              name="company"
              className="form-control"
              ref={register({ required: true })}
              autoComplete="off"
            />

            {errors.company && (
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
