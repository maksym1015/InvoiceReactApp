import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Logo from "./logo.png";
import HeroImage from "./honeydu-hompage.png";

import { pageVariants } from "../../../utils/transitions";

export default function Welcome() {
  return (
    <motion.div
      className="welcome"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
    >
      <img src={HeroImage} alt="Honeydu" className="welcome-banner" />

      <div className="welcome-container">
        <div className="logo-box">
          <img src={Logo} alt="honeydu-logo" />
        </div>

        <div className="heading">
          <h1 className="heading-title">
            Send invoices <br />& get paid online
          </h1>

          <p className="heading-text">mobile & desktop supported</p>

          <Link to="/login" className="heading-link">
            Send an invoice
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
