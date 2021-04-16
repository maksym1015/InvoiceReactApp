import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { notify } from "../../../utils/helpers";
import { store } from "../../../store";
import api from "../../../utils/api";

import Loader from "../../../components/Loader";
import {
  faChevronLeft,
  faEye,
  faEyeDropper,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function PFLocation() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, errors } = useForm();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [togglePassword, setTogglePassword] = useState(false);

  // handle form submission
  const onSubmit = ({ address1, address2 }) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: { ...state.welcomeUser, address1, address2 },
    });

    console.log("Create user");
  };

  useEffect(() => {
    if (!state.welcomeUser.type) return history.goBack();
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

        <h2 className="pf-title">Where is Honeydu located?</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="pf-login container">
          <div className="form-group">
            <label>Company address</label>
            <input
              type="text"
              name="address1"
              className="form-control"
              ref={register({ required: true })}
              autoComplete="off"
            />

            {errors.address1 && (
              <small className="text-danger">Field is required</small>
            )}
          </div>
          <div className="form-group">
            <label>Address line 2</label>
            <input
              type="text"
              name="address2"
              className="form-control"
              ref={register({ required: true })}
              autoComplete="off"
            />

            {errors.address2 && (
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
