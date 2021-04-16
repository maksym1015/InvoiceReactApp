import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";

import "./home.css";

import Avatar from "../../../components/Avatar";
import MyCalendar from "../../../components/MyCalendar";
import ScheduleModal from "../../../components/ScheduleModal";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import api from "../../../utils/api";
import Loader from "../../../components/Loader";
import { notify } from "../../../utils/helpers";

export default function PFHome() {
  const history = useHistory();
  const [scheduleModal, setScheduleModal] = useState(false);
  const [event, setEvent] = useState({});
  const { company } = useParams();

  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);
  const [services, setServices] = useState([
    { name: "Protein Shake", selected: false, price: 10000, qty: 1 },
    { name: "HITT Workout Class", selected: false, price: 20000, qty: 1 },
    { name: "Running coach", selected: false, price: 50000, qty: 1 },
    { name: "Bicycle Session", selected: false, price: 25000, qty: 1 },
    {
      name: "Digital Services - Peloton Coach",
      selected: false,
      price: 250000,
      qty: 1,
    },
    { name: "Swimming laps", selected: false, price: 15000, qty: 1 },
    { name: "I'm not sure yet...", selected: false, price: 0, qty: 0 },
  ]);

  const handleSelect = ({ startStr, endStr }) => {
    if (moment(startStr).format() < moment().format()) {
      return notify("Please select future time to continue.", "error");
    }

    const title = "Public Facing Invoice";
    setEvent({ start: startStr, end: endStr, title });
    setScheduleModal(true);
  };

  const fetchUser = () => {
    setIsDisabled(true);
    setIsLoading(true);

    setTimeout(() => {
      setUser({
        id: 18,
        name: "",
        username: null,
        email: "hello@coral.global",
        companyName: "Coral Lab",
        image: "",
        website: "https://coral.global",
        sila: true,
      });

      setIsDisabled(false);
      setIsLoading(false);
    }, 500);

    return;

    api
      .get(`companies/${company}`)
      .then((response) => {
        console.log(response.data);

        setIsDisabled(false);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.response);

        setIsDisabled(false);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="pf-home">
      {isLoading && <Loader />}

      <div className="sa-header">
        <h1 className="sa-heading">
          <Link to="/">Honeydu</Link>
        </h1>
        <div className="d-flex align-items-center">
          <p className="mr-5 mb-0 mobile-none">Already Honeydu user?</p>
          <Link to="/login" className="sa-login-btn">
            Log in
          </Link>
        </div>
      </div>

      <div className="container">
        <div className="sa-card">
          <button className="btn btn-custom-link sa-scan-btn">
            Scan QR Code
          </button>

          <Avatar user={user} />

          <h2 className="sa-card-title">{user.companyName}</h2>

          <p className="mb-0">{user.email}</p>

          <p>
            <a href={user.website} className="small sa-website">
              {user.website}
            </a>
          </p>

          <button
            className="btn btn-custom sa-pay-btn"
            onClick={() => history.push("/pf-guest")}
          >
            Pay
          </button>
        </div>

        <p className="text-center text-primary mb-5">
          Select an available time by dragging the available time slot you want,
          selecting the services and checkout out.
        </p>

        <MyCalendar events={events} handleSelect={handleSelect} />
      </div>

      {scheduleModal && (
        <ScheduleModal
          show={scheduleModal}
          setShow={setScheduleModal}
          event={event}
          user={user}
          services={services}
          setServices={setServices}
        />
      )}
    </div>
  );
}
