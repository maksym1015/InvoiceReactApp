import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBolt,
  faChevronRight,
  faDollarSign,
  faTimes,
  faTimesCircle,
  faUniversity,
} from "@fortawesome/free-solid-svg-icons";

import api from "../utils/api";
import { formatCurrency, notify } from "../utils/helpers";
import { store } from "../store";
import PaymentMethodModal from "./PaymentMethodModal";

export default function TransferBalanceModal({ show, setShow }) {
  const history = useHistory();
  const { state } = useContext(store);

  const [paymentMethodModal, setPaymentMethodModal] = useState(false);
  const [type, setType] = useState("home");
  const [amount, setAmount] = useState(0);
  const [selected, setSelected] = useState("addToWallet");
  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState("");

  const getUserBanks = () => {
    api
      .get("silas/bank-accounts")
      .then((response) => response.data)
      .then((response) => {
        if (response.data.accounts) {
          setBanks(response.data.accounts);
        }
      })
      .catch((errors) => console.log(errors.response));
  };

  const addBalance = () => {
    if (amount === 0 || !state.paymentMethod.account_name)
      return notify("Invalid amount or bank details.", "error");

    api
      .post("silas/issue", {
        amount,
        accountName: state.paymentMethod.account_name,
      })
      .then((response) => {
        if (response.data.status === "success") {
          notify(response.data.message);
          // history.push("/home");
          setShow(false);
          setAmount(0);
        }
      })
      .catch((errors) => {
        // console.log(errors.response);
        // if (errors.response.data.status === "fail") {
        //   notify(errors.response.data.message, "error");
        // }
      });
  };

  const onRedeem = () => {
    if (
      amount === 0 ||
      !state.paymentMethod.account_name ||
      amount > state.wallet / 100
    )
      return notify("Invalid amount or bank details.", "error");

    api
      .post("silas/redeem", {
        amount,
        accountName: state.paymentMethod.account_name,
      })
      .then((response) => {
        // console.log(response.data);
        if (response.data.status === "success") {
          notify(response.data.message);
          // history.push("/home");
          setShow(false);
        }
      })
      .catch((errors) => {
        if (errors.response.data.status === "fail") {
          notify(errors.response.data.message, "error");
        }
      });
  };

  useEffect(() => {
    // if (show) getUserBanks();
  }, [show]);

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
        <div className="transfer-balance-modal feeds-modal">
          {type === "home" && (
            <>
              <div className="header">
                <h3>Transfer Balance</h3>

                <Link
                  to="#"
                  className="modal-close"
                  onClick={() => setShow(false)}
                >
                  <span style={{ fontSize: "1.2rem" }}>
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </Link>
              </div>

              <div className="transfer-balance px-4">
                <div className="form-group">
                  <span className="svg-dollar">
                    <FontAwesomeIcon icon={faDollarSign} />
                  </span>

                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    maxLength="3"
                  />

                  <span
                    className="svg-clear"
                    onClick={() => setAmount(0)}
                    style={{ cursor: "pointer" }}
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </span>

                  <small>Transfer up to {formatCurrency(state.wallet)}</small>
                </div>

                <div className="tb-options d-flex">
                  <div
                    className={
                      selected === "addToWallet"
                        ? "tb-option-1 flex-fill active"
                        : "tb-option-1 flex-fill"
                    }
                    onClick={() => setSelected("addToWallet")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faBolt} size="2x" />
                    </span>
                    <span>Add to Wallet</span>
                    {/* <span>{instantFeePercentage}% fee</span> */}
                  </div>

                  <div
                    className={
                      selected === "redeem"
                        ? "tb-option-1 flex-fill ml-4 active"
                        : "tb-option-1 flex-fill ml-4"
                    }
                    onClick={() => setSelected("redeem")}
                    style={{ cursor: "pointer" }}
                  >
                    <span className="icon">
                      <FontAwesomeIcon icon={faUniversity} size="2x" />
                    </span>
                    <span>Redeem</span>
                    {/* <span>No fee</span> */}
                  </div>
                </div>

                {/* <div className="d-flex justify-content-between text-dark border-bottom my-3 py-3">
          <label>Fee</label>
          <span>${fee}</span>
        </div> */}

                <div className="d-flex justify-content-between align-items-center mt-5">
                  <label>
                    Transfer {selected === "addToWallet" ? "from" : "to"}
                  </label>
                  {/* <div className="payment-method-item border p-2 rounded">
              <div className="payment-method-logo">
                <img src="/images/debit.jpg" />
              </div>

              <div className="flex-fill text-nowrap text-truncate">
                <div>Charles Schwab</div>
                <div className="text-secondary d-flex align-items-center">
                  Debit
                  <small style={{ fontSize: ".5rem", margin: "0 .5rem" }}>
                    <FontAwesomeIcon icon={faCircle} className="mr-1" />
                    <FontAwesomeIcon icon={faCircle} />
                  </small>
                  4033
                </div>
              </div>
              <span className="icon-grey px-2">
                <FontAwesomeIcon icon={faChevronRight} />
              </span>
            </div> */}
                  {state.paymentMethod.account_name ? (
                    <div
                      className="payment-methods p-0"
                      onClick={() => setPaymentMethodModal(true)}
                    >
                      <div className="payment-method-item p-1 m-0 border-0">
                        <div
                          className="payment-method-logo"
                          style={{ width: "4rem", fontSize: "1.6rem" }}
                        >
                          <FontAwesomeIcon icon={faUniversity} />
                        </div>

                        <div className="d-flex flex-fill text-nowrap text-truncate details mr-3">
                          <div className="mr-3">Bank Name</div>
                          <div className="text-secondary d-flex align-items-center">
                            {state.paymentMethod.account_number}
                          </div>
                        </div>

                        <span className="icon-check text-primary">
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div
                      className="payment-methods p-0"
                      onClick={() => setPaymentMethodModal(true)}
                    >
                      <div className="payment-method-item p-1 m-0 border-0">
                        {/* <div className="payment-method-logo" style={{width: "4rem", fontSize: "1.6rem"}}>
                          <FontAwesomeIcon icon={faUniversity} />
                        </div> */}

                        <div className="d-flex flex-fill text-nowrap text-truncate details mr-3">
                          select payment method
                        </div>

                        <span className="icon-check text-primary">
                          <FontAwesomeIcon icon={faChevronRight} />
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="footer">
                <div className="btn-cta bg-white">
                  {selected === "redeem" && (
                    <button
                      className="btn btn-custom d-flex justify-content-around"
                      onClick={onRedeem}
                    >
                      <span>
                        Transfer ${amount ? parseFloat(amount).toFixed(2) : 0.0}{" "}
                        into Bank
                      </span>
                    </button>
                  )}

                  {selected === "addToWallet" && (
                    <button
                      className="btn btn-custom d-flex justify-content-around"
                      onClick={addBalance}
                    >
                      <span>
                        Add ${amount ? parseFloat(amount).toFixed(2) : 0.0} into
                        Wallet
                      </span>
                    </button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {paymentMethodModal && (
        <PaymentMethodModal
          show={paymentMethodModal}
          setShow={setPaymentMethodModal}
        />
      )}
    </>
  );
}
