// import { createStore, combineReducers, applyMiddleware } from "redux";
import { applyMiddleware, combineReducers, legacy_createStore as createStore } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { thunk } from "redux-thunk"

import {
  userReducer,
  profileReducer
} from "./reducers/userReducer";


const reducer = combineReducers({
  user: userReducer,
  userAvatarMsg: profileReducer,
});




const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
