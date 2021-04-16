import React, { useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function OBSetupComplete() {
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");

  useEffect(() => {
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

          <div className="pf-inner flex-fill">
            <Link to="/" className="d-block text-center mb-5">
              <img src="/images/honeydu-logo.png" alt="Honeydu" width="80" />
            </Link>

            <div className="text-center" >
              <img src="/images/NEW_man_box_money.jpg" width="300px" />
            </div>

            <h2 className="pf-title">Setup complete</h2>

            <div className="pf-login">
              <p className="text-center">
                Nice! Your Honeydu account is all set and ready for action. It's
                time to start paying bills with bank transfers (ACH), debit
                cards and credit cards. Even if your vendors only accept checks.
              </p>

              <Link
                to="/invoice/new"
                className="btn btn-custom mt-5 text-uppercase"
              >
                Schedule a Payment
              </Link>

              <p className="my-4 d-flex justify-content-center align-items-center">
                <span
                  className="flex-fill"
                  style={{ height: "2px", background: "#ccc" }}
                ></span>
                <span className="mx-5">Or</span>
                <span
                  className="flex-fill"
                  style={{ height: "2px", background: "#ccc" }}
                ></span>
              </p>

              <p className="text-center">
                <Link
                  to="/dashboard"
                  className="font-weight-bold text-uppercase text-dark"
                >
                  No thanks, Later
                </Link>
              </p>
            </div>
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

          <h2 className="pf-title mt-7">Check your email</h2>

          <div className="pf-login">
            <p className="text-center">
              Nice! Your Honeydu account is all set and ready for action. It's
              time to start paying bills with bank transfers (ACH), debit cards
              and credit cards. Even if your vendors only accept checks.
            </p>

            <div className="text-center mt-5" style={{ marginBottom: "5rem" }}>
              <img src="/images/verify-email.png" width="180px" />
            </div>

            <Link
              to="/invoice/new"
              className="btn btn-custom mt-5 text-uppercase"
            >
              Schedule a Payment
            </Link>

            <p className="my-4 d-flex justify-content-center align-items-center">
              <span
                className="flex-fill"
                style={{ height: "2px", background: "#ccc" }}
              ></span>
              <span className="mx-5">Or</span>
              <span
                className="flex-fill"
                style={{ height: "2px", background: "#ccc" }}
              ></span>
            </p>

            <p className="text-center">
              <Link
                to="/dashboard"
                className="font-weight-bold text-uppercase text-dark"
              >
                No thanks, Later
              </Link>
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
