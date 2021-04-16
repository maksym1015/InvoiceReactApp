import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import Chart from "chart.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";

import {
  dashboardGraph,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";

import { store } from "../../store";
import api from "../../utils/api";

import HR from "../../components/HR";
import Menu from "../../components/Menu";
import Aside from "../../components/Aside";
import Search from "../../components/Search";
import Upcoming from "../../components/Upcoming";
import FilterDays from "../../components/FilterDays";
import DashboardChart from "../../components/dashboard-chart";

export default function Dashboard(props) {
  const { state } = useContext(store);

  const [invoices, setInvoices] = useState([]);
  const [upcomingInvoices, setUpcomingInvoices] = useState([]);
  const [chartsTranslate, setChartsTranslate] = useState(0);

  const ul = [
    { id: "1D", text: "1D", active: false },
    { id: "1W", text: "1W", active: false },
    { id: "1M", text: "1M", active: false },
    { id: "1Y", text: "1Y", active: true },
    { id: "ALL", text: "ALL", active: false },
  ];

  const handleChartsTranslate = () => {
    if (chartsTranslate < 3) {
      setChartsTranslate(chartsTranslate + 1);
    } else {
      setChartsTranslate(0);
    }
  };

  const filterHandler = () => {
    console.log("filterHandler");
  };

  const graphOne = () => {
    function generateData() {
      var unit = "day";

      function unitLessThanDay() {
        return unit === "second" || unit === "minute" || unit === "hour";
      }

      function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
      }

      // Returns true if outside 9:30am-4pm on a weekday
      function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
          return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
          return true;
        }
        return false;
      }

      function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
          t: date.valueOf(),
          y: close,
        };
      }

      var date = moment("Jan 01 1990", "MMM DD YYYY");
      var now = moment();
      var data = [];
      var lessThanDay = unitLessThanDay();
      for (
        ;
        data.length < 600 && date.isBefore(now);
        date = date.clone().add(1, unit).startOf(unit)
      ) {
        if (outsideMarketHours(date)) {
          if (!lessThanDay || !beforeNineThirty(date)) {
            date = date
              .clone()
              .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
          }
          if (lessThanDay) {
            date = date.hour(9).minute(30).second(0);
          }
        }
        data.push(
          randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
        );
      }

      return data;
    }

    var ctx = document.getElementById("myChart1").getContext("2d");

    var color = Chart.helpers.color;
    var cfg = {
      data: {
        datasets: [
          {
            label: "CHRT - Chart.js Corporation",
            backgroundColor: color("rgb(39, 187, 45)").alpha(0.5).rgbString(),
            borderColor: "rgb(39, 187, 45)",
            data: generateData(),
            type: "line",
            pointRadius: 0,
            fill: false,
            lineTension: 1,
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [
            {
              display: false,
              type: "time",
              distribution: "series",
              offset: true,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 10,
              },
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          mode: "index",
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };

    var chart = new Chart(ctx, cfg);
  };

  const graphTwo = () => {
    function generateData() {
      var unit = "day";

      function unitLessThanDay() {
        return unit === "second" || unit === "minute" || unit === "hour";
      }

      function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
      }

      // Returns true if outside 9:30am-4pm on a weekday
      function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
          return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
          return true;
        }
        return false;
      }

      function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
          t: date.valueOf(),
          y: close,
        };
      }

      var date = moment("Jan 01 1990", "MMM DD YYYY");
      var now = moment();
      var data = [];
      var lessThanDay = unitLessThanDay();
      for (
        ;
        data.length < 600 && date.isBefore(now);
        date = date.clone().add(1, unit).startOf(unit)
      ) {
        if (outsideMarketHours(date)) {
          if (!lessThanDay || !beforeNineThirty(date)) {
            date = date
              .clone()
              .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
          }
          if (lessThanDay) {
            date = date.hour(9).minute(30).second(0);
          }
        }
        data.push(
          randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
        );
      }

      return data;
    }

    var ctx = document.getElementById("myChart2").getContext("2d");

    var color = Chart.helpers.color;
    var cfg = {
      data: {
        datasets: [
          {
            label: "CHRT - Chart.js Corporation",
            backgroundColor: color("rgb(39, 187, 45)").alpha(0.5).rgbString(),
            borderColor: "rgb(39, 187, 45)",
            data: generateData(),
            type: "line",
            pointRadius: 0,
            fill: false,
            lineTension: 1,
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [
            {
              display: false,
              type: "time",
              distribution: "series",
              offset: true,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 10,
              },
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          mode: "index",
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };

    var chart = new Chart(ctx, cfg);
  };

  const graphThree = () => {
    function generateData() {
      var unit = "day";

      function unitLessThanDay() {
        return unit === "second" || unit === "minute" || unit === "hour";
      }

      function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
      }

      // Returns true if outside 9:30am-4pm on a weekday
      function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
          return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
          return true;
        }
        return false;
      }

      function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
          t: date.valueOf(),
          y: close,
        };
      }

      var date = moment("Jan 01 1990", "MMM DD YYYY");
      var now = moment();
      var data = [];
      var lessThanDay = unitLessThanDay();
      for (
        ;
        data.length < 600 && date.isBefore(now);
        date = date.clone().add(1, unit).startOf(unit)
      ) {
        if (outsideMarketHours(date)) {
          if (!lessThanDay || !beforeNineThirty(date)) {
            date = date
              .clone()
              .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
          }
          if (lessThanDay) {
            date = date.hour(9).minute(30).second(0);
          }
        }
        data.push(
          randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
        );
      }

      return data;
    }

    var ctx = document.getElementById("myChart3").getContext("2d");

    var color = Chart.helpers.color;
    var cfg = {
      data: {
        datasets: [
          {
            label: "CHRT - Chart.js Corporation",
            backgroundColor: color("rgb(255, 75, 75)").alpha(0.5).rgbString(),
            borderColor: "rgb(255, 75, 75)",
            data: generateData(),
            type: "line",
            pointRadius: 0,
            fill: false,
            lineTension: 1,
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [
            {
              display: false,
              type: "time",
              distribution: "series",
              offset: true,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 10,
              },
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          mode: "index",
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };

    var chart = new Chart(ctx, cfg);
  };

  const graphFour = () => {
    function generateData() {
      var unit = "day";

      function unitLessThanDay() {
        return unit === "second" || unit === "minute" || unit === "hour";
      }

      function beforeNineThirty(date) {
        return date.hour() < 9 || (date.hour() === 9 && date.minute() < 30);
      }

      // Returns true if outside 9:30am-4pm on a weekday
      function outsideMarketHours(date) {
        if (date.isoWeekday() > 5) {
          return true;
        }
        if (unitLessThanDay() && (beforeNineThirty(date) || date.hour() > 16)) {
          return true;
        }
        return false;
      }

      function randomNumber(min, max) {
        return Math.random() * (max - min) + min;
      }

      function randomBar(date, lastClose) {
        var open = randomNumber(lastClose * 0.95, lastClose * 1.05).toFixed(2);
        var close = randomNumber(open * 0.95, open * 1.05).toFixed(2);
        return {
          t: date.valueOf(),
          y: close,
        };
      }

      var date = moment("Jan 01 1990", "MMM DD YYYY");
      var now = moment();
      var data = [];
      var lessThanDay = unitLessThanDay();
      for (
        ;
        data.length < 600 && date.isBefore(now);
        date = date.clone().add(1, unit).startOf(unit)
      ) {
        if (outsideMarketHours(date)) {
          if (!lessThanDay || !beforeNineThirty(date)) {
            date = date
              .clone()
              .add(date.isoWeekday() >= 5 ? 8 - date.isoWeekday() : 1, "day");
          }
          if (lessThanDay) {
            date = date.hour(9).minute(30).second(0);
          }
        }
        data.push(
          randomBar(date, data.length > 0 ? data[data.length - 1].y : 30)
        );
      }

      return data;
    }

    var ctx = document.getElementById("myChart4").getContext("2d");

    var color = Chart.helpers.color;
    var cfg = {
      data: {
        datasets: [
          {
            label: "CHRT - Chart.js Corporation",
            backgroundColor: color("rgb(39, 187, 45)").alpha(0.5).rgbString(),
            borderColor: "rgb(39, 187, 45)",
            data: generateData(),
            type: "line",
            pointRadius: 0,
            fill: false,
            lineTension: 1,
            borderWidth: 2,
          },
        ],
      },
      options: {
        animation: {
          duration: 0,
        },
        scales: {
          xAxes: [
            {
              display: false,
              type: "time",
              distribution: "series",
              offset: true,
              ticks: {
                major: {
                  enabled: true,
                  fontStyle: "bold",
                },
                source: "data",
                autoSkip: true,
                autoSkipPadding: 75,
                maxRotation: 0,
                sampleSize: 10,
              },
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          display: false,
        },
        tooltips: {
          intersect: false,
          mode: "index",
          callbacks: {
            label: function (tooltipItem, myData) {
              var label = myData.datasets[tooltipItem.datasetIndex].label || "";
              if (label) {
                label += ": ";
              }
              label += parseFloat(tooltipItem.value).toFixed(2);
              return label;
            },
          },
        },
      },
    };

    var chart = new Chart(ctx, cfg);
  };

  const getPaidInvoices = () => {
    api
      .get("invoices?status=paid&limit=5")
      .then((response) => {
        if (response.data.data.length) {
          setInvoices(response.data.data);
        }
      })
      .catch((error) => console.log(error.response));
  };

  const getUpcomingInvoices = () => {
    api
      .get("invoices?status=pending&limit=3")
      .then((response) => {
        if (response.data.data.length) {
          setUpcomingInvoices(response.data.data);
        }
      })
      .catch((error) => console.log(error.response));
  };

  useEffect(() => {
    dashboardGraph();
    getPaidInvoices();
    getUpcomingInvoices();
  }, []);

  return (
    <div className="dashboard robinhood">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="main-container">
          <div className="d-flex flex-column flex-xl-row">
            <div className="col-12 col-xl-7 d-flex flex-column pb-5">
              <Search />

              <div className="d-flex justify-content-between Dasboard__Menu">
                <h1 className="displayL__font-size mt-xl-8-rem">Dashboard</h1>

                <Menu title="Pay" page="dashboard" />
              </div>
              {/* <div className="d-xl-none position-relative">
                <button
                  className="floating-button"
                  onClick={handleChartsTranslate}
                >
                  <FontAwesomeIcon icon={faAngleRight} />
                </button>
              </div> */}
              <div className="d-flex flex-wrap overflow-hidden mt-1-rem mt-xl-8-rem">
                <div className="d-none d-xl-flex justify-content-between w-100 font-bold">
                  <span className="textMBold__font-size">Wallet</span>
                  <div>
                    <span className="text-light-grey-1 mr-5 textM__font-size text-grey">
                      withdraw
                    </span>
                    <span className="textMBold__font-size">$1,500.09</span>
                  </div>
                </div>

                <HR className="d-none d-xl-block" />

                <div className="w-100 mt-4">
                  <DashboardChart
                    title="Revenue"
                    price="$27,5034"
                    status="success"
                    graphId="myChart2"
                    graphFunction={graphTwo}
                    style={{
                      transform: `translateX(${chartsTranslate * -100}%)`,
                    }}
                  />
                </div>
              </div>
              <div className="mt-5">
                <FilterDays ul={ul} onClick={filterHandler} />
                <HR className="m-0" />
              </div>

              <div className="mt-5 mb-2 d-none d-xl-block">
                <div>
                  <span className="displayM__font-size">Older</span>
                </div>
                <HR />
                {invoices.map((invoice) => (
                  <div key={invoice.id}>
                    <div className="d-flex justify-content-between my-4">
                      <div>
                        {invoice.line_items.map((li) => (
                          <h6 className="textMBold__font-size" key={li.id}>
                            {li.title}
                          </h6>
                        ))}
                        <span className="textM__font-size text-dark-grey">
                          {formatDate(invoice.created_at, "MMM DD")}
                        </span>
                      </div>
                      <div className="d-flex justify-content-end align-items-center">
                        {invoice.sender_id === state.user.id ? (
                          <span className="textMBold__font-size text-success">
                            +{formatCurrency(invoice.total)}
                          </span>
                        ) : (
                          <span className="textMBold__font-size text-danger">
                            -{formatCurrency(invoice.total)}
                          </span>
                        )}
                      </div>
                    </div>
                    <HR />
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12 col-xl-5 d-flex justify-content-center upcoming__wrapper position-relative">
              <Upcoming upcomings={upcomingInvoices} />
            </div>

            <div className="d-xl-none">
              <div className="btn-cta">
                <button
                  className="btn btn-custom d-flex justify-content-around ml-auto"
                  onClick={() => {
                    props.history.push("/invoice/new");
                  }}
                >
                  Pay or Request
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-none d-xl-block">
        <Link
          to="/invoice/new"
          className="send-invoice h-auto w-auto text-primary"
          style={{ fontSize: "3rem" }}
        >
          <FontAwesomeIcon icon={faPlusSquare} size="2x" />
        </Link>
      </div>
    </div>
  );
}
