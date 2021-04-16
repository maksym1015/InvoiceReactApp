import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import { motion } from "framer-motion";

import DatePicker from "react-date-picker";
import "./invoice.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faArrowRight,
  faChevronLeft,
  faFileInvoiceDollar,
  faPlus,
  faSave,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";

import { store } from "../../../store";
import { formatCurrency, getFullName, notify } from "../../../utils/helpers";
import api from "../../../utils/api";

import Aside from "../../../components/Aside";
import Loader from "../../../components/Loader";
import SimpleInvoice from "../../../components/invoices/SimpleInvoice";
import ItemModal from "../../../components/ItemModal";
import { pageVariants } from "../../../utils/transitions";

export default function OBInvoice() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [item, setItem] = useState({
    id: "",
    title: "",
    price: "",
    qty: 1,
    description: "",
  });

  const [showEmailField, setShowEmailField] = useState(false);
  const [itemModal, setItemModal] = useState(false);
  const [dueAt, setDueAt] = useState(state.invoice.dueAt);
  const [frequency, setFrequency] = useState(state.invoice.frequency);
  const [type, setType] = useState(state.invoice.type);
  const [total, setTotal] = useState(0);

  const onRemove = (index) => {
    dispatch({ type: "REMOVE_LINE_ITEM", payload: index });
  };

  const onSend = () => {
    if (state.recipient.email === "") {
      return notify("Error! Invalid recipient.", "error");
    }

    if (dueAt === "" || frequency === "") {
      return notify("Error! Please fill all invoice fields.", "error");
    }

    if (state.lineItems.length === 0) {
      return notify("Error! Please add invoice item(s).", "error");
    }

    sendInvoice();
  };

  const sendInvoice = () => {
    let formData = {
      frequency: frequency,
      type: type,
      due_at: dueAt,
      recipient: state.recipient.email,
      line_items: state.lineItems,
    };

    setDisabled(true);
    setLoading(true);

    // formData.line_items.map(li => li.price *= 100);

    api
      .post("invoices", formData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success) {
          notify("Success! Invoice sent.");
          dispatch({ type: "RESET_INVOICE" });
          history.push("/home");

          // if (!state.user.sila) {
          //   history.push("/sila");
          // } else {
          //   history.push("/home");
          // }
        }
      })
      .catch((errors) => {
        // if (errors.response.status === 400) {
        //   notify(`Error! ${errors.response.data.message}`, "error");
        //   console.clear();
        //   setDisabled(false);
        //   setLoading(false);
        // }
      });
  };

  const selectRecipient = (user) => {
    if (!user.id) {
      user.first_name = "";
    }

    dispatch({
      type: "ADD_RECIPIENT",
      payload: user,
    });

    setShowEmailField(false);
    setFilteredUsers([]);
  };

  const fetchUsers = () => {
    api.get("users").then((response) => {
      if (response.data.length) {
        setUsers(response.data.filter((u) => u.id !== state.user.id));
      }
    });
  };

  const handleSubmit = async (query) => {
    // Reset List
    if (query.length === 0) return setFilteredUsers([]);

    // Filter list
    let filteredUsers = await users.filter((user) => {
      // filter base on @username
      // if (query[0] === "@" && `@${user.username}`.includes(query)) {
      //   return user;
      // }

      // filter base on name
      if (
        user.first_name.toLocaleLowerCase().includes(query) ||
        user.first_name.includes(query) ||
        user.email.toLocaleLowerCase().includes(query) ||
        user.email.includes(query)
      ) {
        return user;
      }

      return null;
    });

    // non existing users check
    if (filteredUsers.length === 0)
      filteredUsers.push({
        first_name: "Not here? That's ok — we'll send them an email.",
        last_name: "",
        email: query,
      });

    setFilteredUsers(filteredUsers);
  };

  const onEditItem = (id) => {
    let item = state.lineItems[id];

    setItem({ ...item, id });
    setItemModal(true);
  };

  useEffect(() => {
    if (users.length === 0) fetchUsers();

    // total price
    let total = 0;
    state.lineItems.forEach((item) => {
      if (item.qty) {
        total += parseFloat(item.price) * parseFloat(item.qty);
      } else {
        total += parseFloat(item.price);
      }
    });

    setTotal(total.toFixed(2));

    dispatch({ type: "UPDATE_INVOICE", payload: { dueAt, frequency, type } });
  }, [dueAt, frequency, state.lineItems, itemModal]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      className="create-invoice"
    >
      {loading && <Loader />}

      <div className="d-flex">
        {/* <Aside /> */}

        <div className="content-area">
          <div className="create-invoice-box px-4 pt-4 position-relative">
            <div className="page-title text-center">Create an invoice</div>

            <div className="mt-n4 mb-3 pb-4 pt-3 pt-md-0 pb-md-0 text-center">
              <Link to="/ob-templates" className="btn btn-custom-link p-0">
                Start from scratch or use template here{" "}
                <FontAwesomeIcon icon={faArrowRight} />
              </Link>
            </div>

            <div className="form mx-n4 mt-n4 px-4 pt-3 desktop-reset">
              {/* <div className="header desktop-none">
                <button
                  onClick={() => history.goBack()}
                  className="position-absolute btn-custom-link p-0"
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>

                <div className="text-center">Send or Request Invoice</div>
              </div> */}

              <div className="create-invoice mx-n4 px-4 desktop-reset">
                <div className="invoice-item position-relative">
                  <label onClick={() => setShowEmailField(!showEmailField)}>
                    Recipient
                  </label>

                  {!showEmailField && state.recipient.email !== "" ? (
                    <div
                      className="mr-n1 d-flex"
                      onClick={() => setShowEmailField(!showEmailField)}
                    >
                      <span className="invoice-item-text">
                        {state.recipient.first_name
                          ? getFullName(state.recipient)
                          : state.recipient.email}
                      </span>
                      {state.recipient.image ? (
                        <div className="business-img-placeholder"></div>
                      ) : (
                        // <img
                        //   src={
                        //     process.env.REACT_APP_IMAGE_PATH +
                        //     state.recipient.image
                        //   }
                        //   className="invoice-item-icon"
                        //   alt="recipient-logo"
                        // />
                        <div className="business-img-placeholder"></div>
                      )}
                    </div>
                  ) : (
                    <div className="d-flex mr-n1">
                      <input
                        type="text"
                        placeholder="Search for a user"
                        className="text-right mr-2"
                        onChange={(e) => handleSubmit(e.target.value)}
                      />
                      <div className="business-img-placeholder"></div>
                    </div>
                  )}

                  <ul className="search-dropdown shadow">
                    {filteredUsers.map((user) => (
                      <li
                        onClick={() => selectRecipient(user)}
                        key={user.email}
                      >
                        {getFullName(user)} <small>({user.email})</small>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="invoice-item">
                  <label>Due Date</label>
                  <DatePicker
                    onChange={setDueAt}
                    value={dueAt}
                    clearIcon={null}
                  />
                </div>

                <div className="invoice-item desktop-border-none">
                  <label>Frequency</label>
                  <div className="d-flex align-items-center desktop-none">
                    <select
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className="form-control"
                    >
                      <option value="once">Once</option>
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                      <option value="bi-monthly">Bi-Monthly</option>
                      <option value="quartery">Quarterly</option>
                    </select>
                    <span className="invoice-item-icon">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </div>
                  <ul className="invoice-tabs mx-auto">
                    <li
                      className={frequency === "once" ? "active" : ""}
                      onClick={() => setFrequency("once")}
                    >
                      One Time
                    </li>
                    <li
                      className={frequency === "weekly" ? "active" : ""}
                      onClick={() => setFrequency("weekly")}
                    >
                      Weekly
                    </li>
                    <li
                      className={frequency === "monthly" ? "active" : ""}
                      onClick={() => setFrequency("monthly")}
                    >
                      Monthly
                    </li>
                  </ul>
                </div>

                {/* <div className="invoice-item desktop-none">
                  <label>Type</label>
                  <div className="d-flex align-items-center">
                    <select
                      value={type}
                      onChange={(event) => setType(event.target.value)}
                      className="form-control"
                    >
                      <option value="service">Service</option>
                      <option value="fee">Fee</option>
                    </select>
                    <span className="invoice-item-icon">
                      <FontAwesomeIcon icon={faAngleDown} />
                    </span>
                  </div>
                </div> */}

                <div className="text-center py-5 add-item">
                  <Link
                    to="#"
                    onClick={() => setItemModal(true)}
                    className="btn-custom-link d-inline-block"
                  >
                    <FontAwesomeIcon icon={faPlus} /> <br />
                    <span>Add item</span>
                  </Link>
                </div>
              </div>
            </div>

            <div className="invoice-items-list">
              {state.lineItems.map((item, index) => (
                <div className="create-invoice-item shadow" key={index}>
                  <button
                    onClick={(e) => onRemove(index, e)}
                    className="item-remove"
                  >
                    <FontAwesomeIcon icon={faTimesCircle} />
                  </button>

                  <span className="qty">{item.qty}</span>

                  <div className="description">
                    <Link
                      to="#"
                      className="text-dark"
                      onClick={() => onEditItem(index)}
                    >
                      {item.title}
                    </Link>

                    <small className="text-secondary">{item.description}</small>
                  </div>

                  <div className="price">
                    {/* $
                    {parseFloat(item.price * (item.qty ? item.qty : 1)).toFixed(
                      2
                    )}{" "} */}
                    {formatCurrency(item.price)}
                    <span className="desktop-none">(X{item.qty})</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="divider"></div>

          <div className="px-4 pb-7">
            <p className="font-weight-bold text-center text-primary">Preview</p>

            <SimpleInvoice
              items={state.lineItems}
              hideImage={true}
              hideTitle={true}
            />
          </div>
        </div>
      </div>

      <div className="btn-cta">
        {/* <button className="btn btn-custom-outline btn-draft">
        Save as Draft
      </button> */}
        <button
          onClick={onSend}
          className="btn btn-custom rounded-pill d-flex justify-content-around ml-auto"
          disabled={disabled}
        >
          <span></span>
          <span>Send Invoice</span>
          <span className="font-weight-bold">{formatCurrency(total)}</span>
        </button>
      </div>

      <ItemModal
        show={itemModal}
        setShow={setItemModal}
        item={item}
        setItem={setItem}
      />
    </motion.div>
  );
}
