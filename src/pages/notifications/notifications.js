import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import Aside from "../../components/Aside";

import Header from "../../components/Header";

export default function Notifications() {
  const history = useHistory();
  const [currentTab, setCurrentTab] = useState("unread");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      name: "Jack's Reality",
      price: "2500",
      dueDate: "8/1/2020",
      description: "August Rent",
      image: "logo.png",
    },
  ]);

  const onView = (id) => {
    setTimeout(() => history.push(`/invoice/${id}/view`), 200);
  };

  return (
    <div className="notifications">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area custom-height">
          <Header title="Notifications" />

          <div className="page-title">Notifications</div>

          <div className="in-out-tabs mb-5">
            <button
              className={currentTab === "all" ? "shadow active" : "shadow"}
              onClick={() => setCurrentTab("all")}
            >
              All
            </button>
            <button
              className={currentTab === "unread" ? "shadow active" : "shadow"}
              onClick={() => setCurrentTab("unread")}
            >
              Unread
            </button>
          </div>

          {currentTab === "all" &&
            (notifications.length > 0 ? (
              notifications.map((item, index) => (
                <div
                  className="item d-flex align-items-start p-4 bg-white"
                  key={index}
                  onClick={() => onView(item.id)}
                >
                  <img src={`/images/${item.image}`} className="img" alt="" />

                  <div className="flex-fill">
                    <div className="d-flex">
                      <p className="flex-fill font-weight-bold m-0">
                        {item.name}
                        <span className="font-weight-normal"> requests</span> $
                        {item.price}
                      </p>

                      <Link to="#" className="btn btn-custom-link">
                        view
                      </Link>
                    </div>

                    <small className="d-block extra-small text-secondary">
                      Due: {item.dueDate}
                    </small>
                    {/* <p className="my-3">{item.description}</p> */}

                    <div className="d-flex btns-box">
                      <button className="flex-fill mr-3 btn-decline">
                        Decline
                      </button>
                      <button className="flex-fill btn-pay">Pay</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-5 text-secondary small">
                No notifications here! Looks like you are all caught up!
              </p>
            ))}

          {currentTab === "unread" &&
            (notifications.length > 0 ? (
              notifications.map((item, index) => (
                <div
                  className="item d-flex align-items-start p-4 bg-white"
                  key={index}
                  onClick={() => onView(item.id)}
                >
                  <img src={`/images/${item.image}`} className="img" alt="" />

                  <div className="flex-fill">
                    <div className="d-flex">
                      <p className="flex-fill font-weight-bold m-0">
                        {item.name}
                        <span className="font-weight-normal"> requests</span> $
                        {item.price}
                      </p>

                      <Link to="#" className="btn btn-custom-link">
                        view
                      </Link>
                    </div>

                    <small className="d-block extra-small text-secondary">
                      Due: {item.dueDate}
                    </small>
                    {/* <p className="my-3">{item.description}</p> */}

                    <div className="d-flex btns-box">
                      <button className="flex-fill mr-3 btn-decline">
                        Decline
                      </button>
                      <button className="flex-fill btn-pay">Pay</button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-5 text-secondary small">
                No notifications here! Looks like you are all caught up!
              </p>
            ))}
        </div>
      </div>
    </div>
  );
}
