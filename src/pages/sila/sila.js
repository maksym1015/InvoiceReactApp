import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import { pageVariants } from "../../utils/transitions";
import { notify } from "../../utils/helpers";
import api from "../../utils/api";
import { store } from "../../store";

import Loader from "../../components/Loader";

export default function Sila() {
  const { state, dispatch } = useContext(store);
  const { register, handleSubmit, errors, setValue } = useForm();
  const history = useHistory();

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // handle form submission
  const onSubmit = (data) => {
    let names = data.name.split(" ");
    let handle =
      data.name.toLowerCase().replace(" ", "_") + state.user.id + "_honeydu";

    let formData = {
      handle: state.user.username ? state.user.username : handle,
      firstName: names[0] ? names[0] : "",
      lastName: names[1] ? names[1] : "",
      address: data.address,
      city: data.city,
      state: data.state,
      zip: data.zip,
      phone: data.phone,
      email: state.user.email,
      dateOfBirth: `${data.year}-${data.month}-${data.day}`,
      ssn: data.ssn,
    };

    silaSignup(formData);
  };

  const silaSignup = (data) => {
    setDisabled(true);
    setLoading(true);

    notify('No bank integration found.', 'error');
    return;

    // api
    //   .post("silas", data)
    //   .then((response) => response.data)
    //   .then((response) => {
    //     if (response.status === "success") {
    //       dispatch({
    //         type: "LOGGEDIN",
    //         payload: { ...state.user, sila: true },
    //       });
    //       notify(response.message);
    //       setDisabled(false);
    //       setLoading(false);
    //       history.replace("home");
    //     }
    //   })
    //   .catch((errors) => {
    //     console.log(errors.response);
    //     notify("Error! Please try again.", "error");
    //     setDisabled(false);
    //     setLoading(false);
    //   });
  };

  const isAge = (year) => new Date().getFullYear() - year >= 18;

  useEffect(() => {
    if (state.user.sila) return history.goBack();

    if (state.user.name) setValue("name", state.user.name);
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="register sila px-3 pt-4 min-vh-100 bg-custom-light text-primary"
      style={{ paddingBottom: "8.7rem" }}
    >
      {loading && <Loader />}

      <p className="font-weight-bold m-3">
        <span>Honeydu</span>
        <button
          className="btn btn-custom-link float-right mr-3 small"
          onClick={() => history.push("/home")}
        >
          do this later
        </button>
      </p>

      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)} className="p-4 mt-5">
          <p className="mb-4 font-weight-bold">
            To receive funds through Honeydu, we need a little more
            information...
          </p>

          <div className="form-group">
            <input
              type="text"
              name="name"
              className="form-control"
              placeholder="Enter your full name"
              ref={register({ required: true })}
              autoComplete="off"
            />
            {errors.name && (
              <small className="text-danger">Field is required</small>
            )}
          </div>

          <div className="form-group">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              ref={register({
                required: "Field is required",
                pattern: {
                  value: /^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/,
                  message: "Invalid Pattern (Example: 614-509-2156)",
                },
              })}
              autoComplete="off"
            />
            {errors.phone && (
              <small className="text-danger">{errors.phone.message}</small>
            )}
          </div>

          <small>Enter Birthday</small>

          <div className="form-group dob">
            <div>
              <input
                type="number"
                name="month"
                placeholder="Month"
                ref={register({ required: true })}
              />

              {errors.month && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div>
              <input
                type="number"
                name="day"
                placeholder="Day"
                ref={register({ required: true })}
              />
              {errors.day && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div>
              <input
                type="number"
                name="year"
                placeholder="Year"
                ref={register({
                  required: true,
                  validate: isAge,
                })}
              />
            </div>
          </div>

          {errors.year && errors.year.type === "validate" && (
            <p className="mt-n5">
              <small className="text-danger">Must be 18 years old</small>
            </p>
          )}

          <div className="form-group">
            <input
              type="text"
              name="address"
              className="form-control"
              placeholder="Enter your street address"
              ref={register({ required: true })}
              autoComplete="off"
            />
            {errors.address && (
              <small className="text-danger">Field is required</small>
            )}

            <p className="text-right">
              <small className="extra-small">
                This is not the business address, but your personal address.
              </small>
            </p>
          </div>

          <div className="d-flex">
            <div className="form-group mr-4">
              <input
                type="text"
                name="city"
                className="form-control"
                placeholder="City"
                ref={register({ required: true })}
                autoComplete="off"
              />

              {errors.city && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group mr-4">
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                ref={register({
                  required: "Field is required",
                  maxLength: {
                    value: 2,
                    message: "Should be 2 characters long.",
                  },
                })}
                autoComplete="off"
              />

              {errors.state && (
                <small className="text-danger">{errors.state.message}</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="number"
                name="zip"
                className="form-control"
                placeholder="Zip"
                ref={register({ required: true })}
                autoComplete="off"
              />

              {errors.zip && (
                <small className="text-danger">Field is required</small>
              )}
            </div>
          </div>

          <div className="form-group">
            <input
              type="text"
              name="ssn"
              className="form-control"
              placeholder="Enter your SSN"
              ref={register({
                required: "Field is required",
                pattern: {
                  value: /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/,
                  message: "Invalid Pattern (Example: 292-86-0954)",
                },
              })}
            />

            {errors.ssn && (
              <small className="text-danger">{errors.ssn.message}</small>
            )}

            <p className="text-right">
              <small className="extra-small">
                This is used to verify your identity in compliance with KYC
                standards.
              </small>
            </p>
          </div>
        </form>

        <div className="btn-cta bg-custom-light">
          <p className="text-center small">
            Why do we need this?{" "}
            <a
              target="_blanck"
              href="https://www.barclays.in/content/dam/barclays-in/documents/download-forms/kyc/Importance_of_KYC.pdf"
              className="font-weight-bold"
            >
              Read more
            </a>
          </p>

          <button
            className="btn btn-custom"
            onClick={handleSubmit(onSubmit)}
            disabled={disabled}
          >
            Confirm Identity
          </button>
        </div>
      </div>
    </motion.div>
  );
}
