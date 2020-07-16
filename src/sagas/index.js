import {
  call,
  delay,
  fork,
  put,
  take,
  takeEvery,
  takeLatest,
  select,
} from "redux-saga/effects";
import * as taskTypes from "../constants/task";
import * as cartTypes from "../constants/ActionType";
import { getList } from "../apis/task";
import { STATUS_CODE } from "../constants";
import {
  fetchListProductSuccess,
  fetchListProductFailed,
  filterProductSuccess,
} from "../actions/task";
import { showLoading, hideLoading } from "../actions/ui";
import {
  addProductToCartSuccess,
  addProductToCartFailed,
  fetchListProductCartFailed,
  fetchListProductCartSuccess,
  updateQuantitySuccess,
  updateQuantityFailed,
  deleteProductInCartSuccess,
  deleteProductInCartFailed,
  updateSumQuantityInCartSuccess,
  updateSubtractionQuantityInCartSuccess,
  paymentProductSuccess,
} from "../actions/index";
import { getListCart, addCart, updateCart, deleteProduct } from "../apis/cart";
import * as actionAccount from "../constants/login";
import { addAccount, loginAccount } from "../apis/login";
import {
  createAccountSuccess,
  createAccountFailed,
  loginPageSuccess,
  loginPageFailed,
} from "../actions/login";
import { ROUTES_LOGIN, ROUTES_PRODUCT } from "../constants/Routes";

function* watchFetchListProduct() {
  while (true) {
    yield take(taskTypes.FETCH_PRODUCT);
    yield put(showLoading());
    yield delay(200);
    const resp = yield call(getList);
    const respData = yield call(getListCart);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListProductSuccess(data));
      yield put(fetchListProductCartSuccess(respData.data));
    } else {
      yield put(fetchListProductFailed(data));
    }
    yield put(hideLoading());
  }
}

function* filterProductSaga({ payload }) {
  yield delay(200);
  const { keyword } = payload;
  const resp = yield call(getList);
  const list = resp.data;
  const filterProduct = list.filter((product) =>
    product.name.trim().toLowerCase().includes(keyword.trim().toLowerCase())
  );
  yield put(filterProductSuccess(filterProduct));
}

const findProductInCart = (cart = [], product) => {
  return cart.findIndex((ca) => ca.name === product.name);
};

function* addToCartSaga({ payload }) {
  const {
    id,
    image,
    name,
    description,
    rating,
    quantity,
    inventory,
    type,
    price,
  } = payload.product;
  const respGetData = yield call(getListCart);
  const dataCart = respGetData.data;
  var index = findProductInCart(dataCart, payload.product);
  if (index !== -1) {
    var temp2 = parseInt(quantity) + parseInt(dataCart[index].quantity);
    temp2 = temp2.toString();
    dataCart[index].quantity = temp2;
    const respDataCart = yield call(
      updateCart,
      dataCart[index],
      dataCart[index].id
    );
    if (respDataCart.status === STATUS_CODE.SUCCESS) {
      yield put(updateQuantitySuccess(respDataCart.data));
    } else {
      yield put(updateQuantityFailed(respDataCart.data));
    }
  } else {
    const resp = yield call(addCart, {
      id,
      image,
      rating,
      name,
      description,
      quantity,
      inventory,
      type,
      price,
    });
    const { data, status } = resp;
    if (status === STATUS_CODE.CREATED) {
      yield put(addProductToCartSuccess(data));
    } else {
      yield put(addProductToCartFailed(data));
    }
  }
}

function* watchFetchListCart() {
  while (true) {
    yield take(cartTypes.FETCH_PRODUCT_CART);
    yield put(showLoading());
    yield delay(200);

    const resp = yield call(getListCart);
    const { status, data } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(fetchListProductCartSuccess(data));
    } else {
      yield put(fetchListProductCartFailed(data));
    }
    yield put(hideLoading());
  }
}

function* updateCartSaga({ payload }) {
  const { quantity } = payload;
  const listCart = yield select((state) => state.cart.listCart);
  yield put(showLoading());
  const resp = yield call(updateCart, { quantity }, listCart.id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.UPDATED) {
    yield put(updateQuantitySuccess(data.quantity));
  } else {
    yield put(updateQuantityFailed(data));
  }
  yield delay(200);
  yield put(hideLoading());
}
function* deleteProductInCartSaga({ payload }) {
  const { id } = payload;
  yield put(showLoading());
  const resp = yield call(deleteProduct, id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(deleteProductInCartSuccess(id));
  } else {
    yield put(deleteProductInCartFailed(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* updateSumQuantityInCartSaga({ payload }) {
  const { product } = payload;
  const respGetData = yield call(getListCart);
  const dataCart = respGetData.data;
  var index = -1;
  index = findProductInCart(dataCart, product);
  var temp = parseInt(dataCart[index].quantity);
  temp += 1;
  temp = temp.toString();
  dataCart[index].quantity = temp;
  yield put(showLoading());
  const resp = yield call(updateCart, dataCart[index], dataCart[index].id);

  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateSumQuantityInCartSuccess(data));
  } else {
    yield put(updateQuantityFailed(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* updateSubQuantityInCartSaga({ payload }) {
  const { product } = payload;
  const respGetData = yield call(getListCart);
  const dataCart = respGetData.data;
  var index = -1;
  index = findProductInCart(dataCart, product);
  var temp = parseInt(dataCart[index].quantity);
  temp -= 1;
  temp = temp.toString();
  dataCart[index].quantity = temp;
  yield put(showLoading());
  const resp = yield call(updateCart, dataCart[index], dataCart[index].id);
  const { data, status: statusCode } = resp;
  if (statusCode === STATUS_CODE.SUCCESS) {
    yield put(updateSubtractionQuantityInCartSuccess(data));
  } else {
    yield put(updateQuantityFailed(data));
  }
  yield delay(200);
  yield put(hideLoading());
}

function* createAccountSaga({ payload }) {
  const { email, password, history } = payload;
  try {
    const resp = yield call(addAccount, {
      email,
      password,
      returnSecureToken: true,
    });
    const { data, status } = resp;
    if (status === STATUS_CODE.SUCCESS) {
      yield put(createAccountSuccess());
      if (history) {
        history.push(ROUTES_LOGIN[0].path);
      }
    }
  } catch (error) {
    yield put(createAccountFailed(error));
  }
}

function* loginAccountSaga({ payload }) {
  const { email, password, history } = payload;
  try {
    const resp = yield call(loginAccount, {
      email,
      password,
      returnSecureToken: true,
    });
    const { data, status } = resp;
    console.log(data.idToken);
    if (status === STATUS_CODE.SUCCESS) {
      yield put(loginPageSuccess(data));
      if (history) {
        history.push(ROUTES_PRODUCT[0].path);
      }
    }
  } catch (error) {
    yield put(loginPageFailed(error));
  }
}

function* paymentProductSaga() {
  const resp = yield call(getListCart);
  const { data, status } = resp;
  if (data.length > 0) {
    for (var i = 0; i < data.length; i++) {
      yield call(deleteProduct, data[i].id);
    }
  }
  yield put(paymentProductSuccess());
}

function* rootSaga() {
  yield fork(watchFetchListProduct);
  yield fork(watchFetchListCart);
  yield takeLatest(taskTypes.FILTER_PRODUCT, filterProductSaga);
  yield takeEvery(cartTypes.ADD_TO_CART, addToCartSaga);
  yield takeLatest(cartTypes.DELETE_PRODUCT_IN_CART, deleteProductInCartSaga);
  yield takeLatest(cartTypes.UPDATE_QUANTITY, updateCartSaga);
  yield takeLatest(
    cartTypes.UPDATE_SUM_QUANTITY_IN_CART,
    updateSumQuantityInCartSaga
  );
  yield takeLatest(
    cartTypes.UPDATE_SUB_QUANTITY_IN_CART,
    updateSubQuantityInCartSaga
  );
  yield takeLatest(cartTypes.PAYMENT_PRODUCT, paymentProductSaga);
  yield takeLatest(actionAccount.CREATE_ACCOUNT, createAccountSaga);
  yield takeLatest(actionAccount.LOGIN_ACCOUNT, loginAccountSaga);
}

export default rootSaga;
