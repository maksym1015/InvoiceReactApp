import React from "react";
import { useHistory } from "react-router-dom";

import { formatCurrency, formatDate, getFullName } from "../utils/helpers";
import Avatar from "./Avatar";
import HR from "./HR";
import GeneralTile2 from "./GeneralTile2";

export default function InvoiceCard({ id, invoice, tab, page }) {
  const history = useHistory();

  const goTo = (e) => {
    if (window.innerWidth > 1399) return;

    if (e.target.id === "name" || e.target.id === "avatar") {
      return history.push(
        `/profile/${page === "pay" ? invoice.sender.id : invoice.recipient.id}`
      );
    }

    history.push(`/invoice/${invoice.id}/view`);
  };

  let invoiceTitle = "";
  let invoiceMore = "";

  if (page === "pay") {
    invoiceTitle = (
      <div className="title">
        <span>You {invoice.status === "pending" ? "owe" : "paid"} </span>

        <span id="name" className="name">
          {invoice.sender.first_name
            ? getFullName(invoice.sender)
            : invoice.sender.email}
        </span>
      </div>
    );

    invoiceMore = (
      <span className="in-amount">
        {invoice.status === "paid" ? "-" : ""}
        {formatCurrency(invoice.total)}
      </span>
    );
  } else {
    invoiceTitle = (
      <div className="title mb-3 d-flex">
        <span
          id="name"
          className="name text-light-grey-2 white-space-nowrap overflow-hidden text-overflow-ellipsis"
          style={{ width: "13rem" }}
        >
          {invoice.recipient.first_name
            ? getFullName(invoice.recipient)
            : invoice.recipient.email}
        </span>

        <span className="text-light-grey-1">
          {" "}
          {invoice.status === "pending" ? "owes" : "paid"} you
        </span>
      </div>
    );

    invoiceMore = (
      <span className="out-amount text-success">
        {invoice.status === "paid" ? "+" : ""}
        {formatCurrency(invoice.total)}
      </span>
    );
  }

  // return (
  //   <div className="home-item" onClick={goTo}>
  //     {invoice.status === "paid" && <span className="paid">Paid 6/28/20</span>}

  //     <div className="item-left">
  //       <Avatar
  //         user={tab === "in" ? invoice.sender : invoice.recipient}
  //         id="avatar"
  //       />
  //     </div>

  //     <div className="flex-fill description">
  //       <div className="home-item__card d-flex justify-content-between">
  //         <div>
  //           {invoiceTitle}
  //           <div className="more-info">
  //             {/* <span className="d-inline-block mr-4">
  //               Due {formatDate(invoice.due_at)}
  //             </span> */}
  //             <span>#{id}</span>
  //           </div>
  //         </div>

  //         {invoiceMore}
  //       </div>
  //       <HR />
  //     </div>
  //   </div>
  // );

  return (
    <div className="mb-4">
      <GeneralTile2
        id={id}
        date="1/10/2021"
        title="Website Design"
        service="Ad Services"
        price="$257"
        status="PAID"
        invoice={invoice}
        tab={tab}
        page={page}
        invoiceTitle={invoiceTitle}
        invoiceMore={invoiceMore}
        goTo={goTo}
      />
    </div>
  );
}
