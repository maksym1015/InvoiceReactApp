import React, { useContext, useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolder,
  faAngleRight,
  faSearch,
  faPlus,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import api, { cancelToken } from "../utils/api";
import HR from "./HR";
import Avatar from "./Avatar";
import DateRangeField from "./DateRangeField";
import TextField from "./TextField";
import Checkbox from "./Checkbox";
import Modal from "./Modal";
import { notify } from "../utils/helpers";

export default function SettingsManageUsers() {
  const { state } = useContext(store);

  const source = cancelToken.source();

  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [inviteUserRadio, setInviteUserRadio] = useState("admin");
  const [adminApproval, setAdminApproval] = useState(true);
  const [amount, setAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const handleModal = () => {
    setModal(!modal);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let email_pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!(firstName !== "" && firstName.length > 0)) {
      return notify("Please enter first name.", "error");
    }
    if (!(lastName !== "" && lastName.length > 0)) {
      return notify("Please enter last name.", "error");
    }
    if (!(email !== "" && email.length > 0)) {
      return notify("Please enter email.", "error");
    }
    /**
     * Commented Section 1:
     *
     * This section is for payment limit. Details is this
     *    "Require admin approval for any payment that exceeds:"    Enter amount:
     * Right now, this is commented because of non-existence in api endpoint. But this can be useful in future
     */

    // if (
    //   inviteUserRadio !== "" &&
    //   inviteUserRadio.length > 0 &&
    //   inviteUserRadio !== "admin"
    // ) {
    //   if (
    //     adminApproval === true &&
    //     amount !== "" &&
    //     amount > 0 &&
    //     amount.length > 0
    //   ) {
    //     sendInvite();
    //   } else if (adminApproval === false) {
    //     sendInvite();
    //   } else {
    //     return notify("Please enter amount.", "error");
    //   }
    // } else {
    //   sendInvite();
    // }

    if (!email_pattern.test(email)) {
      return notify("Please enter valid email.", "error");
    }

    sendInvite();
  };

  const sendInvite = () => {
    setLoading(true);

    if (state && state.company && state.company.id) {
      api
        .post(`companies/${state.company.id}/invite`, {
          email: email,
          first_name: firstName,
          last_name: lastName,
          role: inviteUserRadio,
        })
        .then((response) => {
          if (response.status == 200) {
            notify("Invite sent successfully", "success");

            setInviteUserRadio("admin");
            setAdminApproval(true);
            setAmount("");
            setFirstName("");
            setLastName("");
            setEmail("");
            handleModal();
          }

          setLoading(false);
        })
        .catch((error) => {
          notify("Failed to send invite.", "error");

          setLoading(false);
        });
    }
  };

  const handleValidation = (fieldType, fieldName, fieldValue) => {
    switch (fieldType) {
      case "email":
        break;
      case "default":
        if (!(fieldValue && fieldValue.length > 0)) {
          return "Please enter value in " + fieldName + ".";
        }
        break;
    }
  };

  useEffect(() => {
    return () => {
      source.cancel("axios request cancelled");
    };
  }, []);

  return (
    <div>
      <div className="settings-export">
        <div className="updated-settings__card">
          <div className="px-4 py-5 p-md-5">
            <div className="manage-users">
              <div className="updated-settings__card">
                <div className="px-4 py-5 p-md-5">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="updated-settings__headingM displayM__font-size font-weight-bold">
                      Users
                    </div>
                    <div>
                      <button
                        onClick={() => setModal(!modal)}
                        className="btn btn-custom d-flex align-items-center justify-content-around px-4 px-lg-5 py-2"
                      >
                        <FontAwesomeIcon icon={faPlus} className="mr-3" />
                        Invite user
                      </button>
                    </div>
                  </div>
                  <div className="d-flex flex-column flex-lg-row justify-content-around mt-5">
                    <div className="d-flex align-items-center w-100">
                      <Avatar className="m-0 mr-4" user="M" />
                      <div className="w-75">
                        <h4 className="textMBold__font-size white-space-nowrap overflow-hidden text-overflow-ellipsis">
                          Abdul Rehman
                          <span className="owner-label ml-4">owner</span>
                        </h4>
                        <p className="textS__font-size m-0">
                          abdul@coral.global
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal show={modal} hideModal={handleModal} maxWidth="56rem">
        <div className="invite-user m-lg-4">
          <div className="invite-user__floating-button" onClick={handleModal}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="displayM__font-size font-weight-bold mb-5">
              Invite a user to join
            </div>
            <div>
              <form className="d-flex flex-column" onSubmit={onSubmit}>
                <div className="textSBold__font-size text-transform-uppercase mb-3">
                  User’s role
                </div>
                <div className="d-flex flex-column align-items-lg-start mb-4">
                  <div className="d-flex flex-column flex-lg-row">
                    <div
                      className={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "admin" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("admin")}
                    >
                      <div className="invite-user__radio"></div>Admin
                    </div>
                    <div
                      className={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "accountant" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("accountant")}
                    >
                      <div className="invite-user__radio"></div>Accountant
                    </div>
                    <div
                      className={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "contributor" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("contributor")}
                    >
                      <div className="invite-user__radio"></div>Contributor
                    </div>
                  </div>
                </div>
                {inviteUserRadio === "admin" && (
                  <div className="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Admins have full access to your Melio account. This includes
                    vendors, bank details, cards, payments and settings. Admins
                    can also approve payments added and scheduled by
                    Contributors.
                  </div>
                )}
                {inviteUserRadio === "accountant" && (
                  <div className="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Accountants and bookkeepers can use this role to manage
                    bills and payments, or sync your QuickBooks and Melio
                    accounts. Admin approval is optional and can be set for
                    scheduled payments that exceed the amount set below.
                  </div>
                )}
                {inviteUserRadio === "contributor" && (
                  <div className="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Use this role for team members that require limited
                    permissions. Contributors can add or modify any bills and
                    payments. Admin approval is optional and can be set for
                    scheduled payments that exceed the amount below.
                  </div>
                )}
                {/*
                 * Commented Section 1:
                 *
                 * This section is for payment limit. Details is this
                 *    "Require admin approval for any payment that exceeds:"    Enter amount:
                 * Right now, this is commented because of non-existence in api endpoint. But this can be useful in future
                 */}
                {/* {inviteUserRadio !== "admin" && (
                  <div className="invite-user__amount-form d-flex flex-row w-100 align-items-start mb-4">
                    <div className="w-100 d-flex justify-content-between flex-fill mr-3">
                      <Checkbox
                        labelClassName="textS__font-size"
                        label="Require admin approval for any payment that exceeds:"
                        onChange={setAdminApproval}
                      />
                    </div>
                    <div className="w-100 d-flex justify-content-between flex-fill ml-3">
                      <TextField
                        type="number"
                        variant="standard"
                        label="Enter amount"
                        textFieldClassName="w-100 mt-0"
                        labelClassName="textSBold__font-size"
                        inputTagClassName="textM__font-size"
                        placeholder="$0.00"
                        onChange={(e) => setAmount(e.target.value)}
                        value={amount}
                        disabled={!adminApproval}
                      />
                    </div>
                  </div>
                )} */}
                <div className="textSBold__font-size text-transform-uppercase mb-4">
                  User’s Details
                </div>
                <div className="mb-5">
                  <div className="d-flex">
                    <TextField
                      variant="standard"
                      label="First name"
                      textFieldClassName="w-100 mr-5 mt-0 mb-4"
                      labelClassName="textSBold__font-size"
                      inputTagClassName="textM__font-size"
                      onChange={(e) => setFirstName(e.target.value)}
                      value={firstName}
                    />
                    <TextField
                      variant="standard"
                      label="Last name"
                      textFieldClassName="w-100 mt-0 mb-4"
                      labelClassName="textSBold__font-size"
                      inputTagClassName="textM__font-size"
                      onChange={(e) => setLastName(e.target.value)}
                      value={lastName}
                    />
                  </div>
                  <TextField
                    variant="standard"
                    label="Email"
                    textFieldClassName="w-100 mt-0"
                    labelClassName="textSBold__font-size"
                    inputTagClassName="textM__font-size"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-custom d-flex align-items-center justify-content-around px-4 py-3"
                >
                  Send Invite
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
