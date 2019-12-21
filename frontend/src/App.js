import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import RegistrationPage from './components/registration/RegistrationPage';
import AccountPageContainer from './components/account/AccountPageContainer';
import RegistrationContainer from './components/registration/RegistrationContainer'
import SignUpContainer from './components/signup/SignUpContainer';
import SubscriberPageContainer from './components/subcribers/SubcribersPageContainer';
import SubscribtionPageContainer from './components/subscribtion/subscribtionPageContainer';
import { withRouter } from "react-router";
class App extends Component {
  render() {
    return (
      <div>
        <Route
          path = '/registration'
          render = { (props) => <RegistrationContainer {...props}/> }
        />
        <Route
          path = '/account/:id'
          render = { (props) => <AccountPageContainer {...props}/>}
        />
        <Route
          path = '/signup'
          render = { (props) => <SignUpContainer {...props}/>}
        />
        <Route
          path='/subscribers'
          render = {(props) => <SubscriberPageContainer {...props}/>}
        />
        <Route
          path='/subscribtions'
          render = {(props) => <SubscribtionPageContainer {...props}/>}
        />
      </div>
    );
  }
}

export default withRouter(App);
