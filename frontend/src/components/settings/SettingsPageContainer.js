import {useEffect} from 'react';
import React from 'react';
import {connect} from 'react-redux';
import Header from './../header/Header';
import {Redirect} from 'react-router-dom';
import './settingsStyles.css'
import {
  thunk_logout,
  thunk_getAllInfoAuthenticatedUser,
  thunk_acceptSettings,
  thunk_UploadImage,
  setFirstNameAC,
  setLastNameAC,
  setPasswordAC,
  setUsernameAC,
  setStatusAC,
  setBirthdayAC,
  setCountryAC,
  setAboutAC,
  setInitialStateAC
} from './../../redux/reducers/settingsReducer';
import Sidebar from './../sidebar/sidebar'
import SettingsPage from './SettingsPage'

let SettingsPageContainer = (props) => {
  useEffect(() => {
    props.setInitialStateAC();
    props.thunk_getAllInfoAuthenticatedUser();
  },[]);
  debugger;
  return (
    <div>
      <Header
        userAuthenticatedId = {props.userAuthenticatedId}
        isAuthenticated = {props.isAuthenticated}
        logout={props.thunk_logout}
      />
      <Sidebar
        userAuthenticatedId = {props.userAuthenticatedId}
      />
    <SettingsPage
      userAuthenticatedId = {props.userAuthenticatedId}
      isAuthenticated = {props.isAuthenticated}
      first_name = {props.first_name}
      last_name = {props.last_name}
      username = {props.username}
      password = {props.password}
      status = {props.status}
      birthday = {props.birthday}
      country = {props.country}
      about = {props.about}

      setFirstName = {props.setFirstNameAC}
      setLastName = {props.setLastNameAC}
      setPassword = {props.setPasswordAC}
      setUsername = {props.setUsernameAC}
      setStatus = {props.setStatusAC}
      setBirthday = {props.setBirthdayAC}
      setCountry = {props.setCountryAC}
      setAbout =  {props.setAboutAC}
      thunk_acceptSettings = {props.thunk_acceptSettings}
      thunk_UploadImage = {props.thunk_UploadImage}
    />
    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    userAuthenticatedId: state.settingsReducer.userAuthenticatedId,
    isAuthenticated: state.settingsReducer.isAuthenticated,
    first_name:state.settingsReducer.first_name,
    last_name: state.settingsReducer.last_name,
    password: state.settingsReducer.password,
    username: state.settingsReducer.username,
    status: state.settingsReducer.status,
    birthday: state.settingsReducer.birthday,
    country: state.settingsReducer.country,
    about: state.settingsReducer.about,
    date: state.settingsReducer.date
  }
}

export default connect(mapStateToProps, {
  thunk_logout, thunk_getAllInfoAuthenticatedUser,
  setFirstNameAC, setLastNameAC, setPasswordAC, setUsernameAC,
  setStatusAC, setBirthdayAC, setCountryAC, setAboutAC, setInitialStateAC,
  thunk_acceptSettings, thunk_UploadImage
})(SettingsPageContainer);
