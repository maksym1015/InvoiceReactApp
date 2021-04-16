import React from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLink } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";

export default function SettingsQuickBooks() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex desktop-nav-p">
        <Header title="Sync with QuickBooks" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <div className="quick-books">
              <div className="updated-settings__card">
                <div className="px-4 py-5 p-md-5">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="displayS__font-size font-weight-bold">
                      <FontAwesomeIcon icon={faLink} className="ml-3" />
                    </div>
                    <div>
                      <Link
                        to="#"
                        className="quick-books__disconnected d-flex align-items-center justify-content-around textS__font-size px-5 py-2"
                      >
                        Disconnected
                        <FontAwesomeIcon icon={faLink} className="ml-3" />
                      </Link>
                    </div>
                  </div>
                  <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                    QuickBooks sync
                  </div>
                  <div className="d-flex flex-column flex-lg-row justify-content-around">
                    <div className="w-100">
                      <p className="textM__font-size mb-5">
                        Log in and connect your QuickBooks account to sync your
                        vendors, bills, and payments between Melio and
                        QuickBooks.
                      </p>
                      <div className="d-inline-block">
                        <Link
                          to="#"
                          className="btn btn-custom d-flex align-items-center justify-content-around px-3 py-2"
                        >
                          <FontAwesomeIcon icon={faLink} className="mr-3" />
                          Connect
                        </Link>
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
