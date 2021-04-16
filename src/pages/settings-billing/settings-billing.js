import React from "react";
import Header from "../../components/Header";

export default function SettingsBilling() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex">
        <Header title="Billing" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <div className="billing">
              <div className="updated-settings__card">
                <div className="px-4 py-5 p-md-5">
                  <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                    Payment history
                  </div>
                  <div>
                    <p className="textS__font-size m-0">
                      You do not have any payments
                    </p>
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
