import React, { Component } from "react";
import * as text from "../../../constants/text";
import PrintIcon from "@material-ui/icons/Print";

class CartResult extends Component {
  render() {
    const { cart, onBuyProduct, printBill } = this.props;
    return (
      <tr>
        <td colSpan="3"></td>
        <td>
          <h4>
            <strong className="fs-text-result">{text.TXT_TOTAL}</strong>
          </h4>
        </td>
        <td>
          <h4>
            <strong className="fs-text-result">
              {this.showTotalAmount(cart)}
              {text.TXT_CURRENCY_UNIT}
            </strong>
          </h4>
        </td>

        <td colSpan="3">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light pd-10"
            onClick={printBill}
          >
            <PrintIcon />
          </button>
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light pd-15"
            onClick={onBuyProduct}
          >
            {text.TXT_PAY}
            <i className="fa fa-angle-right right"></i>
          </button>
        </td>
        {/* <td colSpan="3">
          <button
            type="button"
            className="btn btn-primary waves-effect waves-light pd-15"
          >
            <PrintIcon />
          </button>
        </td> */}
      </tr>
    );
  }

  showTotalAmount = (cart) => {
    var total = 0;
    if (cart.length > 0) {
      cart.map((index) => {
        return (total += index.price * index.quantity);
      });
    }
    return total;
  };
}

export default CartResult;
