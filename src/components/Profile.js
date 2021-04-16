import React, { useContext, useEffect, useState } from "react";
import Switch from "react-switch";
import { store } from "../store";
import api from "../utils/api";
import { notify } from "../utils/helpers";

import TextField from "./TextField";

export default function Profile() {
  const { state, dispatch } = useContext(store);

  const [isEditing, setIsEditing] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const [first_name, setFirst_name] = useState(state.user.first_name);
  const [last_name, setLast_name] = useState(state.user.last_name);

  const [multiCompany, setMultiCompany] = useState(state.multiCompany);
  const [remindMe, setRemindMe] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSave = () => {
    if (!first_name || !last_name)
      return notify("Please fill out the form.", "error");

    saveUser();
  };

  const saveUser = () => {
    setDisabled(true);
    setLoading(true);

    let data = { first_name, last_name };

    api
      .put(`/users/${state.user.id}`, data)
      .then((response) => {
        if (response.data.success) {
          dispatch({
            type: "LOGGEDIN",
            payload: { ...state.user, ...data },
          });

          notify(response.data.message);
        }

        setDisabled(false);
        setLoading(false);
        setIsEditing(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        setDisabled(false);
      });
  };

  const onPasswordSave = () => {
    // validate password
    if (!currentPassword || !password || !confirmPassword)
      return notify("Please fill out form", "error");

    if (password !== confirmPassword)
      return notify("Password mismatched", "error");

    savePassword();
  };

  const savePassword = () => {
    setDisabled(true);
    setLoading(true);

    let data = { password, password_confirmation: confirmPassword };

    api
      .put(`/users/update-password`, data)
      .then((response) => {
        if (response.data.message === "Unauthenticated") {
          notify("Password changed successfully, please login again.");
          dispatch({ type: "LOGGEDOUT" });
          return;
        }

        if (response.data.success) {
          notify("Password changed successfully.");
        }

        setDisabled(false);
        setLoading(false);
        setIsEditingPassword(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    dispatch({ type: "SET_MULTI_COMPANY", payload: multiCompany });
  }, [multiCompany]);

  return (
    <div className="profile-settings">
      <div className="updated-settings__card">
        <div className="px-4 py-5 p-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold">
              Profile information
            </div>

            {isEditing ? (
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
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="mt-4">
            <TextField
              variant="standard"
              label="Email"
              labelClassName="textSBold__font-size"
              inputTagClassName="textM__font-size"
              value={state.user.email}
              disabled={true}
            />
          </div>
          <div className="mt-4">
            <TextField
              variant="standard"
              label="First name"
              labelClassName="textSBold__font-size"
              inputTagClassName="textM__font-size"
              value={first_name}
              onChange={(e) => setFirst_name(e.target.value)}
              disabled={isEditing ? false : true}
            />
          </div>
          <div className="mt-4">
            <TextField
              variant="standard"
              label="Last name"
              labelClassName="textSBold__font-size"
              inputTagClassName="textM__font-size"
              value={last_name}
              onChange={(e) => setLast_name(e.target.value)}
              disabled={isEditing ? false : true}
            />
          </div>
          <div className="mt-4">
            <TextField
              variant="standard"
              label="Role"
              labelClassName="textSBold__font-size"
              inputTagClassName="textM__font-size"
              value="Owner"
              disabled
            />
          </div>
        </div>
      </div>

      <div className="updated-settings__card">
        <div className="px-4 py-5 p-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold">
              Multi-company dashboard
            </div>
            <Switch
              onChange={setMultiCompany}
              checked={multiCompany}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#00D227"
              width={48}
            />
          </div>
          <p className="textM__font-size mt-4">
            Oversee the AP/AR for multiple companies in one view, with one sign
            in. Perfect for accountants, bookkeepers, and owners of multiple
            companies.
          </p>
        </div>
      </div>

      <div className="updated-settings__card">
        <div className="px-4 py-5 p-md-5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold">
              Change password
            </div>
            {isEditingPassword ? (
              <button
                type="button"
                className="btn btn-settings"
                onClick={onPasswordSave}
              >
                Save
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-settings"
                onClick={() => setIsEditingPassword(true)}
              >
                Edit
              </button>
            )}
          </div>
          <div className="mt-4">
            <TextField
              type="password"
              variant="standard"
              label="Current password"
              labelClassName="textSBold__font-size"
              inputTagClassName="textM__font-size"
              placeholder="********"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              disabled={isEditingPassword ? false : true}
            />
          </div>

          {isEditingPassword && (
            <>
              <div className="mt-4">
                <TextField
                  type="password"
                  variant="standard"
                  label="New password"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="mt-4">
                <TextField
                  type="password"
                  variant="standard"
                  label="Confirm password"
                  labelClassName="textSBold__font-size"
                  inputTagClassName="textM__font-size"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </>
          )}
        </div>
      </div>
      <div className="updated-settings__card">
        <div className="px-4 py-5 p-md-5">
          <div className="updated-settings__headingM displayM__font-size font-weight-bold">
            Email notifications
          </div>
          <div className="d-flex justify-content-between align-items-center mt-4">
            <p className="textM__font-size">
              Remind me when a bill’s due date is near
            </p>
            <Switch
              onChange={setRemindMe}
              checked={remindMe}
              uncheckedIcon={false}
              checkedIcon={false}
              onColor="#00D227"
              width={48}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
