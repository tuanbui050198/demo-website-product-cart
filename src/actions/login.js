import * as types from "../constants/login";

export const createAccount = (email, password, history) => {
  return {
    type: types.CREATE_ACCOUNT,
    payload: {
      email,
      password,
      history,
    },
  };
};

export const createAccountSuccess = () => {
  return {
    type: types.CREATE_ACCOUNT_SUCCESS,
  };
};

export const createAccountFailed = (error) => {
  return {
    type: types.CREATE_ACCOUNT_FAILED,
    payload: {
      error,
    },
  };
};

export const loginPage = (email, password, history) => {
  return {
    type: types.LOGIN_ACCOUNT,
    payload: {
      email,
      password,
      history,
    },
  };
};

export const loginPageSuccess = (data) => {
  localStorage.setItem(
    "JWT",
    JSON.stringify({
      JsonWebToken: data,
    })
  );
  return {
    type: types.LOGIN_ACCOUNT_SUCCESS,
    payload: {
      data,
    },
  };
};

export const loginPageFailed = (error) => {
  return {
    type: types.LOGIN_ACCOUNT_FAILED,
    payload: {
      error,
    },
  };
};
