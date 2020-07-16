import * as types from "../constants/ActionType";

const findProductInCart = (cart = [], product) => {
  return cart.findIndex((ca) => ca.name === product.name);
};

export const fetchListProductCart = () => {
  return {
    type: types.FETCH_PRODUCT_CART,
  };
};

export const fetchListProductCartSuccess = (data) => {
  return {
    type: types.FETCH_PRODUCT_CART_SUCCESS,
    payload: {
      data,
    },
  };
};

export const fetchListProductCartFailed = (error) => {
  return {
    type: types.FETCH_PRODUCT_CART_FAILED,
    payload: {
      error,
    },
  };
};

export const addProductToCart = (product) => {
  return {
    type: types.ADD_TO_CART,
    payload: {
      product: { ...product },
    },
  };
};

export const addProductToCartSuccess = (data) => {
  return (dispatch, getState) => {
    const { listCart } = getState().cart;
    listCart[listCart.length] = data;
    dispatch(funcAddProductToCartSuccess([...listCart]));
  };
  function funcAddProductToCartSuccess(listCart) {
    return {
      type: types.ADD_TO_CART_SUCCESS,
      payload: {
        listCart,
      },
    };
  }
};

export const addProductToCartFailed = (error) => {
  return {
    type: types.ADD_TO_CART_FAILED,
    payload: {
      error,
    },
  };
};

export const updateQuantity = (quantity) => {
  return {
    type: types.UPDATE_QUANTITY,
    payload: {
      quantity,
    },
  };
};

export const updateQuantitySuccess = (data) => {
  return (dispatch, getState) => {
    const { listCart } = getState().cart;
    const index = findProductInCart(listCart, data);
    const quantityCartIndex = listCart[index].quantity;
    let sumQuantity = +quantityCartIndex + 1;
    sumQuantity = sumQuantity.toString();
    listCart[index].quantity = sumQuantity;
    dispatch(funcUpdateQuantitySuccess([...listCart]));
  };
  function funcUpdateQuantitySuccess(listCart) {
    return {
      type: types.UPDATE_QUANTITY_SUCCESS,
      payload: {
        listCart,
      },
    };
  }
};

export const updateSumQuantityInCart = (product) => {
  return {
    type: types.UPDATE_SUM_QUANTITY_IN_CART,
    payload: {
      product: { ...product },
    },
  };
};

export const updateSubQuantityInCart = (product) => {
  return {
    type: types.UPDATE_SUB_QUANTITY_IN_CART,
    payload: {
      product,
    },
  };
};

export const updateSumQuantityInCartSuccess = (data) => {
  return (dispatch, getState) => {
    const { listCart } = getState().cart;
    const index = findProductInCart(listCart, data);
    const quantityCartIndex = listCart[index].quantity;
    let sumQuantity = +quantityCartIndex + 1;
    sumQuantity = sumQuantity.toString();
    listCart[index].quantity = sumQuantity;
    dispatch(funcUpdateSumQuantityInCartSuccess([...listCart]));
  };
  function funcUpdateSumQuantityInCartSuccess(listCart) {
    return {
      type: types.UPDATE_SUM_QUANTITY_IN_CART_SUCCESS,
      payload: {
        listCart,
      },
    };
  }
};

export const updateSubtractionQuantityInCartSuccess = (data) => {
  return (dispatch, getState) => {
    const { listCart } = getState().cart;
    const index = findProductInCart(listCart, data);
    const quantityCartIndex = listCart[index].quantity;
    let subQuantity = +quantityCartIndex - 1;
    subQuantity = subQuantity.toString();
    listCart[index].quantity = subQuantity;
    dispatch(funcUpdateSubtractionQuantityInCartSuccess([...listCart]));
  };
  function funcUpdateSubtractionQuantityInCartSuccess(listCart) {
    return {
      type: types.UPDATE_SUBTRACTION_QUANTITY_IN_CART_SUCCESS,
      payload: {
        listCart,
      },
    };
  }
};

export const updateQuantityFailed = (error) => {
  return {
    type: types.UPDATE_QUANTITY_FAILED,
    payload: {
      error,
    },
  };
};

export const deleteProductInCart = (id) => {
  return {
    type: types.DELETE_PRODUCT_IN_CART,
    payload: {
      id,
    },
  };
};

export const deleteProductInCartSuccess = (data) => {
  return {
    type: types.DELETE_PRODUCT_IN_CART_SUCCESS,
    payload: {
      data,
    },
  };
};

export const deleteProductInCartFailed = (error) => {
  return {
    type: types.DELETE_PRODUCT_IN_CART_FAILED,
    payload: {
      error,
    },
  };
};

export const paymentProduct = () => {
  return {
    type: types.PAYMENT_PRODUCT,
  };
};

export const paymentProductSuccess = () => {
  return {
    type: types.PAYMENT_PRODUCT_SUCCESS,
  };
};

export const paymentProductFailed = (error) => {
  return {
    type: types.PAYMENT_PRODUCT_FAILED,
    payload: {
      error,
    },
  };
};
