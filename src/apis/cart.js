import axiosService from "../commons/axiosService";
import { API_ENDPOINT } from "../constants";
const url = "carts";

export const getListCart = () => {
  return axiosService.get(`${API_ENDPOINT}/${url}`);
};

export const addCart = data => {
  return axiosService.post(`${API_ENDPOINT}/${url}`, data);
}
export const updateCart = (data, id) => {
  return axiosService.put(`${API_ENDPOINT}/${url}/${id}`, data);
}

export const deleteProduct = (id) => {
  return axiosService.delete(`${API_ENDPOINT}/${url}/${id}`);
}