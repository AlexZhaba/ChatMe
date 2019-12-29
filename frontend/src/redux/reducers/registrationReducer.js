import axios from 'axios';

const UPDATE_INPUT_NAME = 'UPDATE_INPUT_NAME';
const UPDATE_INPUT_SURNAME = 'UPDATE_INPUT_SURNAME';
const UPDATE_INPUT_EMAIL = 'UPDATE_INPUT_EMAIL';
const UPDATE_INPUT_PASSWORD = 'UPDATE_INPUT_PASSWORD';
const UPDATE_ACTION_NEWS = 'UPDATE_ACTION_NEWS';
const UPDATE_SHOW = 'UPDATE_SHOW';
const UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL';
const DISCHARGE_ACCOUNT_PAGE = 'DISCHARGE_ACCOUNT_PAGE';

const MY_IP = require('./../../../config').MY_IP;
let initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  actionNews: '',
  show: true,
  redirectURL: ''
};

let registrationReducer = (state = initialState, action) => {
//  console.log(action.type);
  switch (action.type) {
    case UPDATE_INPUT_NAME: {
      return {
        ...state,
        name: action.name
      }
    }
    case UPDATE_INPUT_SURNAME: {
      return {
        ...state,
        surname: action.surname
      }
    }
    case UPDATE_INPUT_EMAIL: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_INPUT_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case UPDATE_ACTION_NEWS: {
      return {
        ...state,
        actionNews: action.actionNews
      }
    }
    case UPDATE_SHOW: {
      return {
        ...state,
        show: action.show
      }
    }
    case UPDATE_REDIRECT_URL: {
      return {
        ...state,
        redirectURL: action.redirectURL
      }
    }
    case DISCHARGE_ACCOUNT_PAGE: {
      return initialState;
    }
    default:
      return state;
  }
}


export default registrationReducer;

export const updateInputNameAC = (name) => ({type: UPDATE_INPUT_NAME, name});
export const updateInputSurnameAC = (surname) => ({type: UPDATE_INPUT_SURNAME, surname});
export const updateInputEmailAC = (email) => ({type: UPDATE_INPUT_EMAIL, email});
export const updateInputPasswordAC = (password) => ({type: UPDATE_INPUT_PASSWORD, password});
export const updateActionNewsAC = (actionNews) => ({type: UPDATE_ACTION_NEWS, actionNews});
export const updateShowAC = (show) => ({type: UPDATE_SHOW, show});
export const updateRedirectURLAC = (redirectURL ) => ({type: UPDATE_REDIRECT_URL, redirectURL});
export const dischargeAccountPageAC = () => ({type: DISCHARGE_ACCOUNT_PAGE});

export const thunk_addForm = () => {
  return (dispatch, getState) => {
    console.log('ЩАС БУДЕТ ДЖЕЛАТЬСЯ ЗАПРОС!');
    axios.post(`http://${MY_IP}:5003/api/registration`, {
      firstName: getState().registrationReducer.name,
      lastName: getState().registrationReducer.surname,
      username: getState().registrationReducer.email,
      password: getState().registrationReducer.password
    }).then(function (newValue) {
      console.log('newValue = ',newValue);
      dispatch(updateRedirectURLAC('/signup'));
      dispatch(updateActionNewsAC(newValue.data.data));
      if (newValue.data.data == 'User was created') dispatch(updateShowAC(false));
      console.log('newState = ', getState());
      //this2.setState({actionNews: newValue.data.data, show: false, redirectURL: '/signup'});
    })
  }
}
