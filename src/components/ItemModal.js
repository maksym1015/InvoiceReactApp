import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { notify } from "../utils/helpers";
import { store } from "../store";

export default function ItemModal({ show, setShow, item, setItem }) {
  const { state, dispatch } = useContext(store);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [qty, setQty] = useState(1);
  const [description, setDescription] = useState("");

  const onSubmit = () => {
    // validate line item
    if (title === "" || price <= 0 || description === "") {
      return notify("Please fill all fields!", "error");
    }

    dispatch({
      type: "ADD_LINE_ITEM",
      payload: { title, price: price * 100, description, qty },
    });

    setShow(false);
    resetItem();
  };

  const onUpdate = () => {
    // validate line item
    if (title === "" || price <= 0 || description === "") {
      return window.alert("Please fill all fields!");
    }

    dispatch({
      type: "UPDATE_LINE_ITEM",
      payload: {
        id: item.id,
        data: { title, price: price * 100, description, qty },
      },
    });

    setShow(false);
    resetItem();
  };

  const resetItem = () => {
    setTitle("");
    setPrice("");
    setQty(1);
    setDescription("");

    setItem({
      id: "",
      title: "",
      price: "",
      qty: 1,
      description: "",
    });
  };

  const onDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const onIncrement = () => {
    setQty(qty + 1);
  };

  useEffect(() => {
    if (item.title) setTitle(item.title);
    if (item.price) setPrice(item.price / 100);
    if (item.qty) setQty(item.qty);
    if (item.description) setDescription(item.description);
  }, [show]);

  return (
    <>
      {show && (
        <div
          className="h-100 w-100 fixed-top bg-trans-black"
          onClick={() => {
            setShow(false);
            resetItem();
          }}
          style={{ zIndex: "1050" }}
        ></div>
      )}

      {show && (
        <div className="item-modal feeds-modal">
          <div className="header">
            <h3>{item.id === "" ? "Add" : "Update"} Line Item</h3>

            <Link to="#" className="modal-close" onClick={() => setShow(false)}>
              <span style={{ fontSize: "1.2rem" }}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </Link>
          </div>

          <div className="line-item-box">
            <form className="create-invoice px-4 pt-5">
              <div className="invoice-item">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  id="title"
                  placeholder="August Rent"
                  className="text-right"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="invoice-item">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  placeholder="$2500.00"
                  className="text-right"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  autoComplete="off"
                />
              </div>

              <div className="invoice-item flex-column align-items-start">
                <label className="mb-3" htmlFor="description">
                  Description
                </label>
                <textarea
                  rows="5"
                  id="description"
                  className="form-control"
                  placeholder="What was provided?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div className="text-center">
                <div className="counter">
                  <button type="button" className="minus" onClick={onDecrement}>
                    -
                  </button>
                  <span className="text">{qty}</span>
                  <button type="button" className="plus" onClick={onIncrement}>
                    +
                  </button>
                </div>
              </div>
            </form>

            {title && (
              <div className="mb-md-5">
                <p className="mt-3 text-center text-primary">
                  Line item Preview
                </p>

                <div className="create-invoice-item shadow mx-4">
                  <span className="qty">{qty}</span>

                  <div className="description">
                    <Link to="#" className="text-dark">
                      {title}
                    </Link>

                    <small className="text-secondary">{description}</small>
                  </div>

                  <div className="price">
                    ${parseFloat(price * (qty ? qty : 1)).toFixed(2)}
                    <span className="desktop-none"> (X{qty})</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="footer">
            <div className="btn-cta py-md-4 px-md-5">
              {item.id !== "" && state.lineItems[item.id] && (
                <button
                  onClick={onUpdate}
                  className="btn btn-custom rounded-pill d-flex justify-content-around"
                >
                  Update to Invoice
                </button>
              )}

              {item.id === "" && !state.lineItems[item.id] && (
                <button
                  onClick={onSubmit}
                  className="btn btn-custom rounded-pill d-flex justify-content-around"
                >
                  Add to Invoice
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
