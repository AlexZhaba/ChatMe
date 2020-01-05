import {combineReducers, createStore, applyMiddleware} from "redux";
import thunkMiddleware from 'redux-thunk';
import accountReducer from './reducers/accountReducer';
import registrationReducer from './reducers/registrationReducer'
import signUpReducer from './reducers/signUpReducer'
import subscribersPageReducer from './reducers/subscribersPageReducer';
import subscribtionReducer from './reducers/subscribtionReducer';
import searchReducer from './reducers/searchReducer';
import settingsReducer from './reducers/settingsReducer';
import newsReducer from './reducers/newsReducer';
import dialogsReducer from './reducers/dialogsReducer';
import messagesReducer from './reducers/messagesReducers'
let reducers = combineReducers({
  accountReducer,
  settingsReducer,
  registrationReducer,
  signUpReducer,
  subscribersPageReducer,
  subscribtionReducer,
  searchReducer,
  settingsReducer,
  newsReducer,
  dialogsReducer,
  messagesReducer
})

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;
