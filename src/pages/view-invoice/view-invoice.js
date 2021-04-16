import React, { useState, useEffect, useContext } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";

import { store } from "../../store";
import api from "../../utils/api";
import { formatCurrency, formatDate, getFullName, notify } from "../../utils/helpers";

import Header from "../../components/Header";
import Loader from "../../components/Loader";
import Avatar from "../../components/Avatar";
import Aside from "../../components/Aside";
import InvoiceLoader from "../../components/InvoiceLoader";

export default function ViewInvoice() {
  const history = useHistory();
  const { state } = useContext(store);
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [invoice, setInvoice] = useState({
    id: "",
    dueDate: "",
    frequency: "",
    type: "",
    recipient: {},
    lineItems: [],
  });

  const fetchInvoice = () => {
    api
      .get(`invoices/${id}`)
      .then((response) => {
        if (response.data.success) {
          setInvoice(response.data.data);
        }

        setShow(true);
      })
      .catch((errors) => {
        console.log("error fetching invoice");

        setShow(true);
      });
  };

  const onPay = () => {
    setDisabled(true);
    setLoading(true);

    api
      .post("silas/pay", { invoiceId: id })
      .then((response) => {
        if (response.data.statusCode === 200) {
          notify(response.data.data.message);
          history.goBack();
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
    if (!isSender() || invoice.status !== "pending") {
      return;
    }

    if (window.confirm("Are you sure?") !== true) return;

    setDisabled(true);
    setLoading(true);

    api
      .put(`invoices/${invoice.id}`, { paid: true })
      .then((response) => {
        if (response.data.success) {
          notify(response.data.message);
          history.goBack();
        }
      })
      .catch((errors) => {
        console.log("error setting as paid");

        setDisabled(false);
        setLoading(false);
      });
  };

  const isSender = () => {
    return invoice.sender_id === state.user.id;
  };

  useEffect(() => {
    fetchInvoice();
  }, []);

  return (
    <div className="view-invoice">
      {loading && <Loader />}
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area position-relative">
          <button
            onClick={() => setShowDropdown(true)}
            className="mobile-none position-absolute btn-custom-link p-0 btn-save"
            style={{ right: "2.5rem" }}
          >
            <FontAwesomeIcon icon={faEllipsisH} />
          </button>

          <div className="page-title">View Invoice</div>

          <div className="pb-15">
            <Header title="View Invoice" />

            {show ? (
              <>
                <div className="d-flex flex-column align-items-center justify-content-around bg-white py-4 py-md-5">
                  <Avatar user={invoice.recipient} />

                  <small className="my-4 font-weight-bold text-center">
                    {isSender() ? (
                      <>
                        <span
                          onClick={() =>
                            history.push(`/profile/${invoice.recipient.id}`)
                          }
                          style={{ cursor: "pointer" }}
                        >
                          {invoice.recipient.first_name
                            ? getFullName(invoice.recipient)
                            : invoice.recipient.email}{" "}
                        </span>
                        <span className="font-weight-normal">
                          {invoice.status === "pending" ? "owes" : "paid"} you
                        </span>
                        <span> {formatCurrency(invoice.total)}</span>
                      </>
                    ) : (
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
                          {invoice.sender.first_name
                            ? getFullName(invoice.sender)
                            : invoice.sender.email}
                        </span>
                      </>
                    )}
                  </small>
                  <small className="extra-small">
                    Due: {formatDate(invoice.due_at)}
                  </small>
                </div>

                {invoice.is_quick ? (
                  <div className="invoice-items-list px-4 px-md-0">
                    <div className="create-invoice-item shadow py-4">
                      <div className="description pb-0">{invoice.title}</div>

                      <div className="price">
                        {formatCurrency(invoice.total)}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="invoice-items-list px-4 px-md-0">
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
                          <span className="desktop-none small">
                            {" "}
                            (X{item.qty})
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {isSender() && invoice.status === "pending" && (
                  <div className="btn-cta bg-white desktop-none">
                    <button className="btn btn-custom" onClick={setPaid}>
                      Mark as Paid
                    </button>
                  </div>
                )}

                {!isSender() && invoice.status === "pending" && (
                  <div className="btn-cta bg-white">
                    <button
                      className="btn btn-custom mb-3"
                      onClick={onPay}
                      disabled={true}
                    >
                      Pay
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="mx-3 mt-5">
                <InvoiceLoader />
              </div>
            )}
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
              style={{ right: "2.5rem", top: "5rem", zIndex: "1050" }}
            >
              <button
                className="btn"
                onClick={setPaid}
                disabled={
                  isSender() && invoice.status === "pending" ? false : true
                }
              >
                Mark as paid
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
