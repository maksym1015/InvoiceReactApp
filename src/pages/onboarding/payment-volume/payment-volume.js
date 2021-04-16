import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import api from "../../../utils/api";
import { notify } from "../../../utils/helpers";

import Loader from "../../../components/Loader";
import FormErrors from "../../../components/FormErrors";

export default function OBPaymentVolume() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const [isDesktop, setIsDesktop] = useState("");
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [formErrors, setFormErrors] = useState("");

  const [paymentVolume, setPaymentVolume] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    if (!paymentVolume)
      return notify("Error! Please select an option or click Skip", "error");

    let data = { ...state.welcomeCompany, est_volume: paymentVolume };

    dispatch({
      type: "SET_WELCOME_COMPANY",
      payload: data,
    });

    saveCompany(data);
  };

  const onSkip = () => {
    saveCompany({ ...state.welcomeCompany });
  };

  const saveCompany = (data) => {
    setDisabled(true);
    setLoading(true);
    setFormErrors("");

    api
      .post(`${process.env.REACT_APP_API_URI}companies`, data)
      .then((response) => {
        if (response.data.company) {
          // make decision - should we allow user to login if not verified yet?
          localStorage.setItem("honeydu_user", true);

          dispatch({
            type: "SET_COMPANY",
            payload: response.data.company,
          });

          // notify("Great! Let's build your business profile");
          history.push("/setup-complete");
        }
      })
      .catch((errors) => {
        setFormErrors(errors.response.data.errors);
        setDisabled(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    if (!state.welcomeCompany.address1) return history.goBack();

    // Mobile & Desktop screen check
    const handleResize = () => {
      window.innerWidth > 767 ? setIsDesktop(true) : setIsDesktop(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ob">
      {loading && <Loader />}

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

            <h2 className="pf-title">
              What is {state.welcomeUser.company} estimated monthly bill payment
              volume?
            </h2>

            <form onSubmit={onSubmit} className="pf-login">
              <div className="pf-volume">
                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className={`pf-volume-box d-flex justify-content-center align-items-center ${
                      paymentVolume === "Up to $10K" ? "active" : ""
                    }`}
                    onClick={() => setPaymentVolume("Up to $10K")}
                  >
                    Up to $10K
                  </div>
                  <div
                    className={`pf-volume-box d-flex justify-content-center align-items-center ${
                      paymentVolume === "$10K - $50K" ? "active" : ""
                    }`}
                    onClick={() => setPaymentVolume("$10K - $50K")}
                  >
                    $10K - $50K
                  </div>
                </div>

                <div className="d-flex justify-content-between align-items-center">
                  <div
                    className={`pf-volume-box d-flex justify-content-center align-items-center ${
                      paymentVolume === "$50K - $150K" ? "active" : ""
                    }`}
                    onClick={() => setPaymentVolume("$50K - $150K")}
                  >
                    $50K - $150K
                  </div>
                  <div
                    className={`pf-volume-box d-flex justify-content-center align-items-center ${
                      paymentVolume === "$150K+" ? "active" : ""
                    }`}
                    onClick={() => setPaymentVolume("$150K+")}
                  >
                    $150K+
                  </div>
                </div>
              </div>

              <button className="btn btn-custom" disabled={disabled}>
                Continue
              </button>

              <div className="text-center mt-5">
                <button
                  className="btn btn-custom-link text-dark font-weight-bold"
                  type="button"
                  onClick={onSkip}
                >
                  Skip
                </button>
              </div>

              {formErrors && <FormErrors errors={formErrors} />}
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

          <h2 className="pf-title mt-7">
            What is {state.welcomeUser.company} estimated monthly bill payment
            volume?
          </h2>

          <form onSubmit={onSubmit} className="pf-login">
            <div className="pf-volume">
              <div className="d-flex justify-content-between align-items-center">
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    paymentVolume === 1 ? "active" : ""
                  }`}
                  onClick={() => setPaymentVolume(1)}
                >
                  Up to $10K
                </div>
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    paymentVolume === 2 ? "active" : ""
                  }`}
                  onClick={() => setPaymentVolume(2)}
                >
                  $10K - $50K
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    paymentVolume === 3 ? "active" : ""
                  }`}
                  onClick={() => setPaymentVolume(3)}
                >
                  $50K - $150K
                </div>
                <div
                  className={`pf-volume-box d-flex justify-content-center align-items-center ${
                    paymentVolume === 4 ? "active" : ""
                  }`}
                  onClick={() => setPaymentVolume(4)}
                >
                  $150K+
                </div>
              </div>
            </div>

            <button className="btn btn-custom" disabled={disabled}>
              Continue
            </button>

            <div className="text-center mt-5">
              <button
                className="btn btn-custom-link text-dark font-weight-bold"
                type="button"
                onClick={onSkip}
              >
                Skip
              </button>
            </div>

            {formErrors && <FormErrors errors={formErrors} />}
          </form>
        </motion.div>
      )}
    </div>
  );
}
