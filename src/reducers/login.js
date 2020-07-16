import * as types from "../constants/login";
import { toast } from "react-toastify";
import * as Message from "../constants/Message";

const initialState = {
  infoAccount: [],
};
const account = (state = initialState, action) => {
  switch (action.type) {
    case types.CREATE_ACCOUNT: {
      return {
        ...state,
      };
    }
    case types.CREATE_ACCOUNT_SUCCESS: {
      toast.success(Message.MSG_CREATE_ACCOUNT_SUCCESS);
      return {
        ...state,
      };
    }
    case types.CREATE_ACCOUNT_FAILED: {
      const { error } = action.payload;
      toast.error(error.data.error.message);
      return {
        ...state,
      };
    }
    case types.LOGIN_ACCOUNT: {
      return {
        ...state,
      };
    }
    case types.LOGIN_ACCOUNT_SUCCESS: {
      const { data } = action.payload;
      toast.success(Message.MSG_LOGIN_ACCOUNT_SUCCESS);
      return {
        ...state,
      };
    }
    case types.LOGIN_ACCOUNT_FAILED: {
      const { error } = action.payload;
      toast.error(error.data.error.message);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default account;
