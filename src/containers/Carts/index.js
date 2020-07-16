import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Cart from "../../components/Cart";
import * as Message from "../../constants/Message";
import CartItem from "../../components/Cart/CartItem";
import CartResult from "../../components/Cart/CartResult";
import { bindActionCreators } from "redux";
import * as cartActions from "../../actions/index";
import "../../App.css";

class Carts extends Component {
  componentDidMount() {
    const { cartActionCreators } = this.props;
    const { fetchListProductCart } = cartActionCreators;
    fetchListProductCart();
  }

  render() {
    const { cart } = this.props;
    return (
      <Cart>
        {this.showCartItem(cart)}
        {this.showTotalAmount(cart)}
      </Cart>
    );
  }

  onClickDelete = (item) => {
    const { id } = item;
    const { cartActionCreators } = this.props;
    const { deleteProductInCart } = cartActionCreators;
    deleteProductInCart(id);
  };

  onSumQuantity = (item) => {
    const { cartActionCreators } = this.props;
    const { updateSumQuantityInCart } = cartActionCreators;
    updateSumQuantityInCart(item);
  };

  onSubtractionQuantity = (item) => {
    if (item.quantity > 1) {
      const { cartActionCreators } = this.props;
      const { updateSubQuantityInCart } = cartActionCreators;
      updateSubQuantityInCart(item);
    }
  };

  showCartItem = (cart) => {
    var result = Message.MSG_CART_EMPTY;
    if (cart.length > 0) {
      result = cart.map((item, index) => {
        return (
          <CartItem
            item={item}
            key={item.id}
            index={index}
            onClickDelete={() => this.onClickDelete(item)}
            onSumQuantity={() => this.onSumQuantity(item)}
            onSubtractionQuantity={() => this.onSubtractionQuantity(item)}
          />
        );
      });
    }
    return result;
  };

  onBuyProduct = () => {
    const { cartActionCreators } = this.props;
    const { paymentProduct } = cartActionCreators;
    paymentProduct();
  };

  onPrintBill = () => {
    window.print();
  };

  showTotalAmount = (cart) => {
    var result = null;
    if (cart.length > 0) {
      result = (
        <CartResult
          cart={cart}
          onBuyProduct={this.onBuyProduct}
          printBill={this.onPrintBill}
        />
      );
    }
    return result;
  };
}

Carts.propTypes = {
  cartActionCreators: PropTypes.shape({
    fetchListProductCart: PropTypes.func,
    deleteProductInCart: PropTypes.func,
  }),
};

const mapStateToProps = (state) => {
  return {
    cart: state.cart.listCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    cartActionCreators: bindActionCreators(cartActions, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Carts);
