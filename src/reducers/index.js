import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form'
import taskReducer from './task';
import uiReducer from './ui';
import cart from './cart';
import account from './login';

const rootReducer =  combineReducers({
    task: taskReducer,
    ui: uiReducer,
    cart,
    account,
    form: formReducer,
});

export default rootReducer;