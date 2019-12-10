import axios from 'axios'

const SET_USER = 'SET_USER';
const SET_URL_ADRESS = 'SET_URL_ADRESS';
const MY_ACCOUNT = 'MY_ACCOUNT';
const SET_USER_AUTHENTICATED_ID = 'SET_USER_AUTHENTICATED_ID';
const IS_AUTHENTICATED = 'IS_AUTHENTICATED';
const NOT_FOUND = 'NOT_FOUND';

let initialState = {
  isAuthenticated: false,
  myAccount: false,
  notFound: false,
  user: {},
  userAuthenticatedId: 0,
  URLAdress: '/account'
};
//          REDUCER
const accountReducer = (state = initialState, action) => {
  console.log('type = ' + action.type);
  switch(action.type) {
    case SET_USER: {
      return {...state, user: action.user};
    }
    case SET_URL_ADRESS: {
      return {...state, URLAdress : action.URLAdress}
    }
    case SET_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case MY_ACCOUNT: {
      return {...state, myAccount: action.myAccount}
    }
    case NOT_FOUND: {
      return {...state, notFound : action.notFound}
    }
    case IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    default:
      return state;
  }
}
export default accountReducer;

//                 ACTION CREATORS
const setUserAC = (user) => ({type: SET_USER, user});
const setURLAdressAC = (URLAdress) => ({type: SET_URL_ADRESS, URLAdress});
const myAccountAC = (myAccount) => ({type: MY_ACCOUNT, myAccount});
const setUserAuthenticatedIdAC = (UserAuthenticatedId) => ({type: SET_USER_AUTHENTICATED_ID, UserAuthenticatedId});
const isAuthenticatedAC = (isAuthenticated) => ({type: IS_AUTHENTICATED, isAuthenticated});
const notFoundAC = (notFound) => ({type: NOT_FOUND, notFound});

export {setUserAC};
export {setURLAdressAC};
export {myAccountAC};
export {setUserAuthenticatedIdAC};
export {isAuthenticatedAC};
export {notFoundAC};


// THUNKS
export const thunk_GetAccountInfo = (id) => {
  return (dispatch) => {
    axios.get(`http://localhost:5003/api/account/${id}`, {
      withCredentials: true
    }).then(response => {
      if (response.data.errorCode != 0) {
        console.log('НАДА NOT FOUND! ',);
        dispatch(notFoundAC(true));
      } else {
        console.log('ДАТА ПРИШЛА! ', response.data);
        console.log('----- ', isAuthenticatedAC(response.data.isAuthenticated));
        dispatch(isAuthenticatedAC(response.data.isAuthenticated));
        dispatch(myAccountAC(response.data.myAccount));
        dispatch(setUserAC(response.data.user));
        dispatch(setUserAuthenticatedIdAC(response.data.userAuthenticatedId));
        dispatch(notFoundAC(false));
       }
    });
  }
}
