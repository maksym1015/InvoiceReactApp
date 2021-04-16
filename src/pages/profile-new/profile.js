import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faCalendar, faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  dashboardGraph,
  formatCurrency,
  getFullName,
  notify,
  total,
} from "../../utils/helpers";

import Aside from "../../components/Aside";
import RatingsSquare from "../../components/RatingsSquare";
import RatingsBar from "../../components/RatingsBar";
import RatingsRound from "../../components/RatingsRound";
import MerchantTile from "../../components/MerchantTile";
import Switch from "../../components/Switch";
import Card from "../../components/Card";
import More from "../../components/More";
import TextField from "../../components/TextField";
import HR from "../../components/HR";
import DateField from "../../components/DateField";

import { store } from "../../store";
import Avatar from "../../components/Avatar";
import api from "../../utils/api";
import TextareaField from "../../components/TextareaField";
import moment from "moment";
import Loader from "../../components/Loader";

export default function ProfileUser() {
  const history = useHistory();
  const { state } = useContext(store);
  const { id } = useParams();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showDescription, setShowDescription] = useState(false);

  const [lineItemId, setLineItemId] = useState(1);
  const [recurring, setRecurring] = useState(false);
  const [dueAt, setDueAt] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [lineItems, setLineItems] = useState([]);
  const [isQuick, setIsQuick] = useState(false);

  const [user, setUser] = useState({});
  const [invoices, setInvoices] = useState([]);

  const getProfile = () => {
    setLoading(true);

    api
      .get(`users/${id}`)
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.data);

          getInvoices();
        }

        setLoading(false);
      })
      .catch((errors) => {
        console.log(errors.response);
        setLoading(false);
      });
  };

  const getInvoices = () => {
    api
      .get(`invoices?recipient=${id}`)
      .then((response) => response.data)
      .then((response) => {
        setInvoices(response.data);
      })
      .catch((error) => {
        console.log("error fetching invoices");
      });
  };

  const addLineItem = () => {
    if (!title) return notify("Please add title", "error");

    if (!price || price <= 0) return notify("Please add price", "error");

    if (!description) return notify("Please add description", "error");

    setLineItems([
      ...lineItems,
      { id: lineItemId, title, price: price * 100, description },
    ]);

    setLineItemId(lineItemId + 1);
    setTitle("");
    setPrice("");
    setDescription("");
  };

  const removeLineItem = (value) => {
    setLineItems(lineItems.filter((li) => li.id !== value.id));
  };

  const onSendInvoice = () => {
    if (!dueAt) return notify("Please select due date", "error");

    if (moment() > moment(dueAt))
      return notify("Due date cannot be past date", "error");

    if (!isQuick && !lineItems.length)
      return notify("Please add at least one line item", "error");

    if (isQuick && (!title || !price))
      return notify("Please add title and price", "error");

    createInvoice();
  };

  const createInvoice = () => {
    let formData = {
      recurring,
      due_at: dueAt,
      recipient: user.email,
      line_items: lineItems,
      frequency: recurring ? "monthly" : "once",
      type: "",
    };

    if (isQuick) {
      formData.is_quick = isQuick;
      formData.total = price * 100;
      formData.title = title;
    }

    setDisabled(true);
    setLoading(true);

    api
      .post("invoices", formData)
      .then((response) => {
        // console.log(response.data);
        if (response.data.success) {
          notify("Success! Invoice sent.");

          setLineItems([]);
          setDueAt("");
          setRecurring(false);
          setTitle("");
          setIsQuick(false);
          setPrice("");

          if (!response.data.data.line_items)
            response.data.data.line_items = [];

          setInvoices([response.data.data, ...invoices]);
        }

        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        console.log(error.response);
        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    // logged in user can't see his profile window (other user's profile screen)
    if (state.user.id == id) return history.goBack();
    // dashboardGraph();
    getProfile();
  }, []);

  return (
    <div className="profile-user robinhood">
      {loading && <Loader />}

      <div className="d-flex desktop-nav-p">
        <Aside />
        {user.id && (
          <div className="main-container">
            <div className="d-flex flex-column flex-xl-row">
              <div className="col-12 col-xl-6 d-flex flex-column pb-5">
                <div className="d-flex align-items-center mb-xl-5 position-relative m-0">
                  {/* <span className="profile-user__avatar"></span> */}

                  <div className="w-100 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center w-100">
                      <div>
                        <Avatar user={user} className="profile-avatar" />
                      </div>

                      <span className="ml-3 displayL__font-size w-50 mr-auto white-space-nowrap overflow-hidden text-overflow-ellipsis">
                        {getFullName(user)}
                      </span>
                    </div>

                    <a className="w-25 d-none d-xl-block textMBold__font-size text-primary">
                      Add to contacts
                    </a>
                  </div>

                  <button
                    className="btn-icon d-md-none ml-auto text-primary"
                    onClick={() => history.goBack()}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>
                <div className="profile-user__about">
                  <div className="profile-user__about--heading font-bold">
                    <h3 className="displayM__font-size">About</h3>
                  </div>
                  <HR className="d-none d-xl-block" />
                  <div className="textM__font-size">
                    {getFullName(user)}, {user.address1}
                  </div>
                </div>

                <div className="d-flex flex-column flex-xl-row">
                  <div className="w-100 row">
                    <div className="col-xl-8 d-flex flex-xl-wrap flex-column flex-xl-row order-1 order-xl-0">
                      <span className="profile-user__link mb-5">
                        <h4 className="info-hed-color textSBold__font-size">
                          Email
                        </h4>
                        <span className="info-des-color textS__font-size">
                          {user.email}
                        </span>
                      </span>
                      <span className="profile-user__link mb-5">
                        <h4 className="info-hed-color textSBold__font-size">
                          Website
                        </h4>
                        <span className="info-des-color textS__font-size">
                          {user.email ? user.email.split("@")[1] : ''}
                        </span>
                      </span>
                      {/* <span className="profile-user__link">
                        <h4 className="info-hed-color textSBold__font-size">
                          Referred by
                        </h4>
                        <span className="info-des-color textS__font-size">
                          Tom’s Dough company
                        </span>
                      </span> */}
                    </div>

                    <div className="col-xl-4 d-flex align-items-end justify-content-center justify-content-xl-end order-0 order-xl-0 mb-5 mb-xl-0">
                      <a className="textSBold__font-size text-primary">
                        {/* See more */}
                      </a>
                    </div>
                  </div>
                </div>

                <div className="profile-user__ratings mt-5">
                  <div className="profile-user__ratings--heading mb-5 mb-xl-4 font-bold">
                    <h3 className="displayM__font-size">Ratings</h3>
                    <span className="d-inline-block d-xl-none">
                      (6 sources)
                    </span>
                  </div>
                  <div className="profile-user__ratings--wrapper">
                    <div className="d-none d-xl-flex">
                      <RatingsSquare
                        className="mr-4 active"
                        title="Yelp"
                        rating="4.5"
                      />
                      <RatingsSquare
                        className="mr-4"
                        title="Google Reviews"
                        rating="4.5"
                      />
                      <RatingsSquare title="Trust Pilot" rating="4.5" />
                    </div>
                    <div className="d-flex align-items-center d-xl-none">
                      <div>
                        <RatingsRound className="text-success" rating="3.7" />
                      </div>
                      <div className="flex-fill">
                        <RatingsBar
                          title="5 stars"
                          rating="2.3"
                          progressColor="#2ec4b6"
                        />
                        <RatingsBar
                          title="4 stars"
                          rating="2.7"
                          progressColor="#1F1F1F"
                        />
                        <RatingsBar
                          title="3 stars"
                          rating="4.5"
                          progressColor="#1F1F1F"
                        />
                      </div>
                    </div>
                    <div></div>
                  </div>
                </div>

                <div className="profile-user__merchant mt-5 mt-md-0 mb-5 mb-md-0">
                  <div className="profile-user__merchant--heading">
                    <h3 className="displayM__font-size">
                      Previous transactions with this merchant
                    </h3>
                    <div className="d-none d-xl-block">
                      <a className="textSBold__font-size text-primary">
                        {/* See more */}
                      </a>
                    </div>
                  </div>
                  <HR />
                  <div className="profile-user__merchant--wrapper">
                    {invoices.map((invoice) => (
                      <div
                        key={invoice.id}
                        onClick={() =>
                          history.push(`/invoice/${invoice.id}/view`)
                        }
                        className={
                          invoice.sender_id === state.user.id
                            ? "text-danger"
                            : "text-success"
                        }
                        style={{ cursor: "pointer" }}
                      >
                        <div className={`mt-5 mt-xl-0 mb-4 mb-xl-0 `}>
                          <MerchantTile title="invoice" item={invoice} />
                        </div>

                        <HR className="d-none d-md-block" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="col-12 col-xl-6 d-none d-xl-flex justify-content-center">
                <div className="min-width-480-px max-width-480-px px-5">
                  <Card
                    title="Send an invoice"
                    onChangeType={setIsQuick}
                    style={{ position: "fixed", maxWidth: "420px" }}
                  >
                    <div className="px-4 py-3">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="textMBold__font-size">Recurring</h5>
                        <Switch status={recurring} onChange={setRecurring} />
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="textMBold__font-size">Due Date</h5>
                        <DateField
                          label={
                            <FontAwesomeIcon
                              className="text-light-grey"
                              icon={faCalendar}
                            />
                          }
                          calendarIcon={null}
                          clearIcon={null}
                          variant="filled"
                          wrapperClassName="max-width-200-px"
                          onChange={setDueAt}
                          value={dueAt}
                        />
                      </div>
                    </div>
                    <HR />
                    <div className="d-none d-xl-block px-4 py-3">
                      <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="textLBold__font-size">Total</h2>
                        <h2 className="textLBold__font-size">
                          {isQuick
                            ? formatCurrency(price * 100)
                            : formatCurrency(total(lineItems))}
                        </h2>
                      </div>

                      {lineItems.map((li, i) => (
                        <div
                          className="d-flex justify-content-between align-items-center px-4 mb-3"
                          key={li.id}
                        >
                          <h5 className="textMBold__font-size">{li.title}</h5>
                          <div className="d-flex justify-content-center align-items-center">
                            <More
                              className="mr-5"
                              lineItem={li}
                              onClick={removeLineItem}
                            />
                            <h5 className="textMBold__font-size">
                              {formatCurrency(li.price)}
                            </h5>
                          </div>
                        </div>
                      ))}

                      {showDescription ? (
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div className="flex-fill">
                            <TextareaField
                              variant="filled"
                              placeholder="Enter description"
                              autoComplete="off"
                              padding="20px"
                              rows="5"
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            />
                          </div>
                          <div
                            className="white-space-nowrap ml-3 font-bold text-xs text-primary"
                            style={{ cursor: "pointer" }}
                            onClick={() => setShowDescription(!showDescription)}
                          >
                            hide description
                          </div>
                        </div>
                      ) : (
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div className="w-100 mr-3">
                            <TextField
                              variant="filled"
                              placeholder="Enter title"
                              padding="20px"
                              value={title}
                              onChange={(e) => setTitle(e.target.value)}
                            />
                          </div>
                          {!isQuick && (
                            <div
                              className="white-space-nowrap ml-3 mr-5 textSBold__font-size text-primary"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setShowDescription(!showDescription)
                              }
                            >
                              add description
                            </div>
                          )}
                          <TextField
                            label="$"
                            variant="filled"
                            className="text-right"
                            placeholder="0.00"
                            autoComplete="off"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                          />
                          {!isQuick && (
                            <button
                              className="btn btn-custom-link"
                              onClick={addLineItem}
                            >
                              <FontAwesomeIcon icon={faPlus} />
                            </button>
                          )}
                        </div>
                      )}

                      <div>
                        <button
                          className="btn btn-custom d-flex justify-content-around mb-3"
                          onClick={onSendInvoice}
                          disabled={disabled}
                        >
                          <span className="textLBold__font-size">
                            Send Invoice for{" "}
                            {isQuick
                              ? formatCurrency(price * 100)
                              : formatCurrency(total(lineItems))}
                          </span>
                        </button>
                        <button className="btn w-100">
                          <span className="text-primary textSBold__font-size">
                            Preview
                          </span>
                        </button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>

              <div className="d-xl-none">
                <div className="btn-cta">
                  <button className="btn btn-custom d-flex justify-content-around ml-auto" onClick={() => history.push('/invoice/new')}>
                    Pay or Request
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
