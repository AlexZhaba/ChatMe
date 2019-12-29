import axios from 'axios';

const SET_SETT_IS_AUTHENTICATED = 'SET_SETT_IS_AUTHENTICATED';
const SET_SETT_USER_AUTHENTICATED_ID = 'SET_SETT_USER_AUTHENTICATED_ID';
const SET_SETT_FIRST_NAME = 'SET_SETT_FIRST_NAME';
const SET_SETT_LAST_NAME = 'SET_SETT_LAST_NAME';
const SET_SETT_PASSWORD = 'SET_SETT_PASSWORD';
const SET_SETT_USERNAME = 'SET_SETT_USERNAME';

const SET_SETT_STATUS = 'SET_SETT_STATUS';
const SET_SETT_BIRTHDAY = 'SET_SETT_BIRTHDAY';
const SET_SETT_COUNTRY = 'SET_SETT_COUNTRY';
const SET_SETT_ABOUT = 'SET_SETT_ABOUT';
const SET_SETT_AVATAR_URL = 'SET_SETT_AVATAR_URL';
const SET_SETT_DATE = 'SET_SETT_DATE';

const MY_IP = require('./../../../config').MY_IP;
let initialState = {
  isAuthenticated: false,
  userAuthenticatedId: '',
  first_name: '',
  last_name: '',
  password: '',
  username: '',
  status: '',
  birthday: '',
  country: '',
  about: '',
  avatarURL: '',
  date: ''
}

const settingsReducer = (state = initialState, action) => {
  debugger;
  switch (action.type) {
    case SET_SETT_USER_AUTHENTICATED_ID: {
      return {...state, userAuthenticatedId: action.userAuthenticatedId}
    }
    case SET_SETT_IS_AUTHENTICATED: {
      return {...state, isAuthenticated: action.isAuthenticated}
    }
    case SET_SETT_FIRST_NAME: {
      return {...state, first_name: action.first_name}
    }
    case SET_SETT_LAST_NAME: {
      return {...state, last_name: action.last_name}
    }
    case SET_SETT_PASSWORD: {
      return {...state, password: action.password}
    }
    case SET_SETT_USERNAME: {
      return {...state, username: action.username}
    }
    case SET_SETT_STATUS: {
      return {...state, status: action.status}
    }
    case SET_SETT_BIRTHDAY: {
      return {...state, birthday: action.birthday}
    }
    case SET_SETT_COUNTRY: {
      return {...state, country: action.country}
    }
    case SET_SETT_ABOUT: {
      return {...state, about: action.about}
    }
    case SET_SETT_AVATAR_URL: {
      return {...state, avatarURL: action.avatarURL}
    }
    case SET_SETT_DATE: {
      return {...state, date: action.date}
    }
    default:
        return state;
  }
}


export default settingsReducer;

export const setUserAuthenticatedIdAC = (userAuthenticatedId) => ({type: SET_SETT_USER_AUTHENTICATED_ID, userAuthenticatedId});
export const isAuthenticatedAC = (isAuthenticated) => ({type: SET_SETT_IS_AUTHENTICATED, isAuthenticated});

export const setFirstNameAC = (first_name) => ({type: SET_SETT_FIRST_NAME, first_name});
export const setLastNameAC = (last_name) => ({type: SET_SETT_LAST_NAME, last_name});
export const setPasswordAC = (password) => ({type: SET_SETT_PASSWORD, password});
export const setUsernameAC = (username) => ({type: SET_SETT_USERNAME, username});

export const setStatusAC = (status) => ({type: SET_SETT_STATUS, status});
export const setBirthdayAC = (birthday) => ({type: SET_SETT_BIRTHDAY, birthday});
export const setCountryAC = (country) => ({type: SET_SETT_COUNTRY, country});
export const setAboutAC = (about) => ({type: SET_SETT_ABOUT, about});
export const setDateAC = (date) => ({type: SET_SETT_DATE, date});
export const setAvatarURL = (avatarURL) => ({type:SET_SETT_AVATAR_URL, avatarURL});

export const thunk_getAllInfoAuthenticatedUser = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/getAllInfoAuthenticatedUser`, {
      withCredentials: true
    }).then(data => {
      debugger;
      // dispatch(isAuthenticatedAC(data.data.isAuthenticated));
      // dispatch(setUserAuthenticatedIdAC(data.data.userAuthenticatedId));
      if (data.data.errorCode == 1) {
        dispatch(isAuthenticatedAC(false));
      } else {
        dispatch(isAuthenticatedAC(true));
        dispatch(setUserAuthenticatedIdAC(data.data.user.email));
        dispatch(setFirstNameAC(data.data.user.first_name));
        dispatch(setLastNameAC(data.data.user.last_name));
        dispatch(setPasswordAC(data.data.user.password));
        dispatch(setUsernameAC(data.data.user.email));
        dispatch(setStatusAC(data.data.user.status));
        dispatch(setBirthdayAC(data.data.user.datebirthday));
        dispatch(setCountryAC(data.data.user.country));
        dispatch(setAboutAC(data.data.user.about));
        //dipatch()
        console.log(data);
      }
    })
  }
}
export const thunk_logout = () => {
  return (dispatch) => {
    axios.get(`http://${MY_IP}:5003/api/logout`,{
      withCredentials: true
    }).then((answer) => {
        console.log('answer = ',answer.data);
        dispatch(isAuthenticatedAC(false));
      }
    )
  }
}

export const thunk_acceptSettings = () => {
  return (dispatch, getState) => {
    let data = {
      first_name: getState().settingsReducer.first_name,
      last_name: getState().settingsReducer.last_name,
      password: getState().settingsReducer.password,
      username: getState().settingsReducer.username,
      status: getState().settingsReducer.status,
      birthday: getState().settingsReducer.birthday,
      country: getState().settingsReducer.country,
      about: getState().settingsReducer.about
    };
    axios(`http://${MY_IP}:5003/api/acceptSettings`, {
      method: "post",
      data: data,
      withCredentials: true
    }).then(data => {
      alert('All good!')
    })
  }
}

export const thunk_UploadImage = (selectedFile) => {
  return (dispatch) => {
    const data = new FormData();
    data.append('file', selectedFile);
    axios(`http://${MY_IP}:5003/api/uploadAvatar`,{
      data: data,
      withCredentials: true,
      method: 'post'
    }).then(data => {
      //alert(data.data.message);
      dispatch(setDateAC(Date.now()));
    });
  }
}
