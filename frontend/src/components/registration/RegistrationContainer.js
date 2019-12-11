import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  updateInputNameAC,
  updateInputSurnameAC,
  updateInputEmailAC,
  updateInputPasswordAC,
  updateActionNewsAC,
  updateShowAC,
  updateRedirectURLAC,
  thunk_addForm
} from './../../redux/reducers/registrationReducer'
import RegistrationPage0 from './RegistrationPage0'
import Header from '../header/Header'
const RegistrationContainer = (props) => {
  console.log('Container Props = ', props);
  return (
    <RegistrationPage0
        //variables
        name = {props.name}
        surname = {props.surname}
        email = {props.email}
        password = {props.password}
        actionNews = {props.actionNews}
        show = {props.show}
        redirectURL = {props.redirectURL}

        //callbacks
        updateInputName = {props.updateInputNameAC}
        updateInputSurname = {props.updateInputSurnameAC}
        updateInputEmail = {props.updateInputEmailAC}
        updateInputPassword = {props.updateInputPasswordAC}
        updateActionNews = {props.updateInputActionNewsAC}
        updateShow = {props.updateShowAC}
        updateRedirectURL = {props.updateRedirectURLAC}
        //callbacks (thunk)
        addForm = {props.thunk_addForm}
    />
  )
}

let mapStateToProps = (state) => {
  console.log('state = ',state);
  return {
      name: state.registrationReducer.name,
      surname: state.registrationReducer.surname,
      email: state.registrationReducer.email,
      password: state.registrationReducer.password,
      actionNews: state.registrationReducer.actionNews,
      show: state.registrationReducer.show,
      redirectURL: state.registrationReducer.redirectURL
  }
}

export default connect(mapStateToProps, {updateInputNameAC, updateInputSurnameAC,
                                       updateInputEmailAC, updateInputPasswordAC,
                                       updateActionNewsAC, updateShowAC,
                                      updateRedirectURLAC, thunk_addForm})(RegistrationContainer);
