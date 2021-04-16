import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faReceipt } from "@fortawesome/free-solid-svg-icons";

import { formatCurrency, formatDate } from "../../utils/helpers";
import { store } from "../../store";
import api from "../../utils/api";

import Menu from "../../components/Menu";
import Aside from "../../components/Aside";
import Avatar from "../../components/Avatar";
import Loader from "../../components/Loader";
import InvoiceCard from "../../components/InvoiceCard";
import InvoiceButton from "../../components/InvoiceButton";

export default function Home() {
  const { dispatch } = useContext(store);

  const [currentTab, setCurrentTab] = useState("out");

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

  let noInvoices = (
    <div className="no-invoice-placeholder">
      <h3>
        <Link
          to="/invoice/new"
          className="btn btn-custom-link font-weight-bold"
        >
          Get paid by adding your clients here{" "}
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </h3>

      <img src="/images/empty-state.png" alt="No invoices" />

      <p className="font-weight-bold">
        Oops! Doesn't look like you have any invoices to review right now.
      </p>
    </div>
  );

  const getInvoices = () => {
    api
      .get("invoices?status=paid&type=incoming")
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data.length) {
          setIncoming(response.data.data);
        }
      })
      .catch((errors) => console.log(errors.response));

    api
      .get("invoices?status=paid&type=outgoing")
      .then((response) => {
        // console.log(response.data.data);
        if (response.data.data.length) {
          setOutgoing(response.data.data);
        }
      })
      .catch((errors) => console.log(errors.response));
  };

  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <div className="history">
      <Menu
        selected={currentTab}
        setSelected={setCurrentTab}
        title="History"
      />

      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div>
            <div className="page-title">Invoices History</div>

            <div className="filter-box d-flex justify-content-between">
              <div className="in-out-tabs">
                <button
                  className={currentTab === "in" ? "shadow active" : "shadow"}
                  onClick={() => {
                    setCurrentTab("in");
                    setInvoice({});
                  }}
                >
                  Incoming
                </button>
                <button
                  className={currentTab === "out" ? "shadow active" : "shadow"}
                  onClick={() => {
                    setCurrentTab("out");
                    setInvoice({});
                  }}
                >
                  Outgoing
                </button>
              </div>
            </div>

            <div className="feeds">
              {currentTab === "in"
                ? incoming.length > 0
                  ? incoming.map((invoice, index) => (
                      <div onClick={() => setInvoice(invoice)} key={invoice.id}>
                        <InvoiceCard
                          invoice={invoice}
                          tab="in"
                          id={incoming.length - index}
                        />
                      </div>
                    ))
                  : noInvoices
                : outgoing.length > 0
                ? outgoing.map((invoice, index) => (
                    <div onClick={() => setInvoice(invoice)} key={invoice.id}>
                      <InvoiceCard
                        invoice={invoice}
                        tab="out"
                        id={outgoing.length - index}
                      />
                    </div>
                  ))
                : noInvoices}
            </div>
          </div>

          {invoice.id && (
            <>
              <div className="divider"></div>

              <div className="home-view-invoice">
                <div className="page-title">View Invoice</div>

                <div className="">
                  <div className="d-flex flex-column align-items-center justify-content-around bg-white py-5">
                    <Avatar
                      user={
                        currentTab === "in" ? invoice.sender : invoice.recipient
                      }
                    />

                    <small className="my-4 font-weight-bold">
                      {currentTab === "out" && (
                        <>
                          <span>
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
                          <span>
                            {invoice.sender.name
                              ? invoice.sender.name
                              : invoice.sender.email}
                          </span>
                        </>
                      )}
                    </small>
                    <small className="extra-small">
                      Due: {formatDate(invoice.due_at)}
                    </small>
                  </div>

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
                          <span className="desktop-none"> (X{item.qty})</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
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

      <InvoiceButton />
    </div>
  );
}
