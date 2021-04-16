import React, { useContext } from "react";

import {
  formatCurrency,
  formatDate,
  getFullName,
  total,
} from "../../utils/helpers";
import { store } from "../../store";
import Avatar from "../Avatar";

export default function SimpleInvoice({ sender, items, hideTitle, title }) {
  const { state } = useContext(store);

  return (
    <div className="invoice-card shadow">
      <div className="d-flex align-items-center mb-4">
        <Avatar user={sender ? sender : state.user} />
        <p className="invoice-title mb-0">
          {sender ? getFullName(sender) : getFullName(state.user)}
        </p>
      </div>

      {hideTitle && (
        <div className="invoice-line-1">
          <table className="table table-sm table-borderless">
            <thead>
              <tr>
                <th>Bill to</th>
                {/* <th>Amount</th> */}
                <th>Due</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {state.recipient.name
                    ? state.recipient.name
                    : state.recipient.email}
                </td>
                {/* <td>${total(items)}</td> */}
                <td>{formatDate(state.invoice.dueAt)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      <div className="invoice-line-2">
        <table className="table table-borderless table-sm">
          <thead className="border-bottom">
            <tr>
              <th>Qty</th>
              <th>Description</th>
              <th className="text-right">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.qty}</td>
                <td className="description">{item.description}</td>
                <td className="text-right">{formatCurrency(item.price)}</td>
              </tr>
            ))}
          </tbody>
          {/* {hideTitle && (
            <tfoot>
              <tr>
                <td colSpan="3" className="text-right">
                  Total Amount{" "}
                  <span className="font-weight-bold ml-5">${total(items)}</span>
                </td>
              </tr>
            </tfoot>
          )} */}
        </table>
      </div>

      {!hideTitle && (
        <h3 className="card-title text-center font-weight-bold">
          {title ? title : "Web Development"}
        </h3>
      )}
    </div>
  );
}
