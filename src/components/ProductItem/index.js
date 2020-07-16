import { withStyles } from "@material-ui/core";
import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartAction from "../../actions/index";
import * as text from "../../constants/text";
import styles from "./styles";

class ProductItem extends Component {
  // onhandleChange = (e) => {
  //   var target = e.target;
  //   var name = target.name;
  //   var value = target.type === "checkbox" ? target.checked : target.value;
  //   this.setState({
  //     [name]: value,
  //   });
  // };

  showRatings(rating) {
    var result = [];
    for (var i = 1; i <= rating; i++) {
      result.push(<i key={i} className="fa fa-star"></i>);
    }
    for (var j = 1; j <= 5 - rating; j++) {
      result.push(<i key={j + i} className="fa fa-star-o"></i>);
    }
    return result;
  }

  render() {
    const { product } = this.props;
    const { name, image, description, price, rating } = product;
    return (
      <div className="col-lg-4 col-md-6 mb-r mt-20">
        <div className="card card-shadow">
          <div className="view overlay">
            <img src={image} className="img-fluid" alt={name} />
            <a href="##">
              <div className="mask"></div>
            </a>
          </div>
          <div className="card-body">
            <h4 className="card-title">
              <strong>
                <a href="##">{name}</a>
              </strong>
            </h4>
            <ul className="rating">
              <li>{this.showRatings(rating)}</li>
            </ul>
            <p className="card-text">{description}</p>
            <div className="card-footer">
              <span className="left">
                {price}
                {text.TXT_CURRENCY_UNIT}
              </span>
              <span className="right">
                <a
                  href="##"
                  className="btn-floating blue-gradient"
                  data-toggle="tooltip"
                  data-placement="top"
                  title=""
                  data-original-title="Add to Cart"
                  onClick={() => this.onAddToCart({ product })}
                >
                  <i className="fa fa-shopping-cart"></i>
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  onAddToCart = (data) => {
    const { cartActionCreators } = this.props;
    const { addProductToCart } = cartActionCreators;
    const { product } = data;
    addProductToCart(product);
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    cartActionCreators: bindActionCreators(cartAction, dispatch),
  };
};

export default withStyles(styles)(
  connect(null, mapDispatchToProps)(ProductItem)
);
