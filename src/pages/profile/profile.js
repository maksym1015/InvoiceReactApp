import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBan,
  faBusinessTime,
  faEllipsisH,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";
import api from "../../utils/api";

import Aside from "../../components/Aside";
import Avatar from "../../components/Avatar";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceButton from "../../components/InvoiceButton";
import Loader from "../../components/Loader";
import { getFullName } from "../../utils/helpers";

export default function Profile() {
  const { state } = useContext(store);
  const history = useHistory();
  const { id } = useParams();

  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("out");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  const [user, setUser] = useState({});

  const getInvoices = () => {
    api
      .get("invoices")
      .then((response) => response.data)
      .then((response) => {
        if (response.data.invoices) {
          setIncoming(
            response.data.invoices.incoming.filter((i) => i.status === "paid")
          );
          setOutgoing(
            response.data.invoices.outgoing.filter((i) => i.status === "paid")
          );
        }
      });
  };

  const getProfile = () => {
    setLoading(true);

    api
      .get(`users/${id}`)
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.data);
        }

        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors.response);
        setLoading(false);
      });
  };

  let noInvoices = (
    <div className="no-invoice-placeholder">
      <img src="/images/empty-state.png" alt="No invoices" />
    </div>
  );

  useEffect(() => {
    // getInvoices();
    getProfile();
  }, []);

  return (
    <div className="profile">
      {loading && <Loader />}
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area position-relative">
          <button
            onClick={() => setShowDropdown(true)}
            className="mobile-none position-absolute btn-custom-link p-0 btn-save"
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          <div className="page-title">Profile</div>

          <div className="header desktop-none" style={{ whiteSpace: "nowrap" }}>
            <button
              onClick={() => history.goBack()}
              className="position-absolute btn-custom-link p-0"
            >
              Cancel
            </button>

            <button
              onClick={() => setShowModal(true)}
              className="position-absolute btn-custom-link p-0 btn-save"
            >
              <FontAwesomeIcon icon={faEllipsisH} />
            </button>

            <div
              className=" text-center font-weight-bold"
              style={{
                maxWidth: "50%",
                margin: "auto",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {user.first_name ? getFullName(user) : <br />}
            </div>
          </div>

          <div className="text-center mt-5">
            <Avatar user={user} />

            <h2 className="m-0 text-dark">{getFullName(user)}</h2>
            <p className="m-0 text-secondary">{user.email}</p>
          </div>

          {state.user.id !== user.id ? (
            <div className="text-center my-5">
              <Link to="#" className="btn btn-add-friend">
                <FontAwesomeIcon icon={faUser} />
                Add Contact
              </Link>
            </div>
          ) : <p className="my-5"></p>}

          <div className="invoice-history">
            <p className="font-weight-bold px-4">Invoice History</p>

            <div className="in-out-tabs px-4">
              <button
                className={currentTab === "in" ? "shadow active" : "shadow"}
                onClick={() => setCurrentTab("in")}
              >
                Incoming
              </button>
              <button
                className={currentTab === "out" ? "shadow active" : "shadow"}
                onClick={() => setCurrentTab("out")}
              >
                Outgoing
              </button>
            </div>

            <div className="feeds">
              {currentTab === "in" &&
                (incoming.length > 0
                  ? incoming.map((invoice, index) => (
                      <InvoiceCard
                        invoice={invoice}
                        tab="in"
                        key={invoice.id}
                        id={incoming.length - index}
                      />
                    ))
                  : noInvoices)}

              {currentTab === "out" &&
                (outgoing.length > 0
                  ? outgoing.map((invoice, index) => (
                      <InvoiceCard
                        invoice={invoice}
                        tab="out"
                        key={invoice.id}
                        id={outgoing.length - index}
                      />
                    ))
                  : noInvoices)}
            </div>
          </div>

          <div className="btn-cta desktop-none">
            <Link to="/invoice/new" className="btn btn-custom">
              Send or Request Invoice
            </Link>
          </div>

          <InvoiceButton />

          {showModal && (
            <div
              className="h-100 w-100 fixed-top bg-trans-black"
              onClick={() => setShowModal(false)}
            ></div>
          )}

          {showModal && (
            <div className="fixed-bottom p-4 rounded-top">
              {/* <button
                className="btn btn-block-user text-dark"
                onClick={() => history.push("/schedule-appointment")}
              >
                Schedule or Pay
              </button> */}
              <button className="btn btn-block-user">
                Block {getFullName(user)}
              </button>
              <button
                className="btn btn-block-cancel"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          )}

          {showDropdown && (
            <div
              className="h-100 w-100 fixed-top"
              onClick={() => setShowDropdown(false)}
            ></div>
          )}

          {showDropdown && (
            <div
              className="position-absolute rounded-top bg-white shadow"
              style={{ right: "1.5rem", top: "5rem", zIndex: "1050" }}
            >
              {/* <button
                className="d-block btn border-bottom"
                onClick={() => history.push("/schedule-appointment")}
              >
                <FontAwesomeIcon icon={faBusinessTime} /> Schedule or Pay
              </button> */}

              <button className="d-block btn text-danger">
                <FontAwesomeIcon icon={faBan} /> Block {user.company}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
