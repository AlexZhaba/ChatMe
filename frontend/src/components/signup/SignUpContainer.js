import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import SignUpPage0 from './SignUpPage0';
import {
  updateSignUpEmailAC,
  updateSignUpPasswordAC,
  updateSignUpActionNewsAC,
  updateSignUpShowAC,
  dischargeSignUpPage,
  thunk_addForm
} from '../../redux/reducers/signUpReducer'

let SignUpContainer = (props) => {
  console.log('ContainerProps = ',props.updateSignUpPasswordAC);
  useEffect(() => {
    axios.get('http://localhost:5003/api/isAuthenticated', {
      withCredentials: true
    }).then((answer) => {
      console.log(answer.data);
      if (answer.data.errorCode == 1) {
        console.log('data = ', answer.data);
        props.updateSignUpEmailAC(answer.data.username);
        props.updateSignUpShowAC(false);
        // this.setState({show: false, username: answer.data.username});
      } else props.updateSignUpShowAC(true);
    });
  },[]);
  return (
    <SignUpPage0
      //variables
      actionNews = {props.actionNews}
      email = {props.email}
      password = {props.password}
      show = {props.show}
      //callbacks
      updateSignUpEmail = {props.updateSignUpEmailAC}
      updateSignUpPassword = {props.updateSignUpPasswordAC}
      dischargeSignUpPage = {props.dischargeSignUpPage}
      //thunk_callbacks
      addForm = {props.thunk_addForm}

    />
  )
}



let mapStateToProps = (state) => {
  console.log('SignUpState = ',state);
  return {
    actionNews: state.signUpReducer.actionNews,
    email: state.signUpReducer.email,
    password: state.signUpReducer.password,
    show: state.signUpReducer.show
  }
}
// second arguments will become to (value) => dispatch(NAME_OF_ACTION_CREATOR(value))
export default connect(mapStateToProps, {updateSignUpEmailAC, dischargeSignUpPage,
            updateSignUpPasswordAC, thunk_addForm, updateSignUpShowAC})(SignUpContainer);
  