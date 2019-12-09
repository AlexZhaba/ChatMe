import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';

import RegistrationPage from './components/registration/RegistrationPage';
import AccountPage from './components/account/AccountPage';
import SignUpPage from './components/signup/SignUpPage';
import { withRouter } from "react-router";
class App extends Component {
  render() {
    return (
      <div>
        <Route
          path = '/registration'
          render = { (props) => <RegistrationPage {...props}/> }
        />
        <Route
          path = '/account/:id'
          render = { (props) => <AccountPage {...props}/>}
        />
        <Route
          path = '/signup'
          render = { (props) => <SignUpPage {...props}/>}
        />
      </div>
    );
  }
}

export default withRouter(App);
