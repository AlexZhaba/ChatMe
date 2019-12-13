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
                  {(props.myAccount) ?
                    <div>Это мой аккаунт!</div> : <div>Это не мой аккаунт!</div>}
                  {(props.isAuthenticated ? <div>Я авторизован</div> : <div>Я не авторизован</div>)}
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
                        <div className='profile-status'>
                          Ало, это Владимир Путин?
                        </div>
                          <div className='profile-about-block'>
                            <div className='name-about-block'>
                              <div className='child-name-about'>
                                Username:
                              </div>
                              <div className='child-name-about'>
                                Country:
                              </div>
                              <div className='child-name-about'>
                                Birthday:
                              </div>
                            </div>
                            <div className='value-about-block'>
                              <div className='child-value-block bold_username'>
                                {props.user.email}
                              </div>
                              <div className='child-value-block'>
                                Russia
                              </div>
                              <div className='child-value-block'>
                                27.05.2003
                              </div>
                            </div>
                          </div>
                        </div>
                    <div className='bottom-info'>
                      <div className='bottom-block'>
                        <div className='value-bottom'>
                          100
                        </div>
                        <div className='name-bottom'>
                          subscriber
                        </div>

                      </div>
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
