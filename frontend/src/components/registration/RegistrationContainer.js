import React, {useEffect} from 'react';
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
  dischargeAccountPageAC,
  thunk_addForm
} from './../../redux/reducers/registrationReducer'
import RegistrationPage0 from './RegistrationPage0'
import Header from '../header/Header'
const RegistrationContainer = (props) => {
  console.log('Container Props = ', props);
  useEffect(() => {
    console.log('Я ДЕЛАЮ ЗАПРОС!');
    axios.get('http://localhost:5003/api/isAuthenticated', {
      withCredentials: true
    }).then((answer) => {
      console.log(answer.data);
      if (answer.data.errorCode == 1) {
        //this.setState({show: false, redirectURL: '/account/' + answer.data.username});
        props.updateShowAC(false);
        props.updateRedirectURLAC('/account/' + answer.data.username);
      } else props.updateShowAC(true);
    });
  }, [])
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
        dischargeAccountPage = {props.dischargeAccountPageAC}
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
                                      updateRedirectURLAC, dischargeAccountPageAC, thunk_addForm})(RegistrationContainer);
