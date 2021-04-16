import React from "react";

import Header from "../../components/Header";
import Profile from "../../components/Profile";

export default function SettingsProfile() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex">
        <Header title="Profile settings" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
}
