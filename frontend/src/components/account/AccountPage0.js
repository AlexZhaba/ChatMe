import React from 'react';
import axios from 'axios';
import Header from '../header/Header'
import './AccountPage.css'
import Footer from '../footer/Footer'
//import { withRouter } from "react-router";

let AccountPage = (props) => {
      console.log('AccountPageProps = ', props);
      return (
      <div>
      {props.notFound ?
          <div> NOT FOUND </div>
            :
          <div>
            <Header
                userAuthenticatedId = {props.userAuthenticatedId}
                isAuthenticated = {props.isAuthenticated}
                user = {props.user}
                logout={props.logout}
              />
              <div className='account-wrapper'>
                {props.user.first_name} {props.user.last_name}
                {(props.myAccount) ?
                  <div>Это мой аккаунт!</div> : <div>Это не мой аккаунт!</div>}
              </div>
            <Footer/>
          </div>
          }
        </div>
      )
}
export default AccountPage;
