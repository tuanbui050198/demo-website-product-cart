import * as productConstants from "../constants/task";
import { toast } from "react-toastify";

const initialState = {
  listProducts: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case productConstants.FETCH_PRODUCT: {
      return {
        ...state,
        listProducts: [],
      };
    }
    case productConstants.FETCH_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProducts: data,
      };
    }
    case productConstants.FETCH_PRODUCT_FAILED: {
      const { error } = action.payload;
      toast.error(error);
      return {
        ...state,
        listProducts: [],
      };
    }
    case productConstants.FILTER_PRODUCT_SUCCESS: {
      const { data } = action.payload;
      return {
        ...state,
        listProducts: data,
      };
    }
    default:
      return state;
  }
};

export default reducer;
