import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faEllipsisH,
  faReceipt,
  faTimesCircle,
  faAngleRight,
  faSearch,
  faPlusSquare,
  faArrowDown,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";

import {
  formatCurrency,
  formatDate,
  getFullName,
  notify,
} from "../../utils/helpers";
import { store } from "../../store";
import api from "../../utils/api";

import Menu from "../../components/Menu";
import Aside from "../../components/Aside";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import InvoiceCard from "../../components/InvoiceCard";
import FilterDays from "../../components/FilterDays";
import HR from "../../components/HR";
import InvoiceLoader from "../../components/InvoiceLoader";
import Search from "../../components/Search";

export default function Pay() {
  const history = useHistory();
  const { state, dispatch } = useContext(store);

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [currentTab, setCurrentTab] = useState("out");
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [showInvoiceLoader, setShowInvoiceLoader] = useState(false);

  // const [invoices, setInvoices] = useState([]);
  const [scheduleInvoices, setScheduleInvoices] = useState([]);
  const [paidInvoices, setPaidInvoices] = useState([]);

  const [incoming, setIncoming] = useState([]);
  const [outgoing, setOutgoing] = useState([]);
  const [invoice, setInvoice] = useState({
    id: "",
    dueDate: "",
    frequency: "",
    type: "",
    recipient: {},
    lineItems: [],
  });
  const ul = [
    { id: "1D", text: "1D", active: false },
    { id: "1W", text: "1W", active: false },
    { id: "1M", text: "1M", active: false },
    { id: "1Y", text: "1Y", active: true },
    { id: "ALL", text: "ALL", active: false },
  ];
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [invoiceDropdown, setInvoiceDropdown] = useState(false);

  let noInvoicesSchedule = (
    <div className="no-invoice-placeholder">
      {/* <h3>
        <Link
          to="/invoice/new"
          className="btn btn-custom-link font-weight-bold"
        >
          Get paid by adding your clients here{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </h3> */}

      <img
        src="/images/NEW_calendar_money.svg"
        alt="No invoices"
        width="100%"
      />

      {/* <p className="font-weight-bold">
        Oops! Doesn't look like you have any invoices to review right now.
      </p> */}
    </div>
  );

  let noInvoicesPaid = (
    <div className="no-invoice-placeholder">
      <img src="/images/People_fly_money.svg" alt="No invoices" width="100%" />
    </div>
  );

  const getInvoices = () => {
    api
      .get("invoices?type=incoming")
      .then((response) => {
        if (response.data.data.length) {
          // setInvoices(response.data.data);

          setScheduleInvoices(
            response.data.data.filter((i) => i.status === "pending")
          );
          setPaidInvoices(
            response.data.data.filter((i) => i.status === "paid")
          );
        }
      })
      .catch((error) => console.log(error.response));

    // api
    //   .get("invoices?status=pending,draft&type=outgoing")
    //   .then((response) => {
    //     // console.log(response.data.data);
    //     if (response.data.data.length) {
    //       setOutgoing(response.data.data);
    //     }
    //   })
    //   .catch((errors) => console.log(errors.response));
  };

  const onPay = () => {
    setDisabled(true);
    setLoading(true);

    api
      .post("silas/pay", { invoiceId: invoice.id })
      .then((response) => {
        if (response.data.statusCode === 200) {
          notify(response.data.data.message);
          getInvoices();
          setInvoice({});
        }

        if (response.data.status === "fail") {
          notify(response.data.message, "error");
        }

        setDisabled(false);
        setLoading(false);
      })
      .catch((errors) => {
        if (errors.response.data.status === "fail") {
          notify(errors.response.data.message, "error");
        }

        setDisabled(false);
        setLoading(false);
      });
  };

  const setPaid = () => {
    if (currentTab !== "out" || invoice.status !== "pending") {
      return;
    }

    if (window.confirm("Are you sure?") !== true) return;

    setDisabled(true);
    setLoading(true);

    api
      .put(`invoices/${invoice.id}`, { paid: true })
      // .then((response) => response.data)
      .then((response) => {
        console.log(response);

        if (response.data.success) {
          notify(response.data.message);

          getInvoices();
          setLoading(false);
          setDisabled(false);
          setInvoice({});
          setShowDropdown(false);
        }
      })
      .catch((errors) => {
        setDisabled(false);
        setLoading(false);
      });
  };

  const showInvoice = (invoice) => {
    setShowInvoiceLoader(true);
    setInvoice({ line_items: [] });

    setTimeout(() => {
      setInvoice(invoice);
      setShowInvoiceLoader(false);
    }, 1000);
  };

  const filterHandler = () => {
    console.log("filterHandler");
  };

  // const applySearch = () => {
  //   // Reset List
  //   if (search.length === 0) {
  //     return setSuggestions([]);
  //   }

  //   // Filter list
  //   let filtered = state.users.filter((user) => {
  //     if (
  //       user.company.toLowerCase().includes(search.toLowerCase()) ||
  //       user.company.includes(search) ||
  //       user.email.toLowerCase().includes(search.toLowerCase()) ||
  //       user.email.includes(search)
  //     ) {
  //       return user;
  //     }

  //     return null;
  //   });

  //   setSuggestions(filtered);
  // };

  useEffect(() => {
    getInvoices();
  }, []);

  // useEffect(() => {
  //   applySearch();
  // }, [search]);

  return (
    <div className="home get-paid robinhood">
      <Menu selected={isPaid} setSelected={setIsPaid} title="Pay" />

      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area__updated-version">
          <div className="custom-background">
            <div className="grid--first-child d-flex flex-column">
              <Search />

              <div className="filter-box d-flex justify-content-between align-items-center mt-md-8-rem">
                <div className="page-title displayL__font-size font-weight-bold">
                  Pay
                </div>

                <div className="d-none d-md-block">
                  <Link
                    to="/invoice/new"
                    className="btn btn-custom d-flex justify-content-around px-5 py-2 ml-auto"
                  >
                    Pay or Request
                  </Link>
                </div>
              </div>

              <div className="container-fluid d-none d-md-flex flex-wrap justify-content-center justify-content-lg-between px-md-0">
                <div className="d-md-inline-block mb-5">
                  <FilterDays ul={ul} onClick={filterHandler} />
                  <HR className="mt-0" />
                </div>

                <div className="in-out-tabs">
                  <ul className="menu-tabs">
                    <li
                      className={`cursor-pointer ${!isPaid ? "active" : ""}`}
                      onClick={() => {
                        setIsPaid(false);
                        setInvoice({});
                      }}
                    >
                      Schedule
                    </li>
                    <li
                      className={`cursor-pointer ${isPaid ? "active" : ""}`}
                      onClick={() => {
                        setIsPaid(true);
                        setInvoice({});
                      }}
                    >
                      Paid
                    </li>
                  </ul>
                </div>
              </div>

              <div className="feeds mt-8-rem mt-md-0 pt-3 pt-md-0">
                {isPaid
                  ? paidInvoices.length > 0
                    ? paidInvoices.map((invoice, index) => (
                        <div
                          onClick={() => showInvoice(invoice)}
                          key={invoice.id}
                        >
                          <InvoiceCard
                            invoice={invoice}
                            tab="in"
                            page="pay"
                            id={invoice.id}
                            // id={paidInvoices.length - index}
                          />
                        </div>
                      ))
                    : noInvoicesPaid
                  : scheduleInvoices.length > 0
                  ? scheduleInvoices.map((invoice, index) => (
                      <div
                        onClick={() => showInvoice(invoice)}
                        key={invoice.id}
                      >
                        <InvoiceCard
                          invoice={invoice}
                          tab="out"
                          page="pay"
                          id={invoice.id}
                          // id={scheduleInvoices.length - index}
                        />
                      </div>
                    ))
                  : noInvoicesSchedule}
              </div>
            </div>
          </div>
          {/* {invoice.id && ( */}
          <>
            <div className="divider"></div>
            <div>
              <div className="grid--second-child">
                {invoice.id ? (
                  <div className="home-view-invoice invoice-details position-relative">
                    {loading && <Loader />}

                    <div className="mb-5 pb-5 get-paid__invoice-close-button">
                      <button
                        onClick={() =>
                          setInvoice({
                            id: "",
                            dueDate: "",
                            frequency: "",
                            type: "",
                            recipient: {},
                            lineItems: [],
                          })
                        }
                        className="btn-custom-link btn-save float-right"
                      >
                        <FontAwesomeIcon icon={faTimesCircle} />
                      </button>
                    </div>

                    <div className="page-title text-center displayM__font-size font-weight-bold">
                      INVOICE DETAILS
                    </div>

                    <div>
                      <div className="d-flex flex-column flex-lg-row justify-content-around py-5">
                        <div className="d-flex align-items-center flex-fill">
                          <Avatar
                            className="m-0 mr-4"
                            user={
                              currentTab === "in"
                                ? invoice.sender
                                : invoice.recipient
                            }
                          />
                          <span
                            className="displayS__font-size font-weight-bold cursor-pointer w-50 white-space-nowrap overflow-hidden text-overflow-ellipsis"
                            onClick={() =>
                              history.push(`/profile/${invoice.recipient.id}`)
                            }
                          >
                            {invoice.recipient.first_name
                              ? getFullName(invoice.recipient)
                              : invoice.recipient.email}
                          </span>
                        </div>
                        <div className="d-flex justify-content-center justify-lg-content-end align-items-lg-end">
                          <div className="invoice-dropdown">
                            <a
                              className="btn textLBold__font-size"
                              onClick={() =>
                                setInvoiceDropdown(!invoiceDropdown)
                              }
                            >
                              Actions
                              <span className="float-right">
                                <FontAwesomeIcon icon={faAngleDown} />
                              </span>
                            </a>

                            {invoiceDropdown && (
                              <div className="invoice-dropdown__menu">
                                <a className="invoice-dropdown-item">Action</a>
                                <a className="invoice-dropdown-item">Action</a>
                                <a className="invoice-dropdown-item">Action</a>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* <small className="my-4 font-weight-bold">
                      {currentTab === "out" && (
                        <>
                          <span
                            onClick={() =>
                              history.push(`/profile/${invoice.recipient.id}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {invoice.recipient.name
                              ? invoice.recipient.name
                              : invoice.recipient.email}{" "}
                          </span>
                          <span className="font-weight-normal">
                            {invoice.status === "pending" ? "owes" : "paid"} you
                          </span>
                          <span> {formatCurrency(invoice.total)}</span>
                        </>
                      )}

                      {currentTab === "in" && (
                        <>
                          <span className="font-weight-normal">
                            You {invoice.status === "pending" ? "owes" : "paid"}{" "}
                          </span>
                          {formatCurrency(invoice.total)}
                          <span className="font-weight-normal"> to </span>
                          <span
                            onClick={() =>
                              history.push(`/profile/${invoice.sender.id}`)
                            }
                            style={{ cursor: "pointer" }}
                          >
                            {invoice.sender.name
                              ? invoice.sender.name
                              : invoice.sender.email}
                          </span>
                        </>
                      )}
                    </small>
                    <small className="extra-small">
                      Due: {formatDate(invoice.due_at)}
                    </small> */}
                      </div>

                      <div>
                        <div className="invoice-details__table mb-4">
                          <div className="invoice-details__table__first d-flex">
                            <div className="invoice-details__table__first--left p-5">
                              <div className="textL__font-size">
                                <h4 className="textL__font-size">
                                  Vendor name
                                </h4>
                                <p>Coral Lab</p>
                              </div>
                              <div className="textL__font-size">
                                <h4 className="textL__font-size">Due date</h4>
                                <p>Mar 18, 2021</p>
                              </div>
                              <div className="textL__font-size">
                                <h4 className="textL__font-size">Bill #</h4>
                                <p>234085</p>
                              </div>
                            </div>
                            <div className="flex-fill invoice-details__table__first--right p-5">
                              <table className="w-100 textS__font-size">
                                <thead>
                                  <tr>
                                    <th className="w-25 pb-2">
                                      <u>Qty</u>
                                    </th>
                                    <th className="w-100 pb-2">
                                      <u>Description</u>
                                    </th>
                                    <th className="pb-2">
                                      <u>Price</u>
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {invoice.line_items.map((li, index) => (
                                    <tr key={index}>
                                      <td>{li.qty}</td>
                                      <td>{li.title}</td>
                                      <td className="text-right">
                                        {formatCurrency(li.price)}
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="invoice-details__table__second d-flex align-items-center justify-content-between displayS__font-size px-5 py-4">
                            <span>Total to pay</span>
                            <span className="font-weight-bold">$210.47</span>
                          </div>
                        </div>

                        <div className="btn-cta bg-white">
                          <button
                            className="btn btn-custom mb-3"
                            disabled={true}
                          >
                            Schedule this payment
                          </button>
                        </div>

                        {/* <div className="row textM__font-size">
                          <div className="col-12 col-lg-6 col-xl-4">
                            <h4 className="textMBold__font-size">Bill To:</h4>
                            <p>{`${invoice.recipient.company}, ${invoice.recipient.address1}`}</p>
                          </div>
                          <div className="col-12 col-lg-6 col-xl-4">
                            <h4 className="textMBold__font-size">Ship To:</h4>
                            <p>{`${invoice.recipient.company}, ${invoice.recipient.address1}`}</p>
                          </div>
                          <div className="col-12 col-lg-12 col-xl-4">
                            <div className="d-flex">
                              <h4 className="w-50 m-0 mr-3 textMBold__font-size">
                                Invoice #
                              </h4>
                              <p className="w-50 mb-0 text-right">
                                {invoice.id}
                              </p>
                            </div>
                            <div className="d-flex">
                              <h4 className="w-50 m-0 mr-3 textMBold__font-size">
                                Invoice Date
                              </h4>
                              <p className="w-50 mb-0 text-right">
                                {formatDate(invoice.created_at, "MM/DD/YYYY")}
                              </p>
                            </div>
                            <div className="d-flex">
                              <h4 className="w-50 m-0 mr-3 textMBold__font-size">
                                P.O #
                              </h4>
                              <p className="w-50 mb-0 text-right">2312/2019</p>
                            </div>
                            <div className="d-flex">
                              <h4 className="w-50 m-0 mr-3 textMBold__font-size">
                                Due Date
                              </h4>
                              <p className="w-50 mb-0 text-right">
                                {formatDate(invoice.due_at, "MM/DD/YYYY")}
                              </p>
                            </div>
                          </div>
                        </div> */}

                        {/* <div className="row mt-3 mt-xl-5">
                          <div className="col-12 col-xl-4"></div>
                          <div className="col-12 col-xl-8">
                            <table className="w-100 textS__font-size">
                              <thead>
                                <th className="w-25">Qty</th>
                                <th className="w-100">Description</th>
                                <th>Price</th>
                              </thead>
                              <tbody>
                                {invoice.line_items.map((li) => (
                                  <tr>
                                    <td>{li.qty}</td>
                                    <td>{li.title}</td>
                                    <td className="text-right">
                                      {formatCurrency(li.price)}
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                            <HR />
                            <div className="float-right displayS__font-size font-weight-bold">
                              <span className="mr-5">Total</span>
                              <span>{formatCurrency(invoice.total)}</span>
                            </div>
                          </div>
                        </div> */}

                        {/* <div className="container-fluid">
                          <div className="row mt-3 mt-xl-5">
                            <div className="w-100">
                              <button
                                className="btn get-paid__invoice--outline-button mb-3 d-flex align-items-center justify-content-between"
                                disabled={invoice.status === "paid"}
                              >
                                <span className="d-inline-flex align-items-center float-left">
                                  <span>
                                    <img
                                      className="mr-3"
                                      style={{ width: "50px" }}
                                      src="data:image/png;base64,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"
                                    />
                                  </span>
                                  <span className="d-flex flex-column justify-content-start">
                                    <h4
                                      className="m-0 textS__font-size"
                                      style={{
                                        fontSize: "11px",
                                        color: "black",
                                        fontWeight: "600",
                                        lineHeight: "15px",
                                      }}
                                    >
                                      Charles Scwab
                                    </h4>
                                    <span
                                      className="m-0 text-left textS__font-size"
                                      style={{
                                        fontSize: "9px",
                                        color: "#B9B9B9",
                                        lineHeight: "10px",
                                      }}
                                    >
                                      Debit **4033
                                    </span>
                                  </span>
                                </span>
                                <span className="float-right">
                                  <FontAwesomeIcon icon={faAngleRight} />
                                </span>
                              </button>
                            </div>
                            <div className="w-100">
                              <button
                                className="btn btn-custom mb-3 textLBold__font-size get-paid__invoice--primary-button"
                                disabled={invoice.status === "paid"}
                              >
                                <span>Pay</span>
                                <span className="float-right">
                                  {formatCurrency(invoice.total)}
                                </span>
                              </button>
                            </div>
                          </div>
                        </div> */}
                      </div>

                      {/* <div className="invoice-items-list px-4 px-md-0">
                    {invoice.line_items.map((item, index) => (
                      <div className="create-invoice-item shadow" key={index}>
                        <span className="qty">{item.qty}</span>

                        <div className="description">
                          {item.title}

                          <small className="text-secondary">
                            {item.description}
                          </small>
                        </div>

                        <div className="price">
                          {formatCurrency(
                            item.price * (item.qty ? item.qty : 1)
                          )}
                          <span className="desktop-none"> (X{item.qty})</span>
                        </div>
                      </div>
                    ))}
                  </div> */}

                      {/* {currentTab === "in" && invoice.status === "pending" && (
                        <div className="btn-cta bg-white">
                          <button
                            className="btn btn-custom mb-3"
                            onClick={onPay}
                            disabled={true}
                          >
                            Pay
                          </button>
                        </div>
                      )} */}
                    </div>

                    {showDropdown && (
                      <div
                        className="h-100 w-100 fixed-top"
                        onClick={() => setShowDropdown(false)}
                      ></div>
                    )}

                    {showDropdown && (
                      <div
                        className="position-absolute rounded-top bg-white shadow"
                        style={{ right: "0", top: "2rem", zIndex: "1050" }}
                      >
                        <button
                          className="btn"
                          onClick={setPaid}
                          disabled={
                            currentTab === "out" && invoice.status === "pending"
                              ? false
                              : true
                          }
                        >
                          Mark as paid
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="d-none d-md-flex justify-content-center">
                    {<InvoiceLoader animate={showInvoiceLoader} />}
                  </div>
                )}
              </div>
            </div>
          </>
          {/* )} */}
        </div>
      </div>

      <div className="btn-cta bg-white border-top desktop-none">
        <Link
          to="/invoice/new"
          onClick={() => dispatch({ type: "RESET_INVOICE" })}
          className="btn btn-custom btn-pay-request"
        >
          <FontAwesomeIcon icon={faReceipt} /> Pay or Request Invoice
        </Link>
      </div>

      <Link
        to="/invoice/new"
        className="send-invoice h-auto w-auto text-primary"
        style={{ fontSize: "3rem" }}
      >
        <FontAwesomeIcon icon={faPlusSquare} size="2x" />
      </Link>
    </div>
  );
}
