import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";
import api from "../../utils/api";
import { notify } from "../../utils/helpers";

import FormErrors from "../../components/FormErrors";
import Loader from "../../components/Loader";

export default function CompanyDetails() {
  const { register, handleSubmit, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState("");

  const onSubmit = ({ first_name, last_name, phone }) => {
    saveCompany({
      ...state.welcomeCompany,
      user: { first_name, last_name, phone },
    });
  };

  const saveCompany = (data) => {
    setDisabled(true);
    setLoading(true);
    setFormErrors("");

    api
      .post(`${process.env.REACT_APP_API_URI}companies`, data)
      .then((response) => {
        if (response.data.company) {
          dispatch({
            type: "LOGGEDIN",
            payload: {
              ...state.user,
              companies: [...state.user.companies, response.data.company],
            },
          });

          notify("Company added successfully.");
          history.push("/company");
        }
      })
      .catch((errors) => {
        setFormErrors(errors.response.data.errors);
        setDisabled(false);
        setLoading(false);
      });
  };

  return (
    <div className="ob new-company">
      {loading && <Loader />}
      <div class="new-company__header mb-5 mb-xxl-0">
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.goBack()}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div class="new-company__progress-bar--wrapper">
          <div class="new-company__progress-bar--path">
            <div
              class="new-company__progress-bar--progress"
              style={{ width: "100%" }}
            ></div>
          </div>
        </div>
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.push("/company")}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="d-flex flex-column flex-fill align-items-center justify-content-lg-center w-100 h-100">
        <div className="pf-inner w-100">
          <h2 className="pf-title mb-4">Review your details</h2>

          <p className="text-center pb-3 mb-5">
            Please confirm or edit the details below.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pf-login d-flex flex-column align-items-center w-100"
          >
            <div className="row">
              <div className="form-group col-sm-6">
                <label>First name</label>
                <input
                  type="text"
                  name="first_name"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={state.user.first_name}
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
                  defaultValue={state.user.last_name}
                  autoComplete="off"
                />

                {errors.last_name && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>
            </div>

            <div className="form-group w-100">
              <label>Mobile phone number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={state.user.phone}
                autoComplete="off"
              />

              <br />

              {errors.phone && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <button
              className="btn btn-custom py-4 mt-5 mb-5"
              onClick={handleSubmit(onSubmit)}
              disabled={disabled}
            >
              Confirm and add new company
            </button>

            {formErrors && <FormErrors errors={formErrors} />}
          </form>
        </div>
      </div>
    </div>
  );
}
