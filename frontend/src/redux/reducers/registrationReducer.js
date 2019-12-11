import axios from 'axios';

const UPDATE_INPUT_NAME = 'UPDATE_INPUT_NAME';
const UPDATE_INPUT_SURNAME = 'UPDATE_INPUT_SURNAME';
const UPDATE_INPUT_EMAIL = 'UPDATE_INPUT_EMAIL';
const UPDATE_INPUT_PASSWORD = 'UPDATE_INPUT_PASSWORD';
const UPDATE_ACTION_NEWS = 'UPDATE_ACTION_NEWS';
const UPDATE_SHOW = 'UPDATE_SHOW';
const UPDATE_REDIRECT_URL = 'UPDATE_REDIRECT_URL';

let initialState = {
  name: '',
  surname: '',
  email: '',
  password: '',
  actionNews: '',
  show: true,
  redirectURL: '/registration'
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


export const thunk_addForm = () => {
  return (dispatch, getState) => {
    axios.post('http://localhost:5003/api/registration', {
      firstName: getState().registrationReducer.name,
      lastName: getState().registrationReducer.surname,
      username: getState().registrationReducer.email,
      password: getState().registrationReducer.password
    }).then(function (newValue) {
      console.log('newValue = ',newValue);
      dispatch(updateActionNewsAC(newValue.data.data));
      dispatch(updateShowAC(false));
      dispatch(updateRedirectURLAC('/signup'));
      console.log('newState = ', getState());
      //this2.setState({actionNews: newValue.data.data, show: false, redirectURL: '/signup'});
    })
  }
}
