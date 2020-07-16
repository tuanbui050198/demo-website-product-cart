import axiosService from "../commons/axiosService";
import {
  API_ENDPOINT_SIGNIN,
  API_ENDPOINT_SIGNUP,
  API_KEY,
} from "../constants";

const callApi = (url, data) => {
  return new Promise((resolve, reject) => {
    axiosService
      .post(url, data)
      .then(function (response) {
        resolve(response);
      })
      .catch((err) => {
        reject(err.response);
      });
  });
};

export const addAccount = (data) => {
  // asyc await
  return new Promise((resolve, reject) => {
    callApi(`${API_ENDPOINT_SIGNUP}${API_KEY}`, data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const loginAccount = (data) => {
  return new Promise((resolve, reject) => {
    callApi(`${API_ENDPOINT_SIGNIN}${API_KEY}`, data)
      .then((result) => {
        resolve(result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
