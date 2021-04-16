import React, { useState, useContext, useEffect, useCallback } from "react";
import { Link, useHistory } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronRight,
  faChevronLeft,
  faCircle,
  faUniversity,
  faCreditCard,
  faTicketAlt,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

import { usePlaidLink } from "react-plaid-link";

import { notify } from "../../utils/helpers";
import { store } from "../../store";
import api from "../../utils/api";

import Header from "../../components/Header";
import Aside from "../../components/Aside";
import Loader from "../../components/Loader";
import SilaModal from "../../components/SilaModal";

export default function PaymentMethods() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();

  const [silaModal, setSilaModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);

  const [paymentMethods, setPaymentMethods] = useState([]);

  const getUserBanks = () => {
    setLoading(true);

    api
      .get("silas/bank-accounts")
      .then((response) => response.data)
      .then((response) => {
        if (response.data.accounts.length) {
          setPaymentMethods(response.data.accounts);
        }

        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors.response);
        setLoading(false);
      });
  };

  const addBank = () => {
    if (!state.user.sila) {
      return setSilaModal(true);
      // return history.push("/user/sila");
    }

    // plaid add bank modal
    open();
  };

  const onSuccess = useCallback((token, metadata) => {
    setShowModal(false);
    setStep(1);
    setLoading(true);

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
    //       setLoading(false);
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

  const onSelectPM = (paymentMethod) => {
    // set selected payment method into global state
    dispatch({ type: "SET_PAYMENT_METHOD", payload: paymentMethod });

    notify("Payment Method changed.");
  };

  useEffect(() => {
    // if (state.user.sila) getUserBanks();
  }, []);

  return (
    <div className="payment-methods">
      {loading && <Loader />}

      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <Header title="Payment Methods" />

          <div className="page-title text-center">Your Wallet</div>

          <div className="px-4 py-3 text-uppercase desktop-none">
            Payment Methods
          </div>

          {paymentMethods.map((item, index) => (
            <div
              className="payment-method-item py-3"
              key={index}
              // onClick={() => history.push("/payment-methods/1/remove")}
              onClick={() => onSelectPM(item)}
            >
              <div className="payment-method-logo">
                {/* <img src={`/images/usaa.jpg`} /> */}
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

          <div className="payment-method-item py-4 desktop-none">
            <button
              onClick={() => setShowModal(true)}
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

          {showModal && (
            <div
              className="h-100 w-100 fixed-top bg-trans-black"
              onClick={() => setShowModal(false)}
            ></div>
          )}

          {showModal && (
            <div className="fixed-bottom p-4 bg-white rounded-top">
              {step === 1 && (
                <div>
                  <button
                    className="position-absolute btn-custom-link"
                    onClick={() => setShowModal(false)}
                  >
                    <FontAwesomeIcon icon={faChevronLeft} />
                  </button>

                  <p className="text-center font-weight-bold">
                    Confirm Identity
                  </p>

                  <p className="small p-3 mb-0 text-secondary">
                    Honeydu uses <strong>Sila</strong> to verify your identity
                    so that you can receive funds from other users. This is a
                    requirement of KYC compliance standards.
                  </p>
                  <p className="small p-3 text-secondary">
                    You can turn off Honeydu's use of <strong>Sila</strong> by
                    simply removing the bank account.
                  </p>

                  <p className="small p-3 text-secondary">
                    <a
                      href="https://www.barclays.in/content/dam/barclays-in/documents/download-forms/kyc/Importance_of_KYC.pdf"
                      className="text-secondary"
                      target="_blank"
                    >
                      <strong>Learn more</strong>
                    </a>
                  </p>

                  <button
                    onClick={() => setStep(2)}
                    className="btn-custom border-0 mx-auto d-block"
                  >
                    Start Verification
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <button
                    className="position-absolute btn-custom-link"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>

                  <p className="text-center font-weight-bold">
                    Add Bank or Card
                  </p>

                  <div
                    className="d-flex mx-4 py-5 border-bottom"
                    onClick={addBank}
                  >
                    <span className="icon icon-bank mr-4 text-custom-primary">
                      <FontAwesomeIcon icon={faUniversity} size="2x" />
                    </span>
                    <div>
                      <p className="m-0 font-weight-bold">Bank</p>
                      <p className="m-0 small">No fee for sending money.</p>
                    </div>
                  </div>

                  <div
                    className="d-flex mx-4 py-5"
                    style={{ color: "#ccc" }}
                    // onClick={() => history.push("/add-card")}
                  >
                    <span className="icon icon-card mr-4">
                      <FontAwesomeIcon icon={faCreditCard} size="2x" />
                    </span>
                    <div>
                      <p className="m-0 font-weight-bold">Card</p>
                      <p className="m-0 small">Coming soon!</p>
                      {/* <p className="m-0 small">
                        We charge a 3% fee for sending money With credit cards.
                        We don't charge for purchases or debit card payments.
                      </p> */}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          <SilaModal show={silaModal} setShow={setSilaModal} />
        </div>
      </div>
    </div>
  );
}
