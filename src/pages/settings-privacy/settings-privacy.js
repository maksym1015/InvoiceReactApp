import React, { useState } from "react";
import { Link } from "react-router-dom";
import Switch from "react-switch";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faPhone } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";

import Header from "../../components/Header";
import Aside from "../../components/Aside";

export default function SettingsPrivacy() {
  const [blockedList, setBlockedList] = useState([
    {
      name: "Tom's Landscaping",
      slug: "tom-landscaping",
      image: "logo.png",
    },
    {
      name: "Mike the handyman",
      slug: "mike-handyman",
      image: "logo.png",
    },
    {
      name: "Tina's Nails",
      slug: "tine-nails",
      image: "logo.png",
    },
  ]);

  const onUnblock = (id) => {
    if (window.confirm("Are you sure to unblock?") === true) {
      setBlockedList(blockedList.filter((item, index) => id !== index));
    }
  };

  return (
    <div className="privacy">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">Blocked List</div>
          <div className="">
            <Header title="Privacy" />

            <div className="privacy-title desktop-none">Blocked List</div>

            {blockedList.length > 0 && (
              <ul className="settings-menu">
                {blockedList.map((item, index) => (
                  <li
                    className="settings-menu-item d-flex align-items-center"
                    key={index}
                  >
                    <img
                      src={`/images/${item.image}`}
                      className="privacy-img mr-4 border rounded-circle"
                      alt=""
                    />

                    <div className="flex-fill">
                      <span className="d-block">{item.name}</span>
                      <span className="small text-secondary">@{item.slug}</span>
                    </div>

                    <FontAwesomeIcon
                      icon={faBan}
                      size="2x"
                      className="text-danger"
                      onClick={() => onUnblock(index)}
                    />
                  </li>
                ))}
              </ul>
            )}

            {blockedList.length == 0 && (
              <p className="text-center text-secondary">
                You haven't blocked anyone yet.
              </p>
            )}

            <div className="btn-cta bg-white">
              <button className="btn btn-custom">
                Block someone
                <FontAwesomeIcon icon={faBan} className="ml-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
