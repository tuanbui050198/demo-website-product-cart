import DeleteIcon from "@material-ui/icons/Delete";
import React, { Component } from "react";
import * as text from "../../../constants/text";

class CartItem extends Component {
  render() {
    const {
      item,
      onClickDelete,
      onSumQuantity,
      onSubtractionQuantity,
    } = this.props;
    const { image, name, price, quantity } = item;
    return (
      <tr>
        <th scope="row">
          <img src={image} alt={name} className="img-fluid z-depth-0" />
        </th>
        <td>
          <h5>
            <strong>{name}</strong>
          </h5>
        </td>
        <td>
          {price}
          {text.TXT_CURRENCY_UNIT}
        </td>
        <td className="center-on-small-only">
          <span className="qty">{quantity} </span>
          <div className="btn-group radio-group" data-toggle="buttons">
            <label
              onClick={() => onSubtractionQuantity(item)}
              className="btn btn-sm btn-primary
                                      btn-rounded waves-effect waves-light"
            >
              <a href="##">{text.TXT_SUB}</a>
            </label>
            <label
              onClick={() => onSumQuantity(item)}
              className="btn btn-sm btn-primary
                                      btn-rounded waves-effect waves-light"
            >
              <a href="##">{text.TXT_SUM}</a>
            </label>
          </div>
        </td>
        <td className="total-price">
          {this.showSubTotal(price, quantity)}
          {text.TXT_CURRENCY_UNIT}
        </td>
        <td className="icon-delete">
          <button
            type="button"
            className="btn btn-sm btn-primary waves-effect waves-light"
            data-toggle="tooltip"
            data-placement="top"
            title=""
            data-original-title="Remove item"
            onClick={onClickDelete}
          >
            <DeleteIcon />
          </button>
        </td>
      </tr>
    );
  }

  showSubTotal = (price, quantity) => {
    return price * quantity;
  };
}

export default CartItem;
