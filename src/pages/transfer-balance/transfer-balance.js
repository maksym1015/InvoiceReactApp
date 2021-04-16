import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faUniversity } from "@fortawesome/free-solid-svg-icons";
import api from "../../utils/api";
import { notify } from "../../utils/helpers";

export default function TransferBalance() {
  const history = useHistory();
  
  const [amount, setAmount] = useState(100);
  const [selected, setSelected] = useState("addToWallet");
  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState("");

  // const [fee, setFee] = useState(0.25);
  // const [instantFeePercentage, setInstantFeePercentage] = useState(2.99);
  // const [total, setTotal] = useState(0);

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
    // validate amount and bank
    if (amount === 0 || accountName === "")
      return notify("Invalid amount or bank details.", "error");

    api
      .post("silas/issue", { amount, accountName })
      .then((response) => {
        if (response.data.status === "success") {
          notify(response.data.message);
          history.push("/home");
        }
      })
      .catch((errors) => {
        console.log(errors.response);
        // if (errors.response.data.status === "fail") {
        //   notify(errors.response.data.message, "error");
        // }
      });
  };

  const onRedeem = () => {
    // validate amount and bank
    if (amount === 0 || accountName === "")
      return notify("Invalid amount or bank details.", "error");

    api
      .post("silas/redeem", { amount, accountName })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "success") {
          notify(response.data.message);
          history.push("/home");
        }
      })
      .catch((errors) => {
        if (errors.response.data.status === "fail") {
          notify(errors.response.data.message, "error");
        }
      });
  };

  useEffect(() => {
    getUserBanks();
  }, []);

  return (
    <div className="mobile-layer px-4 pb-7">
      <div className="py-4 px-3">
        <button
          onClick={() => history.goBack()}
          className="position-absolute btn-custom-link p-0"
        >
          Cancel
        </button>

        <p className="text-center font-weight-bold">
          Transfer Balance
        </p>
      </div>

      <div className="transfer-balance">
        <div className="form-group">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0"
            maxLength="3"
          />
          <small>Transfer up to $550</small>
        </div>

        <div className="tb-options d-flex">
          <div
            className={
              selected === "addToWallet"
                ? "tb-option-1 flex-fill active"
                : "tb-option-1 flex-fill"
            }
            onClick={() => setSelected("addToWallet")}
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
          <label>Transfer {selected === "addToWallet" ? "from" : "to"}</label>
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
          {banks.length > 0 ? (
            <select
              className="form-control"
              style={{ fontSize: "1.6rem", width: "60%" }}
              onChange={(e) => setAccountName(e.target.value)}
            >
              <option value="">Select Bank</option>
              {banks.map((bank) => (
                <option value={bank.account_name} key={bank.account_name}>
                  {bank.account_name.substr(0, 20)}
                </option>
              ))}
            </select>
          ) : (
            <select
              disabled
              className="form-control"
              style={{ fontSize: "1.6rem", width: "60%" }}
              onChange={(e) => setAccountName(e.target.value)}
            >
              <option value="">No bank available</option>
            </select>
          )}
        </div>
      </div>

      <div className="btn-cta bg-white">
        {selected === "redeem" && (
          <button
            className="btn btn-custom d-flex justify-content-around"
            onClick={onRedeem}
          >
            <span>
              Transfer ${amount ? parseFloat(amount).toFixed(2) : 0.0} into Bank
            </span>
          </button>
        )}

        {selected === "addToWallet" && (
          <button
            className="btn btn-custom d-flex justify-content-around"
            onClick={addBalance}
          >
            <span>
              Add ${amount ? parseFloat(amount).toFixed(2) : 0.0} into Wallet
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
