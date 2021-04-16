import React, { useState, useContext, useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import Aside from "../../components/Aside";
import { notify } from "../../utils/helpers";
import { store } from "../../store";

export default function InvoiceItem() {
  const { state, dispatch } = useContext(store);
  const history = useHistory();
  let { itemID } = useParams();

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
      payload: { title, price, description, qty },
    });

    history.goBack();
  };

  const onUpdate = () => {
    // validate line item
    if (title === "" || price <= 0 || description === "") {
      return window.alert("Please fill all fields!");
    }

    dispatch({
      type: "UPDATE_LINE_ITEM",
      payload: { id: itemID, data: { title, price, description, qty } },
    });

    history.goBack();
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
    if (itemID && state.lineItems[itemID]) {
      setTitle(state.lineItems[itemID].title);
      setPrice(state.lineItems[itemID].price);
      setDescription(state.lineItems[itemID].description);

      if (state.lineItems[itemID].qty) setQty(state.lineItems[itemID].qty);
    }
  }, []);

  return (
    <div className="invoice-item-screen">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div
            className="create-invoice-box px-4 pt-4 min-vh-92 desktop-reset"
            style={{ paddingBottom: "8.7rem" }}
          >
            <div className="page-title text-center">Add a Line item</div>

            <div className="line-item-box bg-white mx-n4 mt-n4 p-4 desktop-reset">
              <button
                onClick={() => history.goBack()}
                className="position-absolute btn-custom-link desktop-none"
              >
                Cancel
              </button>

              <p className="text-center font-weight-bold desktop-none">
                Create line item
              </p>

              <form className="create-invoice mx-n4 mt-5 px-4 desktop-reset">
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
                    <button
                      type="button"
                      className="minus"
                      onClick={onDecrement}
                    >
                      -
                    </button>
                    <span className="text">{qty}</span>
                    <button
                      type="button"
                      className="plus"
                      onClick={onIncrement}
                    >
                      +
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {title && (
              <div>
                <p className="mt-5 text-center text-primary">
                  Line item Preview
                </p>

                <div className="create-invoice-item shadow">
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

            <div className="btn-cta bg-white">
              {itemID && state.lineItems[itemID] && (
                <button
                  onClick={onUpdate}
                  className="btn btn-custom rounded-pill d-flex justify-content-around"
                >
                  Update to Invoice
                </button>
              )}

              {!itemID && !state.lineItems[itemID] && (
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
      </div>
    </div>
  );
}
