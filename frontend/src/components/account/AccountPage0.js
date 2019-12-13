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
                <div className='top-content'>
                <div className='sidebar-menu-block'>
                  My profile
                  settings
                </div>
                <div className='main-profile-block'>
                  <div className='left-profile-block'>
                    <div className='profile-image-block'>
                    <img src='https://st.kp.yandex.net/im/kadr/2/5/7/kinopoisk.ru-Dmitriy-Nagiev-2574443.jpg'/>
                    </div>
                  </div>
                  <div className='right-profile-block'>
                    <div className='profile-info-block'>
                      <div className='top-info'>
                        <div className='profile-name-and-surname'>
                          {props.user.first_name} {props.user.last_name}
                          </div>
                          {(props.myAccount) ?
                            <div>Это мой аккаунт!</div> : <div>Это не мой аккаунт!</div>}
                          {(props.isAuthenticated ? <div>Я авторизован</div> : <div>Я не авторизован</div>)}
                        </div>
                    <div className='bottom-info'>
                      LIKE POST
                    </div>
                    </div>
                    <div className='extra-content'>
                    </div>
                  </div>
                </div>
                </div>
            </div>
            {/* <Footer/> */}
          </div>
          }
        </div>
      )
}
export default AccountPage;
