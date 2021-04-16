import React from "react";
import { Link } from "react-router-dom";
import Aside from "../../components/Aside";

import Header from "../../components/Header";

export default function NotificationSettings() {
  return (
    <div className="notifications">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">Notifications Settings</div>

          <div>
            <Header title="Notifications Settings" />

            <ul className="settings-menu">
              <li>
                <Link
                  to="/settings/notifications/push"
                  className="settings-menu-item"
                >
                  Push Notifications
                </Link>
              </li>
              <li>
                <Link
                  to="/settings/notifications/text"
                  className="settings-menu-item"
                >
                  Text Notifications
                </Link>
              </li>
              <li>
                <Link
                  to="/settings/notifications/email"
                  className="settings-menu-item"
                >
                  Email Notifications
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
