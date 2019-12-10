import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import settingsReducer from './reducers/settingsReducer'
let reducers = combineReducers({
  accountReducer,
  settingsReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
