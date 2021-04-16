import React, { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/Header";
import Aside from "../../components/Aside";

export default function FriendsSocial() {
  const [connectFacebook, setConnectFacebook] = useState(true);
  const [phoneContacts, setPhoneContacts] = useState(true);
  const [facebookContacts, setFacebookContacts] = useState(true);

  return (
    <div className="friends-social">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">Friends & Social</div>
          
          <div className="">
            <Header title="Friends & Social" />

            <div className="menu-title">Preferences</div>

            <ul className="settings-menu">
              <li className="settings-menu-item d-flex align-items-center">
                <div className="flex-fill">
                  <span className="svg">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </span>
                  Connect Facebook
                </div>
                <Switch
                  onChange={setConnectFacebook}
                  checked={connectFacebook}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#00D227"
                  width={48}
                />
              </li>
            </ul>

            <div className="text">
              <p>
                Automatically add your Facebook friends to your Honeydu friends,
                so you can easily find and pay them, and they can share payments
                it you.
              </p>

              <p>
                Honeydu will access your email address, Facebook friends list,
                and public profile (including profile picture), as permitted in
                our <Link to="#">Privacy Policy</Link>
              </p>
            </div>

            <div className="menu-title">Adding Friends</div>

            <ul className="settings-menu">
              <li className="settings-menu-item d-flex align-items-center">
                <div className="flex-fill">
                  <span className="svg">
                    <FontAwesomeIcon icon={faPhone} flip="horizontal" />
                  </span>
                  Phone Contacts
                </div>
                <Switch
                  onChange={setPhoneContacts}
                  checked={phoneContacts}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#00D227"
                  width={48}
                />
              </li>
              <li className="settings-menu-item d-flex align-items-center">
                <div className="flex-fill">
                  <span className="svg">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </span>
                  Facebook Contacts
                </div>
                <Switch
                  onChange={setFacebookContacts}
                  checked={facebookContacts}
                  uncheckedIcon={false}
                  checkedIcon={false}
                  onColor="#00D227"
                  width={48}
                />
              </li>
            </ul>

            <div className="text">
              <p>
                Automatically add your contacts and Facebook friends to your
                Honeydu friends when they join.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
