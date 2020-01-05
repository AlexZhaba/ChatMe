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
import SearchPageContainer from './components/search/SearchPageContainer'
import SettingsPageContainer from './components/settings/SettingsPageContainer';
import NewsPageContainer from './components/news/NewsPageContainer';
import DialogsPageContainer from './components/dialogs/DialogsPageContainer';
import MessagesPageContainer from './components/messages/MessagesPageContainer'
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
        <Route
          path='/search'
          render = {(props) => <SearchPageContainer {...props}/>}
        />
        <Route
          path='/settings'
          render = {(props) => <SettingsPageContainer {...props}/>}
        />
        <Route
          path='/news'
          render = {(props) => <NewsPageContainer {...props}/>}
        />
        <Route
          path='/dialogs/:id'
        render = {(props) => <MessagesPageContainer {...props}/>}
        />
      <Route
        exact path='/dialogs'
        render = {(props) => <DialogsPageContainer {...props}/>}
      />
      </div>
    );
  }
}

export default withRouter(App);
