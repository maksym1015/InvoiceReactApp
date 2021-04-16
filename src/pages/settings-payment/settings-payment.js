import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard, faUniversity } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";

export default function SettingsPayment() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex">
        <Header title="Payment methods" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <div className="payment-methods p-0">
              <div className="updated-settings__card">
                <div className="px-4 py-5 p-md-5">
                  <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                    Payment methods
                  </div>

                  <div>
                    <div className="updated-settings__card box-shadow-none px-4 py-5 mb-4">
                      <Link
                        to="#"
                        className="d-block text-right textS__font-size mr-2 white-space-nowrap"
                        style={{ lineHeight: "1rem" }}
                      >
                        Add this method
                      </Link>
                      <div className="d-flex mb-3">
                        <span className="svg ml-2 mr-4">
                          <FontAwesomeIcon icon={faUniversity} />
                        </span>
                        <div className="flex-fill">
                          <h4 className="textMBold__font-size m-0">
                            Bank account
                          </h4>
                          <p className="textS__font-size m-0">From</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="updated-settings__card box-shadow-none px-4 py-5 mb-4">
                      <Link
                        to="#"
                        className="d-block text-right textS__font-size mr-2 white-space-nowrap"
                        style={{ lineHeight: "1rem" }}
                      >
                        Add this method
                      </Link>
                      <div className="d-flex mb-3">
                        <span className="svg ml-2 mr-4">
                          <FontAwesomeIcon icon={faCreditCard} />
                        </span>
                        <div className="flex-fill">
                          <h4 className="textMBold__font-size m-0">
                            Credit card
                          </h4>
                          <p className="textS__font-size m-0">
                            Defer this payment and earn card rewards. 2.9% fee.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
