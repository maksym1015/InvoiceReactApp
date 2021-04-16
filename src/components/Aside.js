import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faChartLine,
  faCircleNotch,
  faCog,
  faDollarSign,
  faInfoCircle,
  faPlusSquare,
  faQuestionCircle,
  faSearch,
  faSignOutAlt,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import { formatCurrency, notify } from "../utils/helpers";

import Avatar from "./Avatar";
import FeedbackModal from "./FeedbackModal";
import TransferBalanceModal from "./TransferBalanceModal";
import api from "../utils/api";

function Aside() {
  const { state, dispatch } = useContext(store);

  const [transferBalanceModal, setTransferBalanceModal] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [toggler, setToggler] = useState(false);

  const onLogout = async () => {
    await api.post(`${process.env.REACT_APP_API}/logout`);
    localStorage.removeItem("honeydu_user");
    dispatch({ type: "LOGGEDOUT" });
    notify("Success! Logged out.");
  };

  return (
    <>
      <aside className="aside shadow">
        <div className="d-flex align-items-center flex-column">
          <div className="brand">
            <img
              src="/images/logo-new.png"
              alt="honeydu-logo"
              className="brand-logo"
            />
          </div>

          <div className="top mt-5 aside__svg-icon">
            {/* <NavLink to="/recipient">
              <FontAwesomeIcon icon={faSearch} />
              <span>Search</span>
            </NavLink> */}

            {/* <NavLink
              to="/invoice/new"
              onClick={() => dispatch({ type: "RESET_INVOICE" })}
            >
              <FontAwesomeIcon icon={faPlusCircle} />
              <span>Send Invoice</span>
            </NavLink> */}
            {state.multiCompany && (
              <NavLink
                to="/company"
                onClick={() => dispatch({ type: "RESET_INVOICE" })}
              >
                <FontAwesomeIcon
                  icon={faThLarge}
                  style={{ fontSize: "2.5rem" }}
                />
                <span>Companies</span>
              </NavLink>
            )}

            <NavLink
              to="/invoice/new"
              onClick={() => dispatch({ type: "RESET_INVOICE" })}
            >
              <FontAwesomeIcon
                icon={faPlusSquare}
                style={{ fontSize: "2.5rem" }}
              />
            </NavLink>

            <NavLink to="/pay">
              <img
                src="/icons/grey/line/sending-payment.svg"
                style={{ maxHeight: "5rem" }}
              />
              <img
                src="/icons/primary/line/sending-payment.svg"
                style={{ display: "none", maxHeight: "5rem" }}
              />
              <span>Pay</span>
            </NavLink>

            <NavLink to="/get-paid">
              <img
                src="/icons/grey/line/receiving-payment.svg"
                style={{ maxHeight: "5rem" }}
              />
              <img
                src="/icons/primary/line/receiving-payment.svg"
                style={{ display: "none", maxHeight: "5rem" }}
              />
              <span>Get Paid</span>
            </NavLink>

            <NavLink to="/dashboard">
              <img
                src="/icons/grey/line/dashboard.svg"
                style={{ maxHeight: "5rem" }}
              />
              <img
                src="/icons/primary/line/dashboard.svg"
                style={{ display: "none", maxHeight: "5rem" }}
              />
              <span>Dashboard</span>
            </NavLink>
          </div>
        </div>

        <div className="bottom">
          <div className="bottom-links">
            <NavLink to="/recipient">
              <FontAwesomeIcon icon={faSearch} />
            </NavLink>

            <Link to="#" onClick={() => setShowHelpPopup(!showHelpPopup)}>
              <FontAwesomeIcon icon={faQuestionCircle} />
            </Link>

            {showHelpPopup && (
              <div className="popup quick-help shadow">
                <p className="small mb-0 font-weight-bold">Quick Help</p>

                <Link to="#" onClick={() => setToggler(!toggler)}>
                  <FontAwesomeIcon icon={faInfoCircle} />
                  Give Feedback
                </Link>

                <p className="small mb-0 font-weight-bold">Legal</p>

                <Link to="/privacy-policy">Privacy Policy</Link>
                <Link to="#">Acceptable Use Policy</Link>
                <Link to="#">Cookies</Link>
              </div>
            )}

            <NavLink to="/settings">
              <FontAwesomeIcon icon={faCog} />
            </NavLink>

            {/* <NavLink to="/notifications">
              <FontAwesomeIcon icon={faBell} />
            </NavLink> */}
          </div>

          <div
            className="aside__avatar"
            onClick={() => setShowPopup(!showPopup)}
          >
            <Avatar user={state.user} />
          </div>

          {/* {showPopup && (
            <div className="popup profile-popup shadow">
              <div className="position-relative">
                <Link to="/profile/edit" className="btn-view text-secondary">
                  View profile
                </Link>
              </div>

              <div className="d-flex align-items-center mb-5">
                <Avatar user={state.user} />

                <div>
                  <h2 className="m-0 text-custom-primary">{state.user.name}</h2>
                  <small className="text-secondary">{state.user.email}</small>
                </div>
              </div>

              <Link
                to="#"
                onClick={() => setTransferBalanceModal(true)}
                className="d-flex border-bottom font-weight-bold"
              >
                <span className="svg">
                  <FontAwesomeIcon icon={faDollarSign} />
                </span>

                <span className="flex-fill">Manage Balance</span>
                <span className="text-custom-primary">
                  {formatCurrency(state.wallet)}
                </span>
              </Link> */}

          {/* <Link
                to="/profile/edit"
                className="border-bottom font-weight-bold"
              >
                <span className="svg">
                  <FontAwesomeIcon icon={faUserEdit} />
                </span>

                <span>Edit Profile</span>
              </Link> */}

          {/* <Link to="#" onClick={onLogout} className="font-weight-bold">
                <span className="svg">
                  <FontAwesomeIcon icon={faSignOutAlt} flip="horizontal" />
                </span>

                <span>Account Logout</span>
              </Link>
            </div>
          )} */}

          {showPopup && (
            <div className="updated-popup popup profile-popup shadow">
              <Link
                to="/settings"
                className="updated-popup__link font-weight-bold"
              >
                <span>Profile settings</span>
              </Link>

              <Link
                to="#"
                onClick={onLogout}
                className="updated-popup__link font-weight-bold"
              >
                <span>Logout</span>
              </Link>
            </div>
          )}
        </div>

        {(showPopup || showHelpPopup) && (
          <div
            onClick={() => {
              setShowPopup(false);
              setShowHelpPopup(false);
            }}
            className="popup-placeholder"
          ></div>
        )}
      </aside>

      <FeedbackModal show={toggler} setShow={setToggler} />
      <TransferBalanceModal
        show={transferBalanceModal}
        setShow={setTransferBalanceModal}
      />
    </>
  );
}

export default Aside;
