import React, { useContext, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faBell,
  faCog,
  faDownload,
  faChartLine,
  faSignOutAlt,
  faCircleNotch,
  faReceipt,
  faInfoCircle,
  faTimes,
  faThLarge,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { useTransition, animated } from "react-spring";

import { store } from "../store";
import { formatCurrency, notify } from "../utils/helpers";
import Avatar from "./Avatar";
import FeedbackModal from "./FeedbackModal";
import TransferBalanceModal from "./TransferBalanceModal";
import api from "../utils/api";
import HR from "./HR";

export default function Menu(props) {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [showMenu, setShowMenu] = useState(false);
  const [toggler, setToggler] = useState(false);
  const [transferBalanceModal, setTransferBalanceModal] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);

  const maskTransitions = useTransition(showMenu, null, {
    from: { position: "absolute", opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });
  const transitions = useTransition(showMenu, null, {
    from: { opacity: 0, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 0, transform: "translateX(-100%)" },
  });

  const onLogout = async () => {
    await api.post(`${process.env.REACT_APP_API}/logout`);
    localStorage.removeItem("honeydu_user");
    dispatch({ type: "LOGGEDOUT" });
    notify("Success! Logged out.");
  };

  return (
    <>
      {props.page === "dashboard" ? (
        <div onClick={() => setShowMenu(!showMenu)} className="desktop-none">
          <Avatar user={state.user} className="mr-4 text-primary" />
        </div>
      ) : (
        <nav className="menu-nav robinhood">
          <p className="text-center small">{props.title}</p>

          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div onClick={() => setShowMenu(!showMenu)}>
                <Avatar user={state.user} className="mr-4 text-primary" />
              </div>

              <ul className="menu-tabs textLBold__font-size">
                <li
                  className={!props.selected ? "active" : ""}
                  onClick={() => props.setSelected(false)}
                >
                  Scheduled
                </li>
                <li
                  className={props.selected ? "active" : ""}
                  onClick={() => props.setSelected(true)}
                >
                  Paid
                </li>
              </ul>
            </div>
            <a
              className="menu-nav__cog"
              style={{ color: "#99999c" }}
              onClick={() => setSearchToggle(!searchToggle)}
            >
              <FontAwesomeIcon icon={faSearch} />
            </a>

            {/* <Link
            to="/invoice/new"
            onClick={() => dispatch({ type: "RESET_INVOICE" })}
          >
            <FontAwesomeIcon icon={faReceipt} />
          </Link> */}
          </div>

          {searchToggle && (
            <div className="search-recipient mt-4">
              <div className="form-group position-relative">
                <span className="position-absolute search-icon">
                  <FontAwesomeIcon icon={faSearch} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name or email"
                />
              </div>
            </div>
          )}
        </nav>
      )}

      {maskTransitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="h-100 w-100 fixed-top bg-trans-black d-md-none position-fixed"
              onClick={() => setShowMenu(false)}
            ></animated.div>
          )
      )}

      {transitions.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              className="fixed-top h-100 bg-white shadow zindex-50 animated-div d-md-none robinhood"
            >
              {/* 
              <div className="text-center mt-5">
                <Link to="/profile/edit">
                  <Avatar user={state.user} />
                </Link>

                <h2 className="m-0 text-dark">{state.user.name}</h2>
                <p className="m-0 text-secondary">{state.user.email}</p>
              </div>

              <div className="balance">
                <div className="small">
                  <span>Balance</span> {formatCurrency(state.wallet)}
                </div>
                <Link
                  to="#"
                  className="extra-small"
                  onClick={() => setTransferBalanceModal(true)}
                >
                  manage
                </Link>
              </div>
              <div className="menu-links">
                <Link
                  to="/invoice/new"
                  onClick={() => dispatch({ type: "RESET_INVOICE" })}
                >
                  <span className="menu-svg">
                    <FontAwesomeIcon icon={faReceipt} className="mr-3" />
                  </span>
                  Create Invoice
                </Link>

                <Link to="/recipient">
                  <span className="menu-svg">
                    <FontAwesomeIcon icon={faSearch} className="mr-3" />
                  </span>
                  Search People
                </Link>

                <Link to="/history" onClick={() => setShowMenu(false)}>
                  <span className="menu-svg">
                    <FontAwesomeIcon icon={faChartLine} className="mr-3" />
                  </span>
                  History
                </Link>

                <Link to="/home" onClick={() => setShowMenu(false)}>
                  <span className="menu-svg">
                    <FontAwesomeIcon icon={faCircleNotch} className="mr-3" />
                  </span>
                  Incomplete
                </Link>

                <Link to="/export">
                  <span className="menu-svg">
                    <FontAwesomeIcon icon={faDownload} className="mr-3" />
                  </span>
                  Export{" "}
                  <small className="extra-small">(Under development)</small>
                </Link>
              </div> */}

              <div className="position-relative">
                <button
                  className="btn-icon menu-close-button d-md-none ml-auto text-primary border-none"
                  onClick={() => setShowMenu(false)}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <div className="d-flex justify-content-center align-items-center displayL__font-size py-3 my-5 text-primary">
                  <div className="brand d-block">
                    <img
                      src="/images/logo-new.png"
                      alt="honeydu-logo"
                      className="brand-logo"
                    />
                  </div>
                </div>
              </div>

              <div className="menu-links textL__font-size">
                <Link to="/export">
                  <span
                    className="menu-svg ml-3"
                    style={{ marginRight: "3.6rem" }}
                  >
                    <FontAwesomeIcon
                      icon={faCreditCard}
                      className="menu-links__icon"
                    />
                  </span>
                  Send a payment now
                </Link>

                <Link to="/pay">
                  <span className="menu-svg mr-5">
                    <img
                      src="/icons/grey/line/sending-payment.svg"
                      style={{ height: "4.5rem" }}
                    />
                  </span>
                  Pay
                </Link>

                <Link to="/get-paid">
                  <span className="menu-svg mr-5">
                    <img
                      src="/icons/grey/line/receiving-payment.svg"
                      style={{ height: "4.5rem" }}
                    />
                  </span>
                  Get Paid
                </Link>

                <Link to="/dashboard">
                  <span className="menu-svg mr-5">
                    <img
                      src="/icons/grey/line/dashboard.svg"
                      style={{ height: "4.5rem" }}
                    />
                  </span>
                  Dashboard
                </Link>
              </div>

              <div className="bottom flex-column menu-nav__avatar">
                <div className="d-flex align-items-center">
                  <div className="mr-4">
                    <Link to="/profile/edit">
                      <Avatar user={state.user} />
                    </Link>
                  </div>
                  <div className="flex-fill">
                    <h2 className="m-0 textLBold__font-size">
                      Hello{state.user.name}
                    </h2>
                    <p className="m-0" style={{ color: "#B3B3B5" }}>
                      {state.user.email}
                    </p>
                  </div>
                  <div>
                    <Link to="/recipient">
                      <FontAwesomeIcon
                        icon={faSearch}
                        className="menu-nav__cog"
                      />
                    </Link>
                    <Link to="/settings">
                      <FontAwesomeIcon icon={faCog} className="menu-nav__cog" />
                    </Link>
                  </div>
                </div>

                <div className="row">
                  <HR className="m-0" />
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <Link
                    to="#"
                    className="d-flex align-items-center"
                    onClick={onLogout}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      flip="horizontal"
                      className="mr-3"
                    />
                    <span className="textS__font-size">Logout</span>
                  </Link>
                  <span
                    style={{ color: "#B3B3B5" }}
                    className="textS__font-size"
                  >
                    Switch Companies
                  </span>
                </div>

                {/* <div>
                  <Link
                    to="#"
                    className="d-flex align-items-center"
                    onClick={onLogout}
                  >
                    <FontAwesomeIcon
                      icon={faSignOutAlt}
                      flip="horizontal"
                      className="mr-3"
                    />
                    Logout
                  </Link>

                  <div className="mr-3">
                    <Link
                      to="#"
                      onClick={() => {
                        setShowMenu(false);
                        setToggler(true);
                      }}
                    >
                      <FontAwesomeIcon icon={faInfoCircle} />
                    </Link>
                    <Link to="/settings">
                      <FontAwesomeIcon icon={faCog} />
                    </Link> */}
                {/* <Link to="/notifications">
                      <FontAwesomeIcon icon={faBell} />
                    </Link> */}
                {/* </div>
                </div> */}
              </div>
            </animated.div>
          )
      )}

      <FeedbackModal show={toggler} setShow={setToggler} />
      <TransferBalanceModal
        show={transferBalanceModal}
        setShow={setTransferBalanceModal}
      />
    </>
  );
}
