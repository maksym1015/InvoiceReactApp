import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faTimes } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";

export default function NewCompany() {
  const { register, handleSubmit, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const onSubmit = ({ name, address1, address2 }) => {
    dispatch({
      type: "SET_WELCOME_COMPANY",
      payload: { name, address1, address2 },
    });

    history.push("/company/owner");
  };

  return (
    <div className="ob new-company">
      <div class="new-company__header mb-5 mb-xxl-0">
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.goBack("/company")}
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
        <div class="new-company__progress-bar--wrapper">
          <div class="new-company__progress-bar--path">
            <div
              class="new-company__progress-bar--progress"
              style={{ width: "50%" }}
            ></div>
          </div>
        </div>
        <div
          class="new-company__icon--wrapper"
          onClick={() => history.goBack("/company")}
        >
          <FontAwesomeIcon icon={faTimes} />
        </div>
      </div>
      <div className="d-flex flex-column flex-fill align-items-center justify-content-lg-center w-100 h-100">
        <div className="pf-inner w-100">
          <h2 className="pf-title pb-4">Add a new company</h2>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="pf-login d-flex flex-column align-items-center w-100"
          >
            <div className="form-group w-100">
              <label>Company name (DBA)</label>
              <input
                type="text"
                name="name"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={state.welcomeCompany.name}
                autoComplete="off"
              />

              {errors.name && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group w-100">
              <label>Company address</label>
              <input
                type="text"
                name="address1"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={state.welcomeCompany.address1}
                autoComplete="off"
                placeholder="Ex.: 177a Bleecker Street, New York, NY, USA"
              />

              {errors.address1 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group w-100 pb-5 mb-5">
              <label>Address line</label>
              <input
                type="text"
                name="address2"
                className="form-control"
                ref={register({ required: true })}
                defaultValue={state.welcomeCompany.address2}
                autoComplete="off"
              />

              {errors.address2 && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <button
              className="btn btn-custom w-50 py-4 mt-5"
              onClick={handleSubmit(onSubmit)}
            >
              Continue
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
