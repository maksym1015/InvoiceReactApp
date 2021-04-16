import React, { useContext, useEffect, useState } from "react";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { store } from "../store";
import api, { cancelToken } from "../utils/api";
import { formatCurrency, notify } from "../utils/helpers";

import TextField from "./TextField";
import axios from "axios";

export default function CompanyService() {
  const { state } = useContext(store);

  const source = cancelToken.source();

  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);

  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [services, setServices] = useState([]);

  const onSave = () => {
    if (!title || !price || !description)
      return notify("Please fill out form", "error");

    if (editing) updateService();
    else createService();
  };

  const createService = () => {
    setLoading(true);
    setDisabled(true);

    api
      .post("services", {
        title,
        price: price * 100,
        description,
        company_id: state.company.id,
      })
      .then((response) => {
        if (response.data.success) {
          notify("Service added successfully");

          setTitle("");
          setPrice("");
          setDescription("");

          setServices([response.data.data, ...services]);
        }

        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        notify("Error saving service.", "error");

        setLoading(false);
        setDisabled(false);
      });
  };

  const updateService = () => {
    setLoading(true);
    setDisabled(true);

    api
      .put(`services/${id}`, {
        title,
        price: price * 100,
        description,
        company_id: state.company.id,
      })
      .then((response) => {
        if (response.data.success) {
          notify("Service added successfully");

          setId("");
          setTitle("");
          setPrice("");
          setDescription("");

          let srvs = services.map((s) =>
            s.id === response.data.data.id ? response.data.data : s
          );

          setServices(srvs);
        }

        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        notify("Error saving service.", "error");

        setLoading(false);
        setDisabled(false);
      });
  };

  const onEdit = (s) => {
    setId(s.id);
    setTitle(s.title);
    setPrice(s.price / 100);
    setDescription(s.description);

    setEditing(true);
  };

  const fetchServices = () => {
    setLoading(true);
    setDisabled(true);

    api
      .get(`services?company_id=${state.company.id}`, {
        cancelToken: source.token,
      })
      .then((response) => {
        if (response.data.data.length) {
          setServices(response.data.data);
        }

        setLoading(false);
        setDisabled(false);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          return "axios request cancelled";
        }

        notify("Error fetching services.", "error");

        setLoading(false);
        setDisabled(false);
      });
  };

  useEffect(() => {
    fetchServices();

    return () => {
      source.cancel("axios request cancelled");
    };
  }, []);

  return (
    <div>
      <div className="company-services">
        <div className="updated-settings__card">
          <div className="px-4 py-5 p-md-5">
            <div className="updated-settings__headingM displayM__font-size font-weight-bold">
              Add Service
            </div>
            <p className="textM__font-size mt-4">
              Add a service to your company, so you can easily enter payment
              details.
            </p>
            <div className="mt-4">
              <TextField
                variant="standard"
                label="Title"
                labelClassName="textSBold__font-size"
                inputTagClassName="textM__font-size"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <TextField
                variant="standard"
                label="Description"
                labelClassName="textSBold__font-size"
                inputTagClassName="textM__font-size"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <TextField
                variant="standard"
                label="Price"
                labelClassName="textSBold__font-size"
                inputTagClassName="textM__font-size"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="d-inline-block mt-4">
              <button
                className="btn btn-custom d-flex align-items-center justify-content-around px-4 py-2"
                onClick={onSave}
                disabled={disabled}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                Save
              </button>
            </div>
          </div>
        </div>

        {services.map((s) => (
          <div
            className="updated-settings__card"
            key={s.id}
            onClick={() => onEdit(s)}
          >
            <div className="px-4 py-5 p-md-5">
              <h6 className="updated-settings__title-small textS__font-size text-transform-uppercase">
                Title
              </h6>
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="updated-settings__headingS textLBold__font-size font-weight-bold">
                  {s.title}
                </div>
                <div className="updated-settings__headingM displayM__font-size font-weight-bold">
                  {formatCurrency(s.price)}
                </div>
              </div>
              <h6 className="updated-settings__title-small textS__font-size text-transform-uppercase">
                Description
              </h6>
              <p className="textM__font-size mb-0">{s.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
