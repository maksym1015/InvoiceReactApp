import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCreditCard,
  faLock,
  faPlus,
  faSyncAlt,
  faUser,
  faLink,
  faUniversity,
  faComment,
  faCamera,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";

import { notify } from "../../utils/helpers";
import { store } from "../../store";

import Header from "../../components/Header";
import Avatar from "../../components/Avatar";
import Aside from "../../components/Aside";
import TextField from "../../components/TextField";
import Switch2 from "../../components/Switch2";
import ExpansionTile from "../../components/ExpansionTile";
import CompanyService from "../../components/CompanyService";
import Profile from "../../components/Profile";
import SettingsExport from "../../components/SettingsExport";
import SettingsManageUsers from "../../components/SettingsManageUsers";
import CompanySettings from "../../components/CompanySettings";

export default function Settings(props) {
  const { state } = useContext(store);
  const [silaModal, setSilaModal] = useState(false);
  const [selected, setSelected] = useState("companyServices");
  let innerWidth = window.innerWidth;

  const identityVerify = () => {
    if (state.user.sila) {
      return notify("Hurrah! Already verified.");
    }

    setSilaModal(true);
  };

  const goTo = (path, state) => {
    if (innerWidth < 768) {
      props.history.push(path);
    } else {
      setSelected(state);
    }
  };

  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex desktop-nav-p">
        <Aside />

        <div className="content-area__updated-version">
          <div className="custom-background">
            <div className="grid--first-child d-flex flex-column">
              <div className="container-fluid">
                <div className="filter-box d-flex justify-content-between align-items-center">
                  <div className="page-title displayL__font-size font-weight-bold">
                    Settings
                  </div>
                </div>
                <Header title="Settings" />
                {/* <ul className="settings-menu">
                <li>
                  <Link to="/profile/edit" className="settings-menu-item">
                    <span className="svg">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    Edit Profile
                  </Link>
                </li>
                <li>
                  <Link to="/payment-methods" className="settings-menu-item">
                    <span className="svg">
                      <FontAwesomeIcon icon={faCreditCard} />
                    </span>
                    Payment Methods
                  </Link>
                </li>
                <li>
                  <Link to="/settings/privacy" className="settings-menu-item">
                    <span className="svg">
                      <FontAwesomeIcon icon={faLock} />
                    </span>
                    Privacy{" "}
                    <small className="extra-small">(Under development)</small>
                  </Link>
                </li>
                <li>
                  <Link to="#" className="settings-menu-item">
                    <span className="svg">
                      <FontAwesomeIcon icon={faSyncAlt} />
                    </span>
                    Sync with Quickbooks{" "}
                    <small className="extra-small">(Under development)</small>
                  </Link>
                </li> */}
                {/* <li>
              <Link to="/settings/notifications" className="settings-menu-item">
                <span className="svg">
                  <FontAwesomeIcon icon={faBell} />
                </span>
                Notifications{" "}
                <small className="extra-small">(Under development)</small>
              </Link>
            </li>
            <li>
              <Link to="/friends-social" className="settings-menu-item">
                <span className="svg">
                  <FontAwesomeIcon icon={faUserFriends} />
                </span>
                Friends & Social{" "}
                <small className="extra-small">(Under development)</small>
              </Link>
            </li> */}
                {/* </ul> */}
                {/* <div className="menu-title">Security</div>

              <ul className="settings-menu">
                <li>
                  <Link
                    to="#"
                    className="settings-menu-item"
                    onClick={identityVerify}
                  >
                    <span className="svg">
                      <FontAwesomeIcon icon={faUser} />
                    </span>
                    Identity Verification
                  </Link>
                </li>
              </ul>

              <SilaModal show={silaModal} setShow={setSilaModal} /> */}
                <div className="updated-settings__title textSBold__font-size">
                  Company
                </div>
                <ul className="settings-menu updated-settings-menu mb-5">
                  <li
                    onClick={() => goTo("settings/services", "companyServices")}
                  >
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "companyServices" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">
                          Company services
                        </h4>
                        <p className="textS__font-size">
                          These are the services you company regular sends
                          payments or pays bills for.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li
                    onClick={() => goTo("settings/profile", "profileSettings")}
                  >
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "profileSettings" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">
                          Profile settings
                        </h4>
                        <p className="textS__font-size">
                          Set a new password, change email notifications
                          settings.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li
                    onClick={() => goTo("settings/company", "companySettings")}
                  >
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "companySettings" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faCreditCard} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">
                          Company settings
                        </h4>
                        <p className="textS__font-size">
                          Edit your business name, address or phone number.
                          Update your business’s legal information.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li onClick={() => goTo("settings/users", "manageUsers")}>
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "manageUsers" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faLock} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">Manage users</h4>
                        <p className="textS__font-size">
                          Invite new users and set permissions within your
                          organization.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li onClick={() => goTo("settings/quickbooks", "quickBooks")}>
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "quickBooks" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faSyncAlt} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">
                          Sync with QuickBooks
                        </h4>
                        <p className="textS__font-size">
                          Connect your QuickBooks account to sync your bills,
                          vendors and payments.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li onClick={() => goTo("settings/export", "export")}>
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "export" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faSyncAlt} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">Export</h4>
                        <p className="textS__font-size">
                          Connect your QuickBooks account to sync your bills,
                          vendors and payments.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
                <div className="updated-settings__title textSBold__font-size">
                  Payments and billing
                </div>
                <ul className="settings-menu updated-settings-menu mb-5">
                  <li
                    onClick={() => goTo("settings/payment", "paymentMethods")}
                  >
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "paymentMethods" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">
                          Payment methods
                        </h4>
                        <p className="textS__font-size">
                          Add/remove or edit all your payment methods - bank
                          accounts, credit or debit cards.
                        </p>
                      </div>
                    </Link>
                  </li>
                  <li onClick={() => goTo("settings/billing", "billing")}>
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "billing" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faCreditCard} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">Billing</h4>
                        <p className="textS__font-size">
                          View or download your billing receipts.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
                <div className="updated-settings__title textSBold__font-size">
                  Support
                </div>
                <ul className="settings-menu updated-settings-menu">
                  <li onClick={() => goTo("settings/support", "support")}>
                    <Link
                      to="#"
                      className={`settings-menu-item ${
                        selected === "support" && "selected"
                      }`}
                    >
                      <span className="svg">
                        <FontAwesomeIcon icon={faUser} />
                      </span>
                      <div>
                        <h4 className="textMBold__font-size">Support</h4>
                        <p className="textS__font-size">
                          Get help fast, anytime, anywhere.
                        </p>
                      </div>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="d-none d-md-block">
            <>
              <div className="divider"></div>
              <div>
                <div className="grid--second-child updated-settings-details">
                  <div className="container-fluid">
                    {selected === "companyServices" && <CompanyService />}

                    {selected === "profileSettings" && <Profile />}

                    {selected === "companySettings" && <CompanySettings />}

                    {selected === "manageUsers" && <SettingsManageUsers />}

                    {selected === "quickBooks" && (
                      <div className="quick-books">
                        <div className="updated-settings__card">
                          <div className="px-4 py-5 p-md-5">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                              <div className="displayS__font-size font-weight-bold">
                                <FontAwesomeIcon
                                  icon={faLink}
                                  className="ml-3"
                                />
                              </div>
                              <div>
                                <Link
                                  to="#"
                                  className="quick-books__disconnected d-flex align-items-center justify-content-around textS__font-size px-5 py-2"
                                >
                                  Disconnected
                                  <FontAwesomeIcon
                                    icon={faLink}
                                    className="ml-3"
                                  />
                                </Link>
                              </div>
                            </div>
                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                              QuickBooks sync
                            </div>
                            <div className="d-flex flex-column flex-lg-row justify-content-around">
                              <div className="w-100">
                                <p className="textM__font-size mb-5">
                                  Log in and connect your QuickBooks account to
                                  sync your vendors, bills, and payments between
                                  Melio and QuickBooks.
                                </p>
                                <div className="d-inline-block">
                                  <Link
                                    to="#"
                                    className="btn btn-custom d-flex align-items-center justify-content-around px-3 py-2"
                                  >
                                    <FontAwesomeIcon
                                      icon={faLink}
                                      className="mr-3"
                                    />
                                    Connect
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selected === "export" && <SettingsExport />}

                    {selected === "paymentMethods" && (
                      <div className="payment-methods">
                        <div className="updated-settings__card">
                          <div className="px-4 py-5 p-md-5">
                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                              Payment methods
                            </div>

                            <div>
                              <div className="updated-settings__card box-shadow-none px-4 py-5 mb-4">
                                <Link
                                  to="#"
                                  className="d-block text-right textS__font-size mr-2 white-space-nowrap"
                                  style={{ lineHeight: "1rem" }}
                                >
                                  Add this method
                                </Link>
                                <div className="d-flex mb-3">
                                  <span className="svg ml-2 mr-4">
                                    <FontAwesomeIcon icon={faUniversity} />
                                  </span>
                                  <div className="flex-fill">
                                    <h4 className="textMBold__font-size m-0">
                                      Bank account
                                    </h4>
                                    <p className="textS__font-size m-0">From</p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="updated-settings__card box-shadow-none px-4 py-5 mb-4">
                                <Link
                                  to="#"
                                  className="d-block text-right textS__font-size mr-2 white-space-nowrap"
                                  style={{ lineHeight: "1rem" }}
                                >
                                  Add this method
                                </Link>
                                <div className="d-flex mb-3">
                                  <span className="svg ml-2 mr-4">
                                    <FontAwesomeIcon icon={faCreditCard} />
                                  </span>
                                  <div className="flex-fill">
                                    <h4 className="textMBold__font-size m-0">
                                      Credit card
                                    </h4>
                                    <p className="textS__font-size m-0">
                                      Defer this payment and earn card rewards.
                                      2.9% fee.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selected === "billing" && (
                      <div className="billing">
                        <div className="updated-settings__card">
                          <div className="px-4 py-5 p-md-5">
                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-5">
                              Payment history
                            </div>
                            <div>
                              <p className="textS__font-size m-0">
                                You do not have any payments
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {selected === "support" && (
                      <div className="support">
                        <div className="updated-settings__card">
                          <div className="px-4 py-5 p-md-5">
                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-3">
                              How can we help
                            </div>
                            <div className="textM__font-size">
                              <p>
                                Ask questions. Browse articles. Find answers.
                                We’re here to help with any issue or problem
                                you’re experiencing.
                              </p>
                            </div>
                            <br />
                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-3">
                              Popular help topics
                            </div>
                            <ExpansionTile
                              header="How do I know my vendor deposited the check I sent them?"
                              borderTop={true}
                            >
                              <p className="textS__font-size m-0">
                                There are two ways you are able to tell that a
                                check you sent out has been deposited.
                                <br />
                                <br />
                                <b>1.</b> In your account, in the payment page
                                under the
                                <b>"Vendor Received"</b> section, you will be
                                able to see the check number, as well as a green
                                <b>"Deposited"</b> label if the check has been
                                deposited.
                                <br />
                                <br />
                                <br />
                                <img
                                  src="https://production-webcdn.meliopayments.com/static/media/vendor-received-deposit.98aefd2f.png"
                                  alt="Paper check"
                                  className="w-100"
                                />
                                <br />
                                <br />
                                <br />
                                <b>2.</b>
                                When deposited by the vendor, you will receive
                                an email notification confirming that the check
                                was deposited.
                              </p>
                            </ExpansionTile>

                            <ExpansionTile
                              header="When will my payment arrive?"
                              borderTop={true}
                            >
                              <p className="textS__font-size m-0">
                                Timing is important when bill-paying.
                                <br />
                                <br />
                                Let’s review how long it takes for payments to
                                arrive in the receiver’s account or mailbox,
                                depending on which payment and delivery method
                                were used for the payment.
                                <br />
                                <br />
                                <b>Paying with Bank Transfer (ACH)</b>
                                <br />
                                <span
                                  style={{
                                    display: "block",
                                    padding: "0.8rem",
                                  }}
                                >
                                  • Delivered by bank transfer:{" "}
                                  <b>3 business days</b>
                                  (4 business days for payments over $100K)
                                  <br />• Delivered by paper check in the mail:
                                  <b>7 business days</b>
                                </span>
                                <br />
                                <b>Paying with Credit Card</b>
                                <br />
                                <span
                                  style={{
                                    display: "block",
                                    padding: "0.8rem",
                                  }}
                                >
                                  • Delivered by bank transfer:
                                  <b>next business day</b>
                                  <br />• Delivered by paper check in the mail:
                                  <b>7 business days</b>
                                </span>
                                <br />
                                <b>
                                  Note on a possible delay when requesting
                                  payment details from vendors:
                                </b>
                                <br />
                                If you’re sending a vendor a request to fill out
                                their payment delivery details, the estimated
                                delivery time will depend on when they fill out
                                their details.
                              </p>
                            </ExpansionTile>

                            <ExpansionTile
                              header="How to verify a bank account with micro-deposits?"
                              borderTop={true}
                            >
                              <p className="textS__font-size m-0">
                                Before transferring payments quickly and easily
                                with your bank account through Melio, you’ll
                                first need to connect your account.
                                <br />
                                <br />
                                <span
                                  style={{
                                    display: "block",
                                    padding: "0.8rem",
                                  }}
                                >
                                  <b>1.</b> If you use online banking, you can
                                  link it to Melio with you login credentials.
                                  For help, see our
                                  <a
                                    target="_open"
                                    href="https://help.meliopayments.com/en/articles/3353832-how-to-add-a-bank-account-automatically"
                                    className="SupportSettingsPageContainer__SupportLink-sc-1osjh1h-1 eXidmi"
                                  >
                                    ’how to automatically add a bank account’
                                  </a>
                                  guide.
                                  <br />
                                  <br />
                                  <b>2.</b> If you don’t have an online bank
                                  login or prefer not to use it, you can follow
                                  the steps below to add, link and verify your
                                  bank manually with micro-deposits.
                                </span>
                                <br />
                                <b>
                                  Verifying a bank account with micro-deposits
                                </b>
                                <br />
                                <br />
                                <span
                                  style={{
                                    display: "block",
                                    padding: "0.8rem",
                                  }}
                                >
                                  <b>1.</b> In your Melio account, go to
                                  <b>Settings</b> and select{" "}
                                  <b>Payment Methods.</b>
                                  <br />
                                  <b>2.</b> In the Bank account section click
                                  <b>Add this method.</b>
                                  <br />
                                  <b>3.</b> Select Verify with deposits.
                                  <br />
                                  <b>4.</b> Enter your <b>Account Number</b> and
                                  <b>ACH Routing Number</b> and click Complete
                                  and Save.
                                </span>
                                <br />
                                <b>Note:</b> please enter an ACH Routing Number.
                                Melio does not currently support Wire Transfers.
                                <br />
                                <br />
                                <span
                                  style={{
                                    display: "block",
                                    padding: "0.8rem",
                                  }}
                                >
                                  • Within 2 business days, you will receive two
                                  very small deposits in the account that you
                                  wish to connect. Once you receive them, you’ll
                                  receive an email with a link to your account’s
                                  settings where you can enter these
                                  micro-deposit amounts and verify your account.
                                  <br />• If you have any trouble, feel free to
                                  email
                                  <a
                                    href="mailto:support@meliopayments.com"
                                    data-testid="support-email"
                                    className="SupportSettingsPageContainer__SupportLink-sc-1osjh1h-1 eXidmi"
                                  >
                                    support@meliopayments.com
                                  </a>
                                </span>
                                <br />
                                Once your bank account is linked and verified,
                                you can quickly and easily schedule payments
                                with it, without needing to verify it each time.
                              </p>
                            </ExpansionTile>

                            <ExpansionTile
                              header="What’s the pricing? Are there any fees?"
                              borderTop={true}
                            >
                              <p className="textS__font-size m-0">
                                Melio is a free service for small businesses.
                                There are no set-up costs or subscription fees.
                                <br />
                                <br />
                                As a small business, paying your bills shouldn’t
                                carry costly fees. That’s why Melio doesn’t
                                charge for basic services like paying with a
                                bank transfer (ACH) or receiving payment from
                                other businesses. Melio only charges a 2.9% fee
                                for the option to delay payments using your
                                credit card. This fee allows us to fund ACH
                                payments, payment delivery, and receiving
                                payments for free, while also generating revenue
                                for Melio.
                                <br />
                                <br />
                                <b>Free bank transfers (ACH)</b>
                                <br />
                                It’s completely free to send and receive
                                business-to-business payments using a bank
                                transfer (ACH). Use Melio to pay all your bills
                                with an ACH and you won’t be charged a penny.
                                Melio delivers payment to your recipient for
                                free via check or bank deposit.
                                <br />
                                <br />
                                <b>
                                  Pay your business bills with a credit card
                                </b>
                                <br />
                                You can use Melio to pay any business bill with
                                a credit card for a 2.9% tax-deductible fee,
                                even where cards are not accepted. Melio
                                delivers payment to your recipient by check or
                                bank deposit for free.
                                <br />
                                <br />
                                Paying with a credit card lets you defer payment
                                until your next billing cycle, extend float, and
                                even earn card rewards. These combined with the
                                tax-deduction and free payment delivery usually
                                off-set most, if not all, of the fee. Extending
                                your float can help you take advantage of
                                opportunities such as early payment discounts
                                and give your business a financial boost - like
                                a small business loan that’s already in your
                                wallet.
                                <br />
                                <br />
                                <b>Receiving payments is free</b>
                                <br />
                                Melio delivers payment to your recipient
                                completely free, regardless if it’s bank
                                transfer or a check without them needing to sign
                                up for anything. This also includes requesting
                                and receiving payments through Melio.me.
                              </p>
                            </ExpansionTile>

                            <ExpansionTile
                              header="Does Melio support international payments?"
                              borderTop={true}
                              borderBottom={true}
                            >
                              <p className="textS__font-size m-0">
                                Melio can only be used by US businesses to
                                transfer payments to other US businesses. As
                                such, no payments outside the US are currently
                                supported.
                                <br />
                                <br />
                                Likewise, Melio only supports credit cards
                                issued within the United States.
                              </p>
                            </ExpansionTile>

                            <Link
                              to="#"
                              className="textS__font-size text-primary"
                            >
                              Browse all help topics
                            </Link>
                            <br />
                            <br />

                            <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-3">
                              Contact Us
                            </div>
                            <p className="textM__font-size mb-4">
                              Get in touch with the right people at Melio, we’re
                              here to help. Email us at &nbsp;
                              <a className="text-primary">
                                support@meliopayments.com
                              </a>
                              &nbsp;or
                            </p>
                            <div className="d-inline-block">
                              <Link
                                to="/invoice/new"
                                className="btn btn-settings__outline d-flex align-items-center justify-content-around px-5 py-2"
                              >
                                <FontAwesomeIcon
                                  icon={faComment}
                                  className="mr-3"
                                />
                                Start a chat
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
}
