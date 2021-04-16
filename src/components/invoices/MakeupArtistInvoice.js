import React from "react";

export default function MakeupArtistInvoice(props) {

    const total = (items) => {
        let total = 0;
        items.forEach(item => {
            if (item.qty) {
                total += parseFloat(item.price * item.qty)
            }
        });
        
        return parseFloat(total).toFixed(2);
    }

    return (
        <div className="invoice-card shadow beauty">
            <div className="invoice-btns">
                <button className="btn btn-custom-link">export</button>
                <button className="btn btn-custom-link">close</button>
            </div>

            <div className="d-flex align-items-center mb-5">
                <img src="/images/download@2x.png" />
                <p className="invoice-title mb-0">{props.name}</p>
            </div>

            <div className="invoice-line-1">
                <table className="table table-sm table-borderless">
                    <thead>
                        <tr>
                            <th>Bill to</th>
                            <th>Amount</th>
                            <th>Billing period</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Team IFA
                                <br />
                                109 Academy Dr
                                <br />
                                St Pete's, CA 90271
                            </td>
                            <td>$140.00	</td>
                            <td>Aug 26, 2020 to Aug 31, 2020</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-line-2">
                <table className="table table-sm mb-0">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td className="text-right">{item.qty}</td>
                                <td className="text-right">${item.price}</td>
                                <td className="text-right">${item.price * item.qty}</td>
                            </tr>
                        ))}
                    </tbody>
                    {/* <tfoot>
                        <tr>
                            <td colSpan="4" className="text-right">
                                Total Amount <span className="font-weight-bold ml-5">${total(props.items)}</span>
                            </td>
                        </tr>
                    </tfoot> */}
                </table>
            </div>

            <h3 className="text-center font-weight-bold mb-0">Makeup Artist</h3>
        </div>
    );
}
