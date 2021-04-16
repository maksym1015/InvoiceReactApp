import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";

export default function OBContacts() {
  const { dispatch } = useContext(store);
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");

  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: "Devin",
      email: "hello@coral.global",
      image: "https://via.placeholder.com/70",
    },
    {
      id: 2,
      name: "Shan",
      email: "shan@coral.global",
      image: "https://via.placeholder.com/70",
    },
    {
      id: 3,
      name: "Zubair",
      email: "zubair@coral.global",
      image: "https://via.placeholder.com/70",
    },
  ]);

  // const onSelect = (items, template) => {
  //   dispatch({
  //     type: "SET_LINE_ITEMS",
  //     payload: { items, template },
  //   });

  //   setTimeout(() => history.push("/create-invoice"), 200);
  // };

  const onSkip = () => {
    // dispatch({ type: "RESET_INVOICE" });
    // history.push("/create-invoice");
  };

  useEffect(() => {
    // Mobile & Desktop screen check
    const handleResize = () => {
      window.innerWidth > 767 ? setIsDesktop(true) : setIsDesktop(false);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
  }, []);

  return (
    <div className="ob bg-white">
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
              Looks like you know some businesses on Honeydu
            </h2>

            <p className="p-4 text-center text-secondary">
              To start sending money and getting paid, get a referral from
              someone you know.
            </p>

            <div className="pf-login">
              <div className="contacts-items mt-5">
                {contacts.map((contact) => (
                  <div
                    className="contacts-item d-flex align-items-center mb-3 py-3"
                    key={contact.id}
                    style={{ cursor: "pointer" }}
                  >
                    <img
                      src={contact.image}
                      width="70"
                      height="70"
                      className="rounded-pill mr-5"
                      alt=""
                    />

                    <div className="flex-fill">
                      <h2>{contact.name}</h2>
                      <p className="mb-0">{contact.email}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                className="btn btn-custom mt-5"
                // onClick={handleSubmit(onSubmit)}
              >
                Continue
              </button>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          className="templates custom-height"
        >
          <div className="font-weight-bold p-4">
            <Link to="/">Honeydu</Link>

            {/* <button
              onClick={onSkip}
              className="btn btn-custom-link float-right mr-3 small"
            >
              skip
            </button> */}
          </div>

          <h3 className="text-primary text-center p-5 font-weight-bold">
            Looks like you know some businesses on Honeydu
          </h3>

          <p className="p-4 text-center text-secondary">
            To start sending money and getting paid, get a referral from someone
            you know.
          </p>

          <div className="w-75 mx-auto mt-5">
            {contacts.map((contact) => (
              <div className="mb-5 d-flex align-items-center">
                <img
                  src={contact.image}
                  width="50"
                  height="50"
                  className="rounded-pill mr-4"
                  alt=""
                />

                <div className="flex-fill">
                  <h3 className="mb-0">{contact.name}</h3>
                  <p className="mb-0 small">{contact.email}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="btn-cta">
            <button onClick={onSkip} className="btn btn-custom rounded-pill">
              Continue
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
