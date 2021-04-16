import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import Aside from "../../components/Aside";
import { motion } from "framer-motion";

import SimpleInvoice from "../../components/invoices/SimpleInvoice";
import { store } from "../../store";
import { pageVariants } from "../../utils/transitions";

export default function ChooseTemplate() {
  const { dispatch } = useContext(store);
  const history = useHistory();

  const [simpleLineItems] = useState([
    {
      title: "Service Provided",
      price: 150000,
      description: "Service Provided",
      qty: 1,
    },
    {
      title: "Service Provided 2",
      price: 5000,
      description: "Service Provided 2",
      qty: 1,
    },
  ]);

  const [personalTrainingLineItems] = useState([
    {
      title: "Traning",
      price: 150000,
      description: "Traning",
      qty: 15,
    },
    {
      title: "Protein Shakes",
      price: 5000,
      description: "Protein Shakes",
      qty: 10,
    },
  ]);

  const [onlineSessionLineItems] = useState([
    {
      title: "Barre Zoom (August 30, 2020 7:00pm PST)",
      price: 15000,
      description: "Barre Zoom (August 30, 2020 7:00pm PST)",
      qty: 1,
    },
    {
      title: "Inner power and peace",
      price: 0,
      description: "Inner power and peace",
      qty: 1,
    },
  ]);

  const [apothecaryLineItems] = useState([
    {
      title: "Facial Cleanser",
      price: 3300,
      description: "Facial Cleanser",
      sku: "B100SK61",
      size: "3.4 fl",
      qty: 1,
    },
    {
      title: "Hand Wash",
      price: 3900,
      description: "Hand Wash",
      sku: "B500BT13RF",
      size: "16.9 fl oz",
      qty: 1,
    },
  ]);

  const [stuffSoldLineItems] = useState([
    {
      title: "Slingback Bag",
      price: 3300,
      description: "Slingback Bag",
      qty: 1,
    },
    {
      title: "Coin Pouch",
      price: 3900,
      description: "Coin Pouch",
      qty: 1,
    },
  ]);

  const [eyelashExtensionLineItems] = useState([
    {
      title: "Eyelash Extension (Refill)",
      price: 10000,
      description: "Eyelash Extension (Refill)",
      qty: 1,
    },
    {
      title: "Add Length",
      price: 2000,
      description: "Add Length",
      qty: 1,
    },
    {
      title: "Remove Lashes (other salon)",
      price: 2000,
      description: "Remove Lashes (other salon)",
      qty: 1,
    },
  ]);

  const [makeupArtistLineItems] = useState([
    {
      title: "Hourly Makeup Session",
      price: 10000,
      description: "Hourly Makeup Session",
      qty: 2,
    },
    {
      title: "Premium Mascara",
      price: 2000,
      description: "Premium Mascara",
      qty: 1,
    },
  ]);

  const [spaCareLineItems] = useState([
    {
      title: "Facial",
      price: 10000,
      description: "Facial",
      qty: 1,
    },
    {
      title: "Nails",
      price: 2000,
      description: "Nails",
      qty: 1,
    },
  ]);

  const [consultingLineItems] = useState([
    {
      title: "Product Management",
      price: 20000,
      description: "Some small notes",
      qty: 2,
    },
    {
      title: "Security",
      price: 20000,
      description: "Some small details",
      qty: 1,
    },
  ]);

  const onSelect = (items, template) => {
    dispatch({
      type: "SET_LINE_ITEMS",
      payload: { items, template },
    });

    setTimeout(() => history.push("/invoice/new"), 200);
  };

  const onSkip = () => {
    dispatch({ type: "RESET_INVOICE" });
    history.push("/invoice/new");
  };

  return (
    <div
      // initial="initial"
      // animate="in"
      // exit="out"
      // variants={pageVariants}
      className="choose-template"
    >
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area">
          <div className="page-title">Choose Template</div>

          <div
            className="mobile-layer px-3 pt-4"
            style={{ paddingBottom: "8.7rem" }}
          >
            <div className="font-weight-bold m-3 desktop-none">
              <Link to="/">Honeydu</Link>

              <button
                onClick={onSkip}
                className="btn btn-custom-link float-right mr-3 small"
              >
                skip
              </button>
            </div>

            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="font-weight-bold text-center my-4">
                    <p className="text-xl text-primary">
                      Send your first invoice
                    </p>
                    <p>
                      Use an industry-approved template Below or select Build
                      your own
                    </p>
                  </div>
                </div>
              </div>

              <div className="row">
                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(simpleLineItems, "simple")}
                >
                  <SimpleInvoice items={simpleLineItems} />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() =>
                    onSelect(personalTrainingLineItems, "personalTraining")
                  }
                >
                  <SimpleInvoice
                    title="Personal Training"
                    items={personalTrainingLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() =>
                    onSelect(onlineSessionLineItems, "onlineSession")
                  }
                >
                  <SimpleInvoice
                    title="Online Session"
                    items={onlineSessionLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(apothecaryLineItems, "apothecary")}
                >
                  <SimpleInvoice
                    title="Apothecary"
                    items={apothecaryLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(stuffSoldLineItems, "stuffSold")}
                >
                  <SimpleInvoice
                    title="Stuff Sold"
                    items={stuffSoldLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() =>
                    onSelect(eyelashExtensionLineItems, "eyelashExtension")
                  }
                >
                  <SimpleInvoice
                    title="Eyelash Extension"
                    items={eyelashExtensionLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() =>
                    onSelect(makeupArtistLineItems, "makeupArtist")
                  }
                >
                  <SimpleInvoice
                    title="Makeup Artist"
                    items={makeupArtistLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(spaCareLineItems, "spaCare")}
                >
                  <SimpleInvoice title="Spa Care" items={spaCareLineItems} />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(consultingLineItems, "consulting")}
                >
                  <SimpleInvoice
                    title="Consulting"
                    items={consultingLineItems}
                  />
                </div>

                <div
                  className="col-md-6 col-lg-4"
                  onClick={() => onSelect(stuffSoldLineItems, "onlineSession")}
                >
                  <SimpleInvoice
                    title="Stuff Sold"
                    items={stuffSoldLineItems}
                  />
                </div>
              </div>
            </div>
            <div className="btn-cta">
              <button onClick={onSkip} className="btn btn-custom rounded-pill">
                Build Your Own
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
