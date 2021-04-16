import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faCreditCard,
  faTimes,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

import api from "../utils/api";
import { store } from "../store";
import { usePlaidLink } from "react-plaid-link";
import { notify } from "../utils/helpers";

export default function PaymentMethodModal({ show, setShow }) {
  const { state, dispatch } = useContext(store);

  const [items, setItems] = useState([]);

  const getUserBanks = () => {
    api
      .get("silas/bank-accounts")
      .then((response) => response.data)
      .then((response) => {
        if (response.data.accounts.length) {
          setItems(response.data.accounts);
        }
      })
      .catch((errors) => {});
  };

  const onSelectPM = (paymentMethod) => {
    dispatch({ type: "SET_PAYMENT_METHOD", payload: paymentMethod });
    setShow(false);
  };

  const addBank = () => {
    if (!state.user.sila) {
      // return setSilaModal(true);
      // return history.push("/user/sila");
    }

    // plaid add bank modal
    open();
  };

  const onSuccess = useCallback((token, metadata) => {
    // setShowModal(false);
    // setStep(1);
    // setLoading(true);

    notify('No bank integration found.', 'error');
    return;

    // api
    //   .post("silas/link-bank-account", { public_token: token })
    //   .then((response) => {
    //     if (response.data.status === "success") {
    //       notify(response.data.message);
    //       getUserBanks();
    //     }
    //   })
    //   .catch((errors) => {
    //     if (errors.response.data.status === "fail") {
    //       notify(errors.response.data.error.message, "error");
    //       // setLoading(false);
    //     }
    //   });
  }, []);

  const onExit = useCallback((err, metadata) => console.log(err, metadata));

  const config = {
    publicKey: "fa9dd19eb40982275785b09760ab79",
    env: "sandbox",
    clientName: "Plaid Quickstart",
    countryCodes: ["US"],
    product: ["auth"],
    language: "en",

    onSuccess,
    onExit,
  };

  const { open, ready, error } = usePlaidLink(config);

  useEffect(() => {
    // if (state.user.sila) getUserBanks();
  }, []);

  return (
    <>
      {show && (
        <div
          className="h-100 w-100 fixed-top bg-trans-black"
          onClick={() => setShow(false)}
          style={{ zIndex: "1050" }}
        ></div>
      )}

      {show && (
        <div className="payment-method-modal feeds-modal">
          <div className="header">
            <h3>Payment Methods</h3>

            <Link to="#" className="modal-close" onClick={() => setShow(false)}>
              <span style={{ fontSize: "1.2rem" }}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </Link>
          </div>

          <div className="payment-methods p-3">
            {items.map((item, index) => (
              <div
                className="payment-method-item p-2"
                key={index}
                onClick={() => onSelectPM(item)}
              >
                <div className="payment-method-logo">
                  <FontAwesomeIcon icon={faUniversity} size="2x" />
                </div>

                <div className="flex-fill text-nowrap text-truncate details">
                  <div>Bank Name</div>
                  <div className="text-secondary d-flex align-items-center">
                    {`ending in ${item.account_number}`}
                  </div>
                </div>

                {item.account_name === state.paymentMethod.account_name && (
                  <span className="icon-check text-primary">
                    <FontAwesomeIcon icon={faCheck} />
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="footer">
            <div className="payment-method-item py-4 desktop-none">
              <button
                onClick={addBank}
                className="btn-custom-link"
              >
                Add bank or card...
              </button>
            </div>

            <Link
              to="#"
              className="btn btn-custom shadow btn-add-card"
              style={{
                cursor: "not-allowed",
                background: "#ccc",
                borderColor: "#ccc",
              }}
            >
              <FontAwesomeIcon icon={faCreditCard} />
              <span>Add credit or debit card (coming soon)</span>
            </Link>

            <Link
              to="#"
              className="btn btn-custom shadow btn-add-bank"
              onClick={addBank}
            >
              <FontAwesomeIcon icon={faUniversity} />
              <span>Add bank account</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
