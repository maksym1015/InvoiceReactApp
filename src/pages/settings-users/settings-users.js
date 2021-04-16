import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import Modal from "../../components/Modal";
import TextField from "../../components/TextField";
import Checkbox from "../../components/Checkbox";

export default function SettingsUsers() {
  const [modal, setModal] = useState(false);
  const [inviteUserRadio, setInviteUserRadio] = useState("admin");

  const handleModal = () => {
    setModal(!modal);
  };

  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex desktop-nav-p">
        <Header title="Manage Users" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
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
          <div class="invite-user__floating-button">
            <FontAwesomeIcon icon={faTimes} />
          </div>
          <div class="d-flex flex-column justify-content-center">
            <div class="displayM__font-size font-weight-bold mb-5">
              Invite a user to join
            </div>
            <div>
              <form className="d-flex flex-column">
                <div class="textSBold__font-size text-transform-uppercase mb-3">
                  User’s role
                </div>
                <div className="d-flex flex-column align-items-lg-start mb-4">
                  <div className="d-flex flex-column flex-lg-row">
                    <div
                      class={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "admin" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("admin")}
                    >
                      <div class="invite-user__radio"></div>Admin
                    </div>
                    <div
                      class={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "accountant" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("accountant")}
                    >
                      <div class="invite-user__radio"></div>Accountant
                    </div>
                    <div
                      class={`invite-user__radio--wrapper textL__font-size mb-3 mb-lg-0 ${
                        inviteUserRadio === "contributor" ? "selected" : ""
                      }`}
                      onClick={() => setInviteUserRadio("contributor")}
                    >
                      <div class="invite-user__radio"></div>Contributor
                    </div>
                  </div>
                </div>
                {inviteUserRadio === "admin" && (
                  <div class="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Admins have full access to your Melio account. This includes
                    vendors, bank details, cards, payments and settings. Admins
                    can also approve payments added and scheduled by
                    Contributors.
                  </div>
                )}
                {inviteUserRadio === "accountant" && (
                  <div class="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Accountants and bookkeepers can use this role to manage
                    bills and payments, or sync your QuickBooks and Melio
                    accounts. Admin approval is optional and can be set for
                    scheduled payments that exceed the amount set below.
                  </div>
                )}
                {inviteUserRadio === "contributor" && (
                  <div class="invite-user__descriptions textS__font-size mt-1 mb-4">
                    Use this role for team members that require limited
                    permissions. Contributors can add or modify any bills and
                    payments. Admin approval is optional and can be set for
                    scheduled payments that exceed the amount below.
                  </div>
                )}
                {inviteUserRadio !== "admin" && (
                  <div class="invite-user__amount-form d-flex flex-row w-100 align-items-start mb-4">
                    <div class="w-100 d-flex justify-content-between flex-fill mr-3">
                      <Checkbox
                        labelClassName="textS__font-size"
                        label="Require admin approval for any payment that exceeds:"
                      />
                    </div>
                    <div class="w-100 d-flex justify-content-between flex-fill ml-3">
                      <TextField
                        variant="standard"
                        label="Enter amount"
                        textFieldClassName="w-100 mt-0"
                        labelClassName="textSBold__font-size"
                        inputTagClassName="textM__font-size"
                        value="abdul@coral.global"
                      />
                    </div>
                  </div>
                )}
                <div class="textSBold__font-size text-transform-uppercase mb-4">
                  User’s Details
                </div>
                <div class="mb-5">
                  <div className="d-flex">
                    <TextField
                      variant="standard"
                      label="First name"
                      textFieldClassName="w-100 mr-5 mt-0 mb-4"
                      labelClassName="textSBold__font-size"
                      inputTagClassName="textM__font-size"
                      value=""
                    />
                    <TextField
                      variant="standard"
                      label="Last name"
                      textFieldClassName="w-100 mt-0 mb-4"
                      labelClassName="textSBold__font-size"
                      inputTagClassName="textM__font-size"
                      value=""
                    />
                  </div>
                  <TextField
                    variant="standard"
                    label="Email"
                    textFieldClassName="w-100 mt-0"
                    labelClassName="textSBold__font-size"
                    inputTagClassName="textM__font-size"
                    value=""
                  />
                </div>
                <button className="btn btn-custom d-flex align-items-center justify-content-around px-4 py-3">
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
