import axios from 'axios';

const UPDATE_SIGN_UP_EMAIL = 'UPDATE_SIGN_UP_EMAIL';
const UPDATE_SIGN_UP_PASSWORD = 'UPDATE_SIGN_UP_PASSWORD';
const UPDATE_SIGN_UP_ACTION_NEWS = 'UPDATE_SIGN_UP_ACTION_NEWS';
const UPDATE_SIGN_UP_SHOW = 'UPDATE_SIGN_UP_SHOW';
const DISCHARGE_SIGN_UP_PAGE = 'DISCHARGE_SIGN_UP_PAGE';

let initialState = {
  actionNews : '',
  email: '',
  password: '',
  show: true,
  actionNews: ''
};

 const signUpReducer = (state = initialState, action) => {
  console.log('action.type = ',action.type);
  switch(action.type) {
    case UPDATE_SIGN_UP_EMAIL: {
      return {
        ...state,
        email: action.email
      }
    }
    case UPDATE_SIGN_UP_PASSWORD: {
      return {
        ...state,
        password: action.password
      }
    }
    case UPDATE_SIGN_UP_ACTION_NEWS: {
      return {
        ...state,
        actionNews: action.actionNews
      }
    }
    case UPDATE_SIGN_UP_SHOW: {
      return {
        ...state,
        show: action.show
      }
    }
    case DISCHARGE_SIGN_UP_PAGE: {
      return initialState;
    }
    default:
      return state;
  }
}

export default signUpReducer;

export const updateSignUpEmailAC = (email) => ({type: UPDATE_SIGN_UP_EMAIL, email});
export const updateSignUpPasswordAC = (password) => ({type: UPDATE_SIGN_UP_PASSWORD, password});
export const updateSignUpActionNewsAC = (actionNews) => ({type: UPDATE_SIGN_UP_ACTION_NEWS, actionNews});
export const updateSignUpShowAC = (show) => ({type: UPDATE_SIGN_UP_SHOW, show});
export const dischargeSignUpPage = () => ({type: DISCHARGE_SIGN_UP_PAGE});

export const thunk_addForm = () => {
  return (dispatch, getState) => {
    var dataInJSON = {
      "username" : getState().signUpReducer.email,
      "password": getState().signUpReducer.password
    };
    axios('http://localhost:5003/api/signup',{
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then(function (newValue) {
      console.log('newValue = ',newValue);
      if (newValue.data.errorCode == 0) {
        dispatch(updateSignUpShowAC(false));
        //dispatch(updateSignUpEmail())
        // this2.setState({show: false, username: newValue.data.username});
      } else dispatch(updateSignUpActionNewsAC(newValue.data.data));
      //this2.setState({actionNews: newValue.data.data});
    });
  }
}
