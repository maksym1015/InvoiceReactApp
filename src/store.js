import React, { createContext, useReducer } from "react";

const user = {
  first_name: "",
  last_name: "",
  email: "",
  password: "",
  password_confirmation: "",
  phone: "",
  image: "",
  companies: [],
};

const company = {
  user_id: "",
  role: "",
  name: "",
  address1: "",
  address2: "",
  est_volume: "",
  image: "",
  multiple_clients: false,
  type: "",
};

const invoice = {
  title: "",
  sender_id: "",
  recipient_id: "",
  status: "",
  frequency: "",
  due_at: "",
  paid_at: "",
  access_code: "",
  total: "",
  is_quick: "",
};

const recipient = { ...user };
const welcomeUser = { ...user };
const welcomeCompany = { ...company };

const initialState = {
  invoice,
  user,
  company,
  recipient,
  welcomeUser,
  welcomeCompany,

  paymentMethod: {},
  users: [], // uses for filter recipient
  lineItems: [],
  wallet: 0,
  template: "simple",
  skipVerify: true, // false on production
  multiCompany: false,
};

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch (action.type) {
      // User Actions
      case "SET_USERS":
        return { ...state, users: action.payload };

      case "AVATAR_UPDATED":
        return { ...state, user: { ...state.user, image: action.payload } };

      case "SET_WELCOME_COMPANY":
        return { ...state, welcomeCompany: action.payload };

      case "SET_WELCOME_USER":
        return { ...state, welcomeUser: action.payload };

      case "SET_COMPANY":
        return { ...state, company: action.payload, welcomeCompany };

      case "SET_MULTI_COMPANY":
        return { ...state, multiCompany: action.payload };

      case "LOGGEDOUT":
        return { ...state, user };

      case "LOGGEDIN":
        return { ...state, user: action.payload, welcomeUser };

      // Invoice Actions
      case "ADD_RECIPIENT":
        return { ...state, recipient: action.payload };

      case "UPDATE_INVOICE":
        return { ...state, invoice: action.payload };

      case "RESET_INVOICE":
        return {
          ...state,
          invoice,
          lineItems: [],
          recipient,
        };

      case "SET_LINE_ITEMS":
        return { ...state, lineItems: [...action.payload.items] };

      case "ADD_LINE_ITEM":
        return { ...state, lineItems: [...state.lineItems, action.payload] };

      case "UPDATE_LINE_ITEM":
        let newState = { ...state };
        newState.lineItems[action.payload.id] = { ...action.payload.data };
        return newState;

      case "REMOVE_LINE_ITEM":
        return {
          ...state,
          lineItems: state.lineItems.filter(
            (item, index) => action.payload !== index
          ),
        };

      // Payment Actions
      case "SET_PAYMENT_METHOD":
        return { ...state, paymentMethod: action.payload };

      case "SET_BALANCE":
        return { ...state, wallet: action.payload };

      // Model Actions
      case "TOGGLE_FEEDBACK_MODAL":
        return { ...state, feedbackModal: !state.feedbackModal };

      default:
        throw new Error();
    }
  }, initialState);

  return <Provider value={{ state, dispatch }}>{children}</Provider>;
};

export { store, StateProvider };
