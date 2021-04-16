import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, useLocation } from "react-router-dom";

import { AnimatePresence } from "framer-motion";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, Slide } from "react-toastify";

import GuardedRoute from "./guards/GuardedRoute";
import UnguardedRoute from "./guards/UnguardedRoute";

import api from "./utils/api";
import { store } from "./store";
import Loader from "./components/Loader";

import { publicRoutes, routes } from "./routes";

export default function App() {
  const { state, dispatch } = useContext(store);
  const [show, setShow] = useState(false);

  const manageHeightOfElement = (element) => {
    let dashboard = document.querySelector(element);

    if (dashboard) {
      let computedDashboardHeight = window
        .getComputedStyle(dashboard)
        .height.split("px")[0];
      if (computedDashboardHeight > `${window.innerHeight}`) {
        dashboard.style.minHeight = "100vh";
      } else {
        dashboard.style.minHeight = "fit-content";
      }
    }
  };

  // First we get the viewport height and we multiple it by 1% to get a value for a vh unit
  let vh = window.innerHeight * 0.01;
  // Then we set the value in the --vh custom property to the root of the document
  document.documentElement.style.setProperty("--vh", `${vh}px`);

  // Setting dashboard page height because of white and grey color conflict
  manageHeightOfElement(".dashboard");

  // We listen to the resize event
  window.addEventListener("resize", () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Setting dashboard page height because of white and grey color conflict
    manageHeightOfElement(".dashboard");
  });

  const fetchUser = async () => {
    if (localStorage.getItem("honeydu_user")) {
      await api
        .get("user")
        .then((response) => {
          if (response.data) {
            dispatch({
              type: "LOGGEDIN",
              payload: response.data,
            });

            setCompany(response.data.companies);

            // getBalance();
            // fetchUsers();
          }
        })
        .catch((errors) => {
          // console.log(errors.response);
          localStorage.removeItem("honeydu_user");
        });
    }

    setShow(true);
  };

  const setCompany = (companies) => {
    // set initial company
    if (companies.length) {
      let company = companies.find(
        (c) => c.id == localStorage.getItem("honeydu_company")
      );

      // console.log(company, localStorage.getItem("honeydu_company"));

      if (company) {
        dispatch({
          type: "SET_COMPANY",
          payload: company,
        });
      } else {
        dispatch({
          type: "SET_COMPANY",
          payload: companies[0],
        });

        localStorage.setItem(
          "honeydu_company",
          companies[0].id
        );
      }
    }
  }

  // const getBalance = () => {
  //   api
  //     .get("silas/wallet-balance")
  //     .then((response) => response.data)
  //     .then((response) => {
  //       if (response.status === "success" && response.data.walletBalance > 0) {
  //         dispatch({
  //           type: "SET_BALANCE",
  //           payload: response.data.walletBalance,
  //         });
  //       }
  //     })
  //     .catch((errors) => console.log(errors.response));
  // };

  const fetchUsers = () => {
    api
      .get("users")
      // .then((response) => response.data)
      .then((response) => {
        if (response.data.length) {
          dispatch({
            type: "SET_USERS",
            payload: response.data.filter((u) => u.id !== state.user.id),
          }); // removed loggedin user from list
        }
      });
  };

  useEffect(() => {
    // temporary check
    // if (window.prompt("Please enter password") !== "devin321") return window.close();

    fetchUser();
  }, []);

  useEffect(() => {
    if (state.user.id) fetchUsers();
  }, [state.user]);

  return (
    <div>
      {show ? (
        <Router>
          <AnimatePresence>
            <Switch>
              {routes.map((r, i) => (
                <GuardedRoute
                  path={`/${r.path}`}
                  component={r.component}
                  auth={state.user.id}
                  key={i}
                />
              ))}

              {publicRoutes.map((r, i) => (
                <UnguardedRoute
                  path={`/${r.path}`}
                  component={r.component}
                  auth={state.user.id}
                  key={i}
                />
              ))}
            </Switch>
          </AnimatePresence>
        </Router>
      ) : (
        <Loader />
      )}

      <ToastContainer
        transition={Slide}
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}
