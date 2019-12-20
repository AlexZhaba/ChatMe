import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import settingsReducer from './reducers/settingsReducer'
import registrationReducer from './reducers/registrationReducer'
import signUpReducer from './reducers/signUpReducer'
import subscribersPageReducer from './reducers/subscribersPageReducer';
import subscribtionReducer from './reducers/subscribtionReducer';
let reducers = combineReducers({
  accountReducer,
  settingsReducer,
  registrationReducer,
  signUpReducer,
  subscribersPageReducer,
  subscribtionReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
