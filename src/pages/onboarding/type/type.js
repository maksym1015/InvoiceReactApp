import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBuilding,
  faCalculator,
  faChevronLeft,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import { notify } from "../../../utils/helpers";

export default function OBType() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const [isDesktop, setIsDesktop] = useState("");

  const [type, setType] = useState("");
  const [multipleClients, setMultipleClients] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();

    if (!type)
      return notify("Error! Please select an option to continue.", "error");

    dispatch({
      type: "SET_WELCOME_COMPANY",
      payload: {
        ...state.welcomeCompany,
        type,
        multiple_clients: multipleClients,
      },
    });

    history.push("/about-you");
  };

  useEffect(() => {
    if (!state.welcomeUser.email) return history.goBack();

    // Mobile & Desktop screen check
    const handleResize = () => {
      window.innerWidth > 767 ? setIsDesktop(true) : setIsDesktop(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ob">
      {isDesktop ? (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="pf"
        >
          <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>

          <div className="pf-inner flex-fill">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <h2 className="pf-title">What type of company are you with?</h2>

            <form onSubmit={onSubmit} className="pf-login">
              <p className="text-center">
                Help us the relevant features for you
              </p>

              <div className="pf-type container">
                <div
                  className={`pf-type-box d-flex ${
                    type === "business" ? "active" : ""
                  }`}
                  onClick={() => setType("business")}
                >
                  <FontAwesomeIcon icon={faBuilding} />
                  <span>Business</span>
                </div>
                <div
                  className={`pf-type-box d-flex ${
                    type === "accounting_firm" ? "active" : ""
                  }`}
                  onClick={() => setType("accounting_firm")}
                >
                  <FontAwesomeIcon icon={faCalculator} />
                  <span>Accounting Firm</span>
                </div>
              </div>

              <div class="custom-control custom-checkbox mb-5">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="customCheck1"
                  value={multipleClients}
                  onChange={(e) => setMultipleClients(e.target.checked)}
                />
                <label class="custom-control-label" for="customCheck1">
                  Choose this if you're part of an accounting or bookkeeping
                  firm that manages payments for multiple clients.
                </label>
              </div>

              <button className="btn btn-custom">Continue</button>
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="register px-3 pt-4 min-vh-100 bg-white"
          style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h2 className="pf-title mt-7">What type of company are you with?</h2>

          <form onSubmit={onSubmit} className="pf-login">
            <p className="text-center">Help us the relevant features for you</p>

            <div className="pf-type container">
              <div
                className={`pf-type-box d-flex ${
                  type === "business" ? "active" : ""
                }`}
                onClick={() => setType("business")}
              >
                <FontAwesomeIcon icon={faBuilding} />
                <span>Business</span>
              </div>
              <div
                className={`pf-type-box d-flex ${
                  type === "accounting_firm" ? "active" : ""
                }`}
                onClick={() => setType("accounting_firm")}
              >
                <FontAwesomeIcon icon={faCalculator} />
                <span>Accounting Firm</span>
              </div>
            </div>

            <div class="custom-control custom-checkbox mb-5">
              <input
                type="checkbox"
                class="custom-control-input"
                id="customCheck1"
                value={multipleClients}
                onChange={(e) => setMultipleClients(e.target.checked)}
              />
              <label class="custom-control-label" for="customCheck1">
                Choose this if you're part of an accounting or bookkeeping firm
                that manages payments for multiple clients.
              </label>
            </div>

            <button className="btn btn-custom">Continue</button>
          </form>
        </motion.div>
      )}
    </div>
  );
}
