import React from "react";
import { useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

import Aside from "../../components/Aside";
import Visa from "./visa.jpg";

export default function RemovePaymentMethod() {
  const history = useHistory();

  return (
    <div className="remove-payment-method">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">
            <span
              className="mr-5 text-primary"
              onClick={() => history.goBack()}
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </span>
            Remove Payment Method
          </div>

          <div className="position-relative p-4 desktop-none">
            <button
              onClick={() => history.goBack()}
              className="position-absolute btn-custom-link p-0"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
          </div>

          <div className="py-5 px-3">
            <div className="card border-0">
              <div className="card-body">
                <div className="card-title">Chase bank</div>
                <div className="card-number">Bank ** 8838</div>
                <div className="d-flex justify-content-between align-items-center">
                  <div className="expiry">Exp 06/24</div>
                  <img src={Visa} alt="visa" height="45" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-5">
            <p>
              <small className="sending-money">Sending money to friends</small>{" "}
              <br />
              No Fee
            </p>
          </div>

          <div className="btn-cta">
            <button className="btn btn-block btn-danger btn-remove">
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
