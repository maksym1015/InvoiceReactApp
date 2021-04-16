import React, { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import api from "../../api";

import { usePlaidLink } from "react-plaid-link";

import { notify } from "../../helpers";

export default function AddBank() {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const [step, setStep] = useState(1);

  // handle form submission
  const onSubmit = (data) => {
    // demo data - remove later
    let formData = {
      handle: "hello_zubiraia",
      firstName: "Devin",
      lastName: "Randall",
      address: "2233 Quilly Lane",
      city: "Columbus",
      state: "OH",
      zip: "43215",
      phone: "614-509-2156",
      email: "ycjf@o.spamtrap.ro",
      dateOfBirth: "1990-01-01",
      ssn: "292-86-0954",
    };

    formData.handle = data.handle;

    silaSignup(formData);
  };

  // step 1
  const silaSignup = (data) => {
    api
      .post("silas", data)
      .then((response) => response.data)
      .then((response) => {
        if (response.status === "success") {
          notify("Success! Please proceed to step 2");
          setStep(2);
        }
      })
      .catch((errors) => {
        if (errors.response.data.status === "fail") {
          notify("Account already exists, going to step 2.");
          setStep(2);
        }
      });
  };

  // step 2
  const requestKYC = (e) => {
    e.preventDefault();

    api
      .post("silas/request-kyc", {})
      .then((response) => response.data)
      .then((response) => {
        if (response.status === "success") {
          notify(response.message);
        }
      })
      .catch((errors) => console.log(errors.response));
  };

  const checkKYC = (e) => {
    e.preventDefault();

    api
      .get("silas/check-kyc", {})
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          notify(response.data.message);
          setStep(3);
        }
      })
      .catch((errors) => console.log(errors.response));
  };

  // step 3 add bank
  const onSuccess = useCallback((token, metadata) => {
    api
      .post("silas/link-bank-account", { public_token: token })
      .then((response) => {
        if (response.data.status === "success") {
          notify(response.data.message);
          history.goBack();
        }
      })
      .catch((errors) => {
        // console.log(errors.response);
        if (errors.response.data.status === "fail") {
          notify(errors.response.data.error.message, "error");

          errors.response.data.error.type === "sila" ? setStep(1) : setStep(2);
        }
      });
  }, []);

  const onExit = useCallback((err, metadata) => {
    console.log(err, metadata);
  });

  const config = {
    publicKey: "fa9dd19eb40982275785b09760ab79",
    env: "sandbox",
    clientName: "Plaid Quickstart",
    countryCodes: ["US"],
    product: ["auth"],
    language: "en",

    onSuccess,
    onExit,
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <div className="mobile-layer px-4 pb-3">
      <div className="py-4">
        <button
          onClick={() => history.goBack()}
          className="position-absolute btn-custom-link p-0"
        >
          Cancel
        </button>

        <p className="text-center font-weight-bold">Add Bank</p>
      </div>

      {/* Step 1 - Sila Account Creation */}
      {step === 1 && (
        <>
          <div>
            <p className="font-weight-bold mb-0">
              <span className="step">Step 1</span> Apply for Sila
            </p>
            <p className="small">
              Please enter below details to create sila account and get your
              digital wallet now.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="sila-signup">
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                className="form-control"
                placeholder="First Name"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.firstName && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Last Name"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.lastName && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="handle"
                className="form-control"
                placeholder="Username"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.handle && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Address"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.address && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <input
                type="text"
                name="state"
                className="form-control"
                placeholder="State"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.state && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
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

            <div className="form-group">
              <input
                type="text"
                name="phone"
                className="form-control"
                placeholder="Phone"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.phone && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
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

            <div className="form-group">
              <input
                type="date"
                name="dateOfBirth"
                className="form-control"
                placeholder="Date of Birth"
                ref={register({ required: true })}
                autoComplete="off"
              />

              {errors.dateOfBirth && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="ssn"
                className="form-control"
                placeholder="SSN"
                ref={register({ required: true })}
                autoComplete="off"
              />
              {errors.ssn && (
                <small className="text-danger">Field is required</small>
              )}
            </div>

            <button onClick={handleSubmit(onSubmit)}>Next</button>
            <div
              className="small text-custom-primary text-center mt-3"
              onClick={() => setStep(2)}
            >
              Already have Sila account? Click here to go on next step.
            </div>
          </form>
        </>
      )}

      {/* Step 2 - KYC Request */}
      {step === 2 && (
        <>
          <div>
            <p className="font-weight-bold mb-0">
              Step 2: Requst KYC Verification
            </p>
            <p className="small">
              Please click below button to request for KYC Verifications.
            </p>
          </div>

          <div className="sila-signup">
            <button onClick={requestKYC}>Request KYC Verification</button>

            <button onClick={checkKYC}>Check KYC</button>

            <div
              className="small text-custom-primary text-center mt-3"
              onClick={() => setStep(3)}
            >
              Already have KYC Verifications? Click here to go on next step.
            </div>
          </div>
        </>
      )}

      {/* Step 3 - Add Bank */}
      {step === 3 && (
        <>
          <div>
            <p className="font-weight-bold mb-0">Step 3: Add Bank Account</p>
            <p className="small">
              Please click below button to add Bank Account.
            </p>
          </div>

          <div className="sila-signup">
            <button onClick={() => open()} className="btn-add-bank mb-0">
              Add Bank
            </button>
          </div>
        </>
      )}
    </div>
  );
}
