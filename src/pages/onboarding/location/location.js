import React, { useContext, useEffect, useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import { motion } from "framer-motion";
import { pageVariants } from "../../../utils/transitions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";

import SimpleInvoice from "../../../components/invoices/SimpleInvoice";

export default function OBLocation() {
  const { register, handleSubmit, errors } = useForm();
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [isDesktop, setIsDesktop] = useState("");

  const [items] = useState([
    {
      title: "Traning",
      price: 150000,
      description: "Traning",
      qty: 1,
    },
    {
      title: "Protein Shakes",
      price: 5000,
      description: "Protein Shakes",
      qty: 2,
    },
  ]);

  const onSubmit = ({ address1, address2 }) => {
    dispatch({
      type: "SET_WELCOME_COMPANY",
      payload: { ...state.welcomeCompany, address1, address2 },
    });

    history.push("payment-volume");
  };

  useEffect(() => {
    if (!state.welcomeCompany.name) return history.goBack();

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
              Where is {state.welcomeUser.company} located?
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="pf-login">
              <div className="form-group">
                <label>Company address</label>
                <input
                  type="text"
                  name="address1"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.address1}
                  autoComplete="off"
                />

                {errors.address1 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group">
                <label>Address line 2</label>
                <input
                  type="text"
                  name="address2"
                  className="form-control"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.address2}
                  autoComplete="off"
                />

                {errors.address2 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <button
                className="btn btn-custom mt-5"
                onClick={handleSubmit(onSubmit)}
              >
                Continue
              </button>
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
          style={{ paddingBottom: "10rem" }}
        >
          <div className="font-weight-bold mt-3 ml-3">
            <Link to="/">Honeydu</Link>
          </div>

          <h3 className="text-primary mt-5 ml-4 font-weight-bold">
            Where is {state.welcomeUser.company} located?
          </h3>

          <div className="content">
            <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5">
              <div className="form-group mb-5">
                {/* <label>Company address</label> */}
                <input
                  type="text"
                  name="address1"
                  className="form-control"
                  placeholder="Company address"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.address1}
                  autoComplete="off"
                />

                {errors.address1 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>

              <div className="form-group mb-5">
                {/* <label>Address line 2</label> */}
                <input
                  type="text"
                  name="address2"
                  className="form-control"
                  placeholder="Address line 2"
                  ref={register({ required: true })}
                  defaultValue={state.welcomeUser.address2}
                  autoComplete="off"
                />

                {errors.address2 && (
                  <small className="text-danger">Field is required</small>
                )}
              </div>
            </form>

            <div className="mx-5 mt-md-5">
              <SimpleInvoice
                sender={{
                  company: state.welcomeUser.company,
                  email: state.welcomeUser.company,
                }}
                items={items}
                hideTitle={true}
                hideImage={true}
              />
            </div>

            <div className="btn-cta bg-custom-light">
              <p className="text-center small">
                Have an account?{" "}
                <Link to="/login" className="font-weight-bold">
                  Login instead.
                </Link>
              </p>

              <button
                className="btn btn-custom"
                onClick={handleSubmit(onSubmit)}
              >
                Next
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
