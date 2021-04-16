import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { notify } from "../../utils/helpers";

import { store } from "../../store";
import api from "../../utils/api";
import Loader from "../../components/Loader";

export default function SilaLogin() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [phoneInvalid, setPhoneInvalid] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [year, setYear] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [userState, setUserState] = useState("");
  const [zip, setZip] = useState("");
  const [ssn, setSsn] = useState("");

  const onSubmit = () => {
    // name validation
    if (step === 1 && name === "") {
      setDisabled(true);
      return errroMessage("Name");
    }

    // phone validations
    if (step === 2 && phone === "") {
      setDisabled(true);
      return errroMessage("Phone number");
    }

    if (
      step === 2 &&
      !/^([0-9]( |-)?)?(\(?[0-9]{3}\)?|[0-9]{3})( |-)?([0-9]{3}( |-)?[0-9]{4}|[a-zA-Z0-9]{7})$/.test(
        phone
      )
    ) {
      setDisabled(true);
      setPhoneInvalid(true);
      return notify("Invalid Phone Pattern", "error");
    }

    // date of birthday validation
    if (step === 3 && (month === "" || day === "" || year === "")) {
      setDisabled(true);
      return errroMessage("Date of Birth");
    }

    if (step === 3 && ((new Date()).getFullYear() - year) < 18) {
      setDisabled(true);
      return notify("Must be 18 years old.", "error");
    }

    // address validation
    if (step === 4 && address === "") {
      setDisabled(true);
      return errroMessage("Address");
    }

    if (step === 4 && city === "") {
      setDisabled(true);
      return errroMessage("City");
    }

    if (step === 4 && userState === "") {
      setDisabled(true);
      return errroMessage("State");
    }

    if (step === 4 && userState.length > 2) {
      setDisabled(true);
      return notify("Should be 2 characters long.", "error");
    }

    if (step === 4 && zip === "") {
      setDisabled(true);
      return errroMessage("Zip");
    }

    if (step === 5 && ssn === "") {
      setDisabled(true);
      return errroMessage("SSN");
    }

    if (step === 5 && !/^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/.test(ssn)) {
      setDisabled(true);
      return notify("Invalid SSN Pattern", "error");
    }

    if (step >= 1 && step < 5) {
      return setStep(step + 1);
    }

    silaSignup();
  };

  const errroMessage = (name, type = "error") => {
    notify(`${name} is required.`, type);
  };

  const silaSignup = () => {
    let names = name.split(" ");
    let handle =
      name.toLowerCase().replace(" ", "_") + state.user.id + "_honeydu";

    let data = {
      handle: state.user.username ? state.user.username : handle,
      firstName: names[0] ? names[0] : "",
      lastName: names[1] ? names[1] : "",
      address,
      city,
      state: userState,
      zip,
      phone,
      email: state.user.email,
      dateOfBirth: `${year}-${month}-${day}`,
      ssn,
    };

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
    //       history.goBack();
    //     }
    //   })
    //   .catch((errors) => {
    //     console.log(errors.response);
    //     notify("Error! Please try again.", "error");
    //     setDisabled(false);
    //     setLoading(false);
    //   });
  };

  useEffect(() => {
    if (state.user.sila) return history.goBack();

    if (state.user.name) {
      setName(state.user.name);
    }

    if (step === 1 && name) {
      setDisabled(false);
    }

    if (step === 2 && phone) {
      setDisabled(false);
    }

    if (step === 3 && (month || day || year)) {
      setDisabled(false);
    }

    if (step === 4 && (address || city || userState || zip)) {
      setDisabled(false);
    }

    if (step === 5 && ssn) {
      setDisabled(false);
    }
  }, [name, phone, month, day, year, address, city, userState, zip, ssn]);

  return (
    <div className="register sila min-vh-92 bg-white">
      {loading && <Loader />}

      <div className="py-4 px-3">
        <button
          onClick={() => history.goBack()}
          className="position-absolute btn-custom-link p-0"
        >
          Cancel
        </button>

        <p className="text-center font-weight-bold">Confirm Identity</p>
      </div>

      <ul className="connecting-dots">
        <li className={step >= 1 ? "active" : ""}></li>
        <li className={step >= 2 ? "active" : ""}></li>
        <li className={step >= 3 ? "active" : ""}></li>
        <li className={step >= 4 ? "active" : ""}></li>
        <li className={step >= 5 ? "active" : ""}></li>
      </ul>

      <form onSubmit={onSubmit} className="p-5 mt-4">
        {step === 1 && (
          <div className="form-group">
            <input
              type="text"
              name="name"
              value={name}
              placeholder="Enter your full name"
              autoComplete="off"
              className="form-control"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        {step === 2 && (
          <div className="form-group">
            <input
              type="text"
              name="phone"
              className="form-control"
              placeholder="Enter your phone number"
              autoComplete="off"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            {phoneInvalid && (
              <p>
                <small>Example: 614-509-2156</small>
              </p>
            )}
          </div>
        )}

        {step === 3 && (
          <>
            <small>Enter Birthday</small>
            <div className="form-group dob">
              <input
                type="number"
                name="month"
                placeholder="Month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
              <input
                type="number"
                name="day"
                placeholder="Day"
                value={day}
                onChange={(e) => setDay(e.target.value)}
              />
              <input
                type="number"
                name="year"
                placeholder="Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </div>{" "}
          </>
        )}

        {step === 4 && (
          <>
            <div className="form-group">
              <input
                type="text"
                name="address"
                className="form-control"
                placeholder="Enter your street address"
                autoComplete="off"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
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
                  autoComplete="off"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div className="form-group mr-4">
                <input
                  type="text"
                  name="state"
                  className="form-control"
                  placeholder="State"
                  autoComplete="off"
                  value={userState}
                  onChange={(e) => setUserState(e.target.value)}
                />
              </div>

              <div className="form-group">
                <input
                  type="number"
                  name="zip"
                  className="form-control"
                  placeholder="Zip"
                  autoComplete="off"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
              </div>
            </div>
          </>
        )}

        {step === 5 && (
          <div className="form-group">
            <input
              type="text"
              name="ssn"
              className="form-control"
              placeholder="Enter your SSN (Example: 292-86-0954)"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
            />

            <p className="text-right">
              <small className="extra-small">
                This is used to verify your identity in compliance with KYC
                standards.
              </small>
            </p>
          </div>
        )}
      </form>

      <div className="btn-cta bg-white">
        <p className="text-center mt-4 small">
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
          onClick={onSubmit}
          disabled={disabled}
        >
          Confirm Identity
        </button>
      </div>
    </div>
  );
}
