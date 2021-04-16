import React from "react";
import { Link } from "react-router-dom";

// Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/Header";
import ExpansionTile from "../../components/ExpansionTile";

export default function SettingsSupport() {
  return (
    <div className="settings updated-settings robinhood">
      <div className="d-flex desktop-nav-p">
        <Header title="Support" />

        <div className="updated-settings-details w-100">
          <div className="container-fluid">
            <div className="support">
              <div className="updated-settings__card">
                <div className="px-4 py-5 p-md-5">
                  <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-3">
                    How can we help
                  </div>
                  <div className="textM__font-size">
                    <p>
                      Ask questions. Browse articles. Find answers. We’re here
                      to help with any issue or problem you’re experiencing.
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
                      There are two ways you are able to tell that a check you
                      sent out has been deposited.
                      <br />
                      <br />
                      <b>1.</b> In your account, in the payment page under the
                      <b>"Vendor Received"</b> section, you will be able to see
                      the check number, as well as a green
                      <b>"Deposited"</b> label if the check has been deposited.
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
                      When deposited by the vendor, you will receive an email
                      notification confirming that the check was deposited.
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
                      Let’s review how long it takes for payments to arrive in
                      the receiver’s account or mailbox, depending on which
                      payment and delivery method were used for the payment.
                      <br />
                      <br />
                      <b>Paying with Bank Transfer (ACH)</b>
                      <br />
                      <span style={{ display: "block", padding: "0.8rem" }}>
                        • Delivered by bank transfer: <b>3 business days</b>
                        (4 business days for payments over $100K)
                        <br />• Delivered by paper check in the mail:
                        <b>7 business days</b>
                      </span>
                      <br />
                      <b>Paying with Credit Card</b>
                      <br />
                      <span style={{ display: "block", padding: "0.8rem" }}>
                        • Delivered by bank transfer:
                        <b>next business day</b>
                        <br />• Delivered by paper check in the mail:
                        <b>7 business days</b>
                      </span>
                      <br />
                      <b>
                        Note on a possible delay when requesting payment details
                        from vendors:
                      </b>
                      <br />
                      If you’re sending a vendor a request to fill out their
                      payment delivery details, the estimated delivery time will
                      depend on when they fill out their details.
                    </p>
                  </ExpansionTile>

                  <ExpansionTile
                    header="How to verify a bank account with micro-deposits?"
                    borderTop={true}
                  >
                    <p className="textS__font-size m-0">
                      Before transferring payments quickly and easily with your
                      bank account through Melio, you’ll first need to connect
                      your account.
                      <br />
                      <br />
                      <span style={{ display: "block", padding: "0.8rem" }}>
                        <b>1.</b> If you use online banking, you can link it to
                        Melio with you login credentials. For help, see our
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
                        <b>2.</b> If you don’t have an online bank login or
                        prefer not to use it, you can follow the steps below to
                        add, link and verify your bank manually with
                        micro-deposits.
                      </span>
                      <br />
                      <b>Verifying a bank account with micro-deposits</b>
                      <br />
                      <br />
                      <span style={{ display: "block", padding: "0.8rem" }}>
                        <b>1.</b> In your Melio account, go to
                        <b>Settings</b> and select <b>Payment Methods.</b>
                        <br />
                        <b>2.</b> In the Bank account section click
                        <b>Add this method.</b>
                        <br />
                        <b>3.</b> Select Verify with deposits.
                        <br />
                        <b>4.</b> Enter your <b>Account Number</b> and
                        <b>ACH Routing Number</b> and click Complete and Save.
                      </span>
                      <br />
                      <b>Note:</b> please enter an ACH Routing Number. Melio
                      does not currently support Wire Transfers.
                      <br />
                      <br />
                      <span style={{ display: "block", padding: "0.8rem" }}>
                        • Within 2 business days, you will receive two very
                        small deposits in the account that you wish to connect.
                        Once you receive them, you’ll receive an email with a
                        link to your account’s settings where you can enter
                        these micro-deposit amounts and verify your account.
                        <br />• If you have any trouble, feel free to email
                        <a
                          href="mailto:support@meliopayments.com"
                          data-testid="support-email"
                          className="SupportSettingsPageContainer__SupportLink-sc-1osjh1h-1 eXidmi"
                        >
                          support@meliopayments.com
                        </a>
                      </span>
                      <br />
                      Once your bank account is linked and verified, you can
                      quickly and easily schedule payments with it, without
                      needing to verify it each time.
                    </p>
                  </ExpansionTile>

                  <ExpansionTile
                    header="What’s the pricing? Are there any fees?"
                    borderTop={true}
                  >
                    <p className="textS__font-size m-0">
                      Melio is a free service for small businesses. There are no
                      set-up costs or subscription fees.
                      <br />
                      <br />
                      As a small business, paying your bills shouldn’t carry
                      costly fees. That’s why Melio doesn’t charge for basic
                      services like paying with a bank transfer (ACH) or
                      receiving payment from other businesses. Melio only
                      charges a 2.9% fee for the option to delay payments using
                      your credit card. This fee allows us to fund ACH payments,
                      payment delivery, and receiving payments for free, while
                      also generating revenue for Melio.
                      <br />
                      <br />
                      <b>Free bank transfers (ACH)</b>
                      <br />
                      It’s completely free to send and receive
                      business-to-business payments using a bank transfer (ACH).
                      Use Melio to pay all your bills with an ACH and you won’t
                      be charged a penny. Melio delivers payment to your
                      recipient for free via check or bank deposit.
                      <br />
                      <br />
                      <b>Pay your business bills with a credit card</b>
                      <br />
                      You can use Melio to pay any business bill with a credit
                      card for a 2.9% tax-deductible fee, even where cards are
                      not accepted. Melio delivers payment to your recipient by
                      check or bank deposit for free.
                      <br />
                      <br />
                      Paying with a credit card lets you defer payment until
                      your next billing cycle, extend float, and even earn card
                      rewards. These combined with the tax-deduction and free
                      payment delivery usually off-set most, if not all, of the
                      fee. Extending your float can help you take advantage of
                      opportunities such as early payment discounts and give
                      your business a financial boost - like a small business
                      loan that’s already in your wallet.
                      <br />
                      <br />
                      <b>Receiving payments is free</b>
                      <br />
                      Melio delivers payment to your recipient completely free,
                      regardless if it’s bank transfer or a check without them
                      needing to sign up for anything. This also includes
                      requesting and receiving payments through Melio.me.
                    </p>
                  </ExpansionTile>

                  <ExpansionTile
                    header="Does Melio support international payments?"
                    borderTop={true}
                    borderBottom={true}
                  >
                    <p className="textS__font-size m-0">
                      Melio can only be used by US businesses to transfer
                      payments to other US businesses. As such, no payments
                      outside the US are currently supported.
                      <br />
                      <br />
                      Likewise, Melio only supports credit cards issued within
                      the United States.
                    </p>
                  </ExpansionTile>

                  <Link to="#" className="textS__font-size text-primary">
                    Browse all help topics
                  </Link>
                  <br />
                  <br />

                  <div className="updated-settings__headingM displayM__font-size font-weight-bold mb-3">
                    Contact Us
                  </div>
                  <p className="textM__font-size mb-4">
                    Get in touch with the right people at Melio, we’re here to
                    help. Email us at &nbsp;
                    <a className="text-primary">support@meliopayments.com</a>
                    &nbsp;or
                  </p>
                  <div className="d-inline-block">
                    <Link
                      to="/invoice/new"
                      className="btn btn-settings__outline d-flex align-items-center justify-content-around px-5 py-2"
                    >
                      <FontAwesomeIcon icon={faComment} className="mr-3" />
                      Start a chat
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
