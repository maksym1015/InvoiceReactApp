import React, { useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera } from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import api from "../utils/api";

import TextField from "./TextField";
import Loader from "./Loader";
import { notify } from "../utils/helpers";

export default function CompanySettings() {
  const { state, dispatch } = useContext(store);

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [name, setName] = useState(state.company.name);
  const [address1, setAddress1] = useState(state.company.address1);
  const [address2, setAddress2] = useState(state.company.address2);

  const [phone, setPhone] = useState(state.user.phone);
  const [firstName, setFirstName] = useState(state.user.first_name);
  const [lastName, setLastName] = useState(state.user.last_name);

  const [legalName, setLegalName] = useState("No legal business name");
  const [legalAddress, setLegalAddress] = useState("No legal business address");
  const [taxIDType, setTaxIDType] = useState("No Tax ID type");
  const [taxID, setTaxID] = useState("No Tax ID");

  const onSave = () => {
    saveCompany();
  };

  const saveCompany = () => {
    setDisabled(true);
    setLoading(true);

    let data = {
      name,
      address1,
      address2,
      legalName,
      legalAddress,
      tax_id_type: taxIDType,
      tax_id: taxID,
      user: { phone, first_name: firstName, last_name: lastName },
    };

    api
      .put(`/companies/${state.company.id}`, data)
      .then((response) => {
        if (response.data.company) {
          notify("Company settings updated.");

          dispatch({ type: "SET_COMPANY", payload: response.data.company });
        }

        setDisabled(false);
        setLoading(false);
        setEditing(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        setDisabled(false);
      });
  };

  return (
    <div className="company-settings">
      {loading && <Loader />}
      <div className="updated-settings__card">
        <div className="px-4 py-5 p-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold">
              Company information
            </div>
            {editing ? (
              <button
                type="button"
                className="btn btn-settings"
                onClick={onSave}
                disabled={disabled}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-settings"
                onClick={() => setEditing(true)}
              >
                Edit
              </button>
            )}
          </div>

          {editing ? (
            <>
              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Business name"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Business address"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Business address 2"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Mobile number"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Contact first name"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Contact last name"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Business name
                </h4>
                <p className="textM__font-size">{state.company.name}</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Business address
                </h4>
                <p className="textM__font-size">{state.company.address1}</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Business address 2
                </h4>
                <p className="textM__font-size">Shreveport, LA, US</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Mobile number
                </h4>
                <p className="textM__font-size">{state.user.phone}</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Contact first name
                </h4>
                <p className="textM__font-size">{state.user.first_name}</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Contact last name
                </h4>
                <p className="textM__font-size">{state.user.last_name}</p>
              </div>
            </>
          )}

          <br />

          <div className="updated-settings__headingM displayM__font-size font-weight-bold">
            Tax Forms
          </div>
          <p className="textM__font-size">
            Classify and export a .CSV file of your payments for your annual
            1099 forms.
          </p>
          <div className="d-inline-block mt-3">
            <button type="button" className="btn btn-settings">
              Classify and export
            </button>
          </div>
          <br />
          <br />
          <br />

          <div className="updated-settings__headingM displayM__font-size font-weight-bold">
            Company legal information
          </div>

          {editing ? (
            <>
              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Legal business name"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={legalName}
                  onChange={(e) => setLegalName(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Business’s legal address"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={legalAddress}
                  onChange={(e) => setLegalAddress(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Tax ID type"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={taxIDType}
                  onChange={(e) => taxIDType(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  variant="standard"
                  label="Tax ID number"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={taxID}
                  onChange={(e) => setTaxID(e.target.value)}
                />
              </div>
            </>
          ) : (
            <>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Legal business name
                </h4>
                <p className="textM__font-size">No legal business name</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Business’s legal address
                </h4>
                <p className="textM__font-size">No legal business address</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Tax ID type
                </h4>
                <p className="textM__font-size">No Tax ID type</p>
              </div>
              <div className="mt-4">
                <h4 className="company-settings__headingS textSBold__font-size">
                  Tax ID number
                </h4>
                <p className="textM__font-size">No Tax ID</p>
              </div>
            </>
          )}

          <br />

          <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-4">
            Company logo
          </div>
          <div className="upload-company-logo__wrapper">
            <div className="upload-company-logo__container">
              <div className="upload-company-logo__wrapper position-relative">
                <div className="upload-company-logo__company-name-initials">
                  A
                </div>
                <div className="upload-company-logo__add-logo-container">
                  <FontAwesomeIcon icon={faCamera} />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  className="upload-company-logo__file-input"
                />
              </div>
            </div>
            <div className="ml-4">
              <p className="upload-company-logo__logo-help-text">
                Upload your company logo
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
