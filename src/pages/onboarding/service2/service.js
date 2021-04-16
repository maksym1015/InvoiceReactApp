import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { store } from "../../../store";

export default function OBService() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");

  let [services, setServices] = useState([
    "Beauty & Personal Care",
    "Food & Beverage",
    "Fitness",
    "Home Services",
    "Digital Services",
    "Retail",
    "I’m not sure yet…",
  ]);

  const [active, setActive] = useState(state.welcomeUser.service);

  const onClick = (val) => {
    dispatch({
      type: "SET_WELCOME_USER",
      payload: { ...state.welcomeUser, service: val },
    });

    setTimeout(() => {
      history.push("/ob-about-user");
    }, 500);
  };

  useEffect(() => {
    if (!state.welcomeUser.address1) return history.goBack();

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
          style={{ paddingBottom: "10rem" }}
        >
          <Link to="#" className="pf-back-btn" onClick={() => history.goBack()}>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Link>

          <div className="pf-inner">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <h2 className="pf-title">
              What does {state.welcomeUser.company} do?
            </h2>

            <form className="pf-login">
              {services.map((service, index) => (
                <div
                  className={
                    active === service
                      ? "form-group-custom active"
                      : "form-group-custom"
                  }
                  onClick={() => onClick(service)}
                  key={index}
                >
                  <label className="form-check-label w-100 h-100">
                    <input
                      type="radio"
                      name="service"
                      value={service}
                      defaultValue={state.welcomeUser.service}
                    />
                    {service}
                  </label>
                </div>
              ))}
            </form>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="register px-3 pt-4 min-vh-100 bg-custom-light text-primary"
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h3 className="text-primary mt-5 ml-4 font-weight-bold">
            What does {state.welcomeUser.company} do?
          </h3>

          <form className="service-form p-5 mt-5">
            {services.map((service, index) => (
              <div
                className={
                  active === index
                    ? "form-group-custom active"
                    : "form-group-custom"
                }
                onClick={() => onClick(service)}
                key={index}
              >
                <label className="form-check-label w-100 h-100">
                  <input
                    type="radio"
                    name="service"
                    value={index}
                    defaultValue={state.welcomeUser.service}
                  />
                  {service}
                </label>
              </div>
            ))}
          </form>
        </motion.div>
      )}
    </div>
  );
}
