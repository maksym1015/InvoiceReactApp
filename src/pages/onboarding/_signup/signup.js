import React, { useState, useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

import SimpleInvoice from "../../../components/invoices/SimpleInvoice";
import Loader from "../../../components/Loader";

import { pageVariants } from "../../../utils/transitions";
import { notify } from "../../../utils/helpers";
import { store } from "../../../store";
import api from "../../../utils/api";

export default function Signup() {
  const { register, handleSubmit, watch, errors } = useForm();
  const { dispatch } = useContext(store);
  const history = useHistory();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // handle form submission
  const onSubmit = (data) => {
    let formData = {
      company: data.company,
      email: data.email,
      password: data.password,
      password_confirmation: data.password,
    };

    saveUser(formData);
  };

  const saveUser = (formData) => {
    setDisabled(true);
    setLoading(true);

    api.get(`${process.env.REACT_APP_API}/sanctum/csrf-cookie`).then(() => {
      api
        .post(`${process.env.REACT_APP_API}/register`, formData)
        .then((response) => {
          if (response.data.user) {
            localStorage.setItem("honeydu_user", true);

            dispatch({
              type: "LOGGEDIN",
              payload: response.data.user,
            });

            notify("Great! Let's build your business profile");
            history.push("/service");
          }
        })
        .catch((errors) => {
          if (errors.response.data.errors) {
            if (errors.response.data.errors.email)
              notify(`Error! ${errors.response.data.errors.email[0]}`, "error");

            if (errors.response.data.errors.company)
              notify(
                `Error! ${errors.response.data.errors.company[0]}`,
                "error"
              );
          }

          setDisabled(false);
          setLoading(false);
        });
    });
  };

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="register px-3 pt-4 min-vh-100 bg-custom-light text-primary"
      style={{ paddingBottom: "10rem" }}
    >
      {loading && <Loader />}

      <div className="font-weight-bold mt-3 ml-3">
        <Link to="/">Honeydu</Link>
      </div>

      <div className="page-title text-center text-primary mt-5">
        Hey! Welcome, what should we call your business?
      </div>

      <div className="content">
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 mt-5 mt-md-0">
          <div className="form-group mb-7">
            <input
              type="text"
              name="company"
              className="form-control"
              placeholder="You Business Name"
              ref={register({ required: true })}
              autoComplete="off"
            />
            {errors.company && (
              <small className="text-danger">Field is required</small>
            )}

            <p className="text-center mt-3">
              <small>
                Not sure what to call your business yet? <br /> That’s ok - you
                can change this later.
              </small>
            </p>
          </div>

          <div className="form-group mb-4">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email address"
              ref={register({ required: true })}
              autoComplete="off"
            />

            {errors.email && (
              <small className="text-danger">Field is required</small>
            )}
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              ref={register({
                required: "Field is required",
                minLength: {
                  value: 6,
                  message: "Too short, should be 6 character long.",
                },
              })}
            />

            {errors.password && (
              <small className="text-danger">{errors.password.message}</small>
            )}

            <p className="text-right">
              <small className="extra-small">
                Must be 6+ characters, A-Z, 123
              </small>
            </p>
          </div>
        </form>

        <div className="mx-5 mt-md-5">
          <SimpleInvoice
            sender={{ company: watch("company"), email: watch("email") }}
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
            disabled={disabled}
          >
            Next
          </button>
        </div>
      </div>
    </motion.div>
  );
}
