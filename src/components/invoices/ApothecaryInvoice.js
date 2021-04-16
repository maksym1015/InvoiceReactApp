import React, { useState } from "react";

export default function ApothecaryInvoice(props) {

    const [tax, setTax] = useState(4.32);
    const [shipping, setShipping] = useState(7.20);

    const subtotal = (items) => {
        let total = 0;
        items.forEach(item => total += parseFloat(item.price));
        
        return parseFloat(total).toFixed(2);
    }

    const total = (items) => {
        let total = 0;
        items.forEach(item => total += parseFloat(item.price));

        // if (tax) {
        //     total += tax;
        // }

        // if (shipping) {
        //     total += shipping;
        // }
        
        return parseFloat(total).toFixed(2);
    }
    
    return (
        <div className="invoice-card shadow retail">
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
                            <th>Shipped to</th>
                            <th>Billed to</th>
                            <th>Invoice #</th>
                            <th>Invoice Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Crystal Widjaja
                                <br />
                                2296 Hendy Lane
                                <br />
                                San Jose, CA 95124
                            </td>
                            <td>
                                Crystal Widjaja
                                <br />
                                2296 Hendy Lane
                                <br />
                                San Jose, CA 95124
                            </td>
                            <td>000001</td>
                            <td>August 16, 2020	</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="invoice-line-2">
                <table className="table table-sm mb-0">
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>SKU</th>
                            <th className="text-right">Size</th>
                            <th className="text-right">Qty</th>
                            <th className="text-right">Price</th>
                            <th className="text-right">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {props.items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.title}</td>
                                <td>{item.sku}</td>
                                <td className="text-right">{item.size}</td>
                                <td className="text-right">{item.qty}</td>
                                <td className="text-right">${item.price}</td>
                                <td className="text-right">${parseFloat(item.price * item.qty).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* <div className="invoice-line-3">
                <div className="line-item">
                    <div>Subtotal</div>
                    <div>${subtotal(props.items)}</div>
                </div>
                <div className="line-item">
                    <div>Taxes</div>
                    <div>${tax}</div>
                </div>
                <div className="line-item">
                    <div>Shipping Cost</div>
                    <div>${shipping}</div>
                </div>
            </div> */}

            {/* <div className="invoice-total">
                TOTAL <span className="font-weight-bold ml-5">${total(props.items)}</span>
            </div> */}

            <h3 className="text-center font-weight-bold mb-0">Apothecary</h3>
        </div>
    );
}
