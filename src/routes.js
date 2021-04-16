// Onboarding Screens
import Welcome from "./pages/onboarding/welcome";
import OBLogin from "./pages/onboarding/login";
import OBSignup from "./pages/onboarding/signup";
import OBForgetPassword from "./pages/onboarding/forget-password";
import OBVerify from "./pages/onboarding/verify";
import OBType from "./pages/onboarding/type/type";
import OBAboutUser from "./pages/onboarding/about-user";
import SetupPassword from "./pages/onboarding/setup-password";
import OBAboutCompany from "./pages/onboarding/about-company";
import OBLocation from "./pages/onboarding/location";
import OBPaymentVolume from "./pages/onboarding/payment-volume";
import OBSetupComplete from "./pages/onboarding/setup-complete";

// import OBService from "./pages/onboarding/service2";
import OBContacts from "./pages/onboarding/contacts/contacts";

import OBTemplates from "./pages/onboarding/templates";
import OBInvoice from "./pages/onboarding/invoice";

// import Signup from "./pages/onboarding/signup";
// import Login from "./pages/onboarding/login";
// import Service from "./pages/onboarding/service";

// Main Pages
import Companies from "./pages/companies";
import NewCompany from "./pages/companies-new";
import CompanyOwner from "./pages/companies-owner";
import CompanyDetails from "./pages/comapnies-details";
import CreateInvoice from "./pages/create-invoice";
import Pay from "./pages/pay";
// import GetPaid from "./pages/get-paid";
import Dashboard from "./pages/dashboard";

import ProfileUser from "./pages/profile-new";
import ProfilePublic from "./pages/profile-public";
import GetPaid from "./pages/get-paid";
import History from "./pages/history";
import ChooseTemplate from "./pages/choose-template";
import Recipient from "./pages/recipient";
import InvoiceItem from "./pages/invoice-item";
import ViewInvoice from "./pages/view-invoice";
import PaymentMethods from "./pages/payment-methods";
// import AddCard from "./pages/add-card";
import TransferBalance from "./pages/transfer-balance";
import Export from "./pages/export";
import Settings from "./pages/settings";
import EditProfile from "./pages/edit-profile";
import Profile from "./pages/profile";
// import FriendsSocial from "./pages/freiends-social";
import SettingsPrivacy from "./pages/settings-privacy";
// import NotificationSettings from "./pages/notification-settings";
import CompanyServices from "./pages/settings-services";
import SettingsProfile from "./pages/settings-profile";
import SettingsCompany from "./pages/settings-company";
import SettingsUsers from "./pages/settings-users";
import SettingsQuickBooks from "./pages/settings-quickbooks";
import SettingsExport from "./pages/settings-export";
import SettingsPayment from "./pages/settings-payment";
import SettingsBilling from "./pages/settings-billing";
import SettingsSupport from "./pages/settings-support";

// import PushNotifications from "./pages/push-notifications";
// import TextNotifications from "./pages/text-notifications";
// import EmailNotifications from "./pages/email-notifications";
// import Notifications from "./pages/notifications";
// import AddBank from "./pages/bank";
// import RemovePaymentMethod from "./pages/remove-payment-method";
// import Sila from "./pages/sila";
// import SilaLogin from "./pages/sila-login";
import PrivacyPolicy from "./pages/privacy-policy";

// Public Facing Screens
import PFHome from "./pages/public-facing/home/home";
import PFInvoice from "./pages/public-facing/invoice/invoice";
import PFLogin from "./pages/public-facing/login";
import PFGuest from "./pages/public-facing/guest";
import PFCompany from "./pages/public-facing/company";
import PFAbout from "./pages/public-facing/about";
import PFLocation from "./pages/public-facing/location";
import PFSignup from "./pages/public-facing/signup";
import PFType from "./pages/public-facing/type";
import PFVerify from "./pages/public-facing/verify";
import PFPay from "./pages/public-facing/pay";

export const routes = [
  // Onboarding Flow
  { path: "about-company", component: OBAboutCompany },
  { path: "location", component: OBLocation },
  { path: "payment-volume", component: OBPaymentVolume },
  { path: "setup-complete", component: OBSetupComplete },

  // Main Pages
  { path: "invoice/new", component: CreateInvoice },
  { path: "company/details", component: CompanyDetails },
  { path: "company/owner", component: CompanyOwner },
  { path: "company/new", component: NewCompany },
  { path: "company", component: Companies },
  { path: "pay", component: Pay },
  { path: "get-paid", component: GetPaid },
  { path: "dashboard", component: Dashboard },

  // { path: "service", component: Service },
  { path: "contacts", component: OBContacts },
  { path: "ob-templates", component: OBTemplates },
  { path: "create-invoice", component: OBInvoice },

  { path: "profile-user", component: ProfileUser },
  { path: "profile-public", component: ProfilePublic },
  // { path: "home", component: GetPaid },
  { path: "history", component: History },
  { path: "choose-template", component: ChooseTemplate },
  { path: "recipient", component: Recipient },

  { path: "invoice/item/:itemID", component: InvoiceItem },
  { path: "invoice/:id/view", component: ViewInvoice },
  { path: "invoice/item", component: InvoiceItem },
  // { path: "payment-methods/:id/remove", component: RemovePaymentMethod },
  { path: "payment-methods", component: PaymentMethods },
  // { path: "add-card", component: AddCard },
  { path: "transfer-balance", component: TransferBalance },
  { path: "export", component: Export },
  { path: "profile/edit", component: EditProfile },
  // { path: "profile/:id", component: Profile },
  { path: "profile/:id", component: ProfileUser },
  // { path: "friends-social", component: FriendsSocial },
  { path: "settings/privacy", component: SettingsPrivacy },
  { path: "settings/services", component: CompanyServices },
  { path: "settings/profile", component: SettingsProfile },
  { path: "settings/company", component: SettingsCompany },
  { path: "settings/users", component: SettingsUsers },
  { path: "settings/quickbooks", component: SettingsQuickBooks },
  { path: "settings/export", component: SettingsExport },
  { path: "settings/payment", component: SettingsPayment },
  { path: "settings/billing", component: SettingsBilling },
  { path: "settings/support", component: SettingsSupport },
  // { path: "settings/notifications/push", component: PushNotifications },
  // { path: "settings/notifications/text", component: TextNotifications },
  // { path: "settings/notifications/email", component: EmailNotifications },
  // { path: "settings/notifications", component: NotificationSettings },
  // { path: "notifications", component: Notifications },
  { path: "settings", component: Settings },
  // { path: "bank", component: AddBank },
  // { path: "user/sila", component: SilaLogin },
  // { path: "sila", component: Sila },
  { path: "privacy-policy", component: PrivacyPolicy },
];

export const publicRoutes = [
  { path: "pf-profile/:company", component: PFHome },
  { path: "pf-invoice/:code", component: PFInvoice },
  { path: "profile-public", component: ProfilePublic },
  { path: "pf-login", component: PFLogin },
  { path: "pf-guest", component: PFGuest },
  { path: "pf-company", component: PFCompany },
  { path: "pf-about", component: PFAbout },
  { path: "pf-location", component: PFLocation },
  { path: "pf-signup", component: PFSignup },
  { path: "pf-type", component: PFType },
  { path: "pf-verify", component: PFVerify },
  { path: "pf-pay", component: PFPay },

  // Onboarding Flow
  { path: "login", component: OBLogin },
  { path: "signup", component: OBSignup },
  { path: "forget-password", component: OBForgetPassword },
  { path: "verify", component: OBVerify },
  { path: "type", component: OBType },
  { path: "about-you", component: OBAboutUser },
  // { path: "ob-service", component: OBService },
  { path: "companies/:code", component: SetupPassword },
  { path: "", component: Welcome },
];
