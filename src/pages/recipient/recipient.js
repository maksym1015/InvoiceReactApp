import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faQrcode,
  faCheck,
  faEllipsisH,
  faUser,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";
import api from "../../utils/api";
import { getFullName, notify } from "../../utils/helpers";
import Aside from "../../components/Aside";
import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceButton from "../../components/InvoiceButton";

export default function Recipient() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  // const [email, setEmail] = useState("");
  // const [selected, setSelected] = useState(false);
  // const [showEmailField, setShowEmailField] = useState(false);

  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentTab, setCurrentTab] = useState("out");
  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);

  const handleSubmit = async (query) => {
    // Reset List
    if (query.length === 0) {
      setUser({});
      return setFilteredUsers([]);
    }

    // Filter list
    let filteredUsers = state.users.filter((user) => {
      // filter base on @username
      // if (query[0] === "@" && `@${user.username}`.includes(query)) {
      //   return user;
      // }

      // filter base on name
      if (
        user.first_name.toLowerCase().includes(query.toLowerCase()) ||
        user.first_name.includes(query) ||
        user.email.toLowerCase().includes(query.toLowerCase()) ||
        user.email.includes(query)
      ) {
        return user;
      }

      return null;
    });

    setFilteredUsers(filteredUsers);
  };

  // const onNext = () => {
  //   // user select validation
  //   if (selected === false && email == "") {
  //     return notify("Error! Please select an user to continue.", "error");
  //   }

  //   // redirect to next page
  //   history.push("/invoice/new");
  // };

  // const fetchUsers = (value = "") => {
  //   api
  //     .get("users")
  //     // .then((response) => response.data)
  //     .then((response) => {
  //       if (response.data.length) {
  //         setUsers(response.data.filter((u) => u.id !== state.user.id)); // removed loggedin user from list
  //         // setFilteredUsers(response.data.users);
  //       }
  //     });
  // };

  // const setUser = (id) => {
  //   dispatch({
  //     type: "ADD_RECIPIENT",
  //     payload: users.find((user) => user.id === id),
  //   });
  // };

  // const setEmailAddress = (email) => {
  //   dispatch({
  //     type: "ADD_RECIPIENT",
  //     payload: {
  //       id: "",
  //       name: "",
  //       username: "",
  //       email: email,
  //       password: "",
  //       image: "",
  //     },
  //   });
  // };

  let noInvoices = (
    <div className="no-invoice-placeholder">
      <img src="/images/empty-state.png" alt="No invoices" />
    </div>
  );

  const onSelectUser = (user) => {
    // if (window.innerWidth > 1399) {
    //   // show 3rd section
    //   setUser(user);
    //   // fetch user's invoices
    //   // getInvoices(user.id);
    //   return;
    // }

    history.push(`/profile/${user.id}`);
  };

  const getInvoices = (id) => {
    api
      .get(`invoices?recipient_id=${id}`)
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

  useEffect(() => {
    // fetchUsers();
  }, []);

  return (
    <div className="recipient">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div>
            <div className="page-title text-center">Search for people</div>

            <div className="mobile-layer px-4 pt-5 desktop-reset">
              <Header title="Choose Recipient" />

              <div className="search-recipient">
                <div className="form-group position-relative">
                  <span className="position-absolute search-icon">
                    <FontAwesomeIcon icon={faSearch} />
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name or email"
                    onChange={(e) => {
                      handleSubmit(e.target.value);
                    }}
                  />
                </div>
              </div>

              <div className="item border-bottom-0 desktop-none">
                <div className="item-icon text-primary">
                  <FontAwesomeIcon icon={faQrcode} />
                </div>

                <div>
                  <p className="item-title font-weight-bold">Scan Code</p>
                  <small className="extra">Quickly request money.</small>
                </div>
              </div>

              {filteredUsers.length > 0 && (
                <>
                  <div className="top-business desktop-none">
                    <small className="font-weight-bold">
                      Your Top People/users
                    </small>
                  </div>

                  <div className="page-title text-center">Contacts</div>

                  <div>
                    {filteredUsers.map((user) => (
                      <div
                        className="item"
                        key={user.id}
                        onClick={() => onSelectUser(user)}
                      >
                        <Avatar user={user} />

                        <div className="item-text">
                          <p className="item-title">{user.first_name} {user.last_name}</p>

                          <p className="mb-0 extra small d-flex justify-content-between">
                            {user.email && <span>{user.email}</span>}
                            {/* <span className="address">Los, Angeles, CA</span> */}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
              {/* <div className="btn-cta bg-white desktop-none">
              {showEmailField && (
                <div className="form-group">
                  <input
                    type="email"
                    className="email-field"
                    placeholder="Enter email address"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setEmailAddress(e.target.value);
                    }}
                  />
                </div>
              )}

              <p className="text-center">
                <small>
                  Not here? That's ok — we'll send them an
                  <button
                    onClick={() => setShowEmailField(!showEmailField)}
                    className="btn-custom-link"
                  >
                    <strong> email.</strong>
                  </button>
                </small>
              </p>

              <button onClick={onNext} className="btn btn-custom rounded-pill">
                Next
              </button>
            </div> */}
            </div>
          </div>

          {user.id && (
            <>
              <div className="divider"></div>

              <div className="recipient-profile">
                <button
                  onClick={() => setShowDropdown(true)}
                  className="mobile-none position-absolute btn-custom-link p-0 btn-save"
                >
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>

                <div className="page-title">Profile</div>

                <div className="text-center mt-5">
                  <Avatar user={user} />

                  <h2 className="m-0 mt-3 text-dark">{getFullName(user)}</h2>
                  <p className="m-0 text-secondary">{user.email}</p>
                </div>

                <div className="text-center my-5">
                  <Link to="#" className="btn btn-add-friend">
                    <FontAwesomeIcon icon={faUser} />
                    Add Friend
                  </Link>
                </div>

                <div className="invoice-history">
                  <p className="font-weight-bold">Invoice History</p>

                  <div className="in-out-tabs mb-3">
                    <button
                      className={
                        currentTab === "in" ? "shadow active" : "shadow"
                      }
                      onClick={() => setCurrentTab("in")}
                    >
                      Incoming
                    </button>
                    <button
                      className={
                        currentTab === "out" ? "shadow active" : "shadow"
                      }
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

                {showDropdown && (
                  <div
                    className="h-100 w-100 fixed-top"
                    onClick={() => setShowDropdown(false)}
                  ></div>
                )}

                {showDropdown && (
                  <div
                    className="position-absolute rounded-top bg-white shadow"
                    style={{ right: "1.5rem", top: "2rem", zIndex: "1050" }}
                  >
                    <button className="btn text-danger">
                      <FontAwesomeIcon icon={faBan} /> Block {getFullName(user)}
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
