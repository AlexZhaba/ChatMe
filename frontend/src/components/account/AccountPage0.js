import React from 'react';
import axios from 'axios';
import Header from '../header/Header'
import './AccountPage.css'
import Footer from '../footer/Footer'
//import { withRouter } from "react-router";
import MyPosts from './MyPosts';
import NewPost from './NewPost';
import {NavLink} from 'react-router-dom';
import Sidebar from '../sidebar/sidebar';

let AccountPage = (props) => {
      console.log('AccountPageProps = ', props);
      return (
      <div>
      {props.notFound ?
          <div> NOT FOUND </div>
            :
          <div>
            <Sidebar/>
            <Header
                userAuthenticatedId = {props.userAuthenticatedId}
                isAuthenticated = {props.isAuthenticated}
                logout={props.logout}
              />
              <div className='account-wrapper'>
                <div className='top-content'>
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
                          
                          {props.user.status}
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
                                {props.user.country}
                              </div>
                              <div className='child-value-block'>
                                {props.user.datebirthday}
                              </div>
                            </div>
                          </div>
                          {((props.userAuthenticatedId) && (props.userAuthenticatedId != props.user.email)) ?
                                <div>
                                {props.following ?
                                <div onClick={() => props.thunk_setFollowing(!props.following)}className='button-subscribe'>
                                  UNSUBSCRIBE
                                </div>
                                :
                                <div onClick={() => props.thunk_setFollowing(!props.following)} className='button-subscribe'>
                                  SUBSCRIBE
                                </div>
                                }
                                </div>
                            : <div></div>
                          }

                        </div>
                    <div className='bottom-info'>
                      <div className='bottom-block'>
                        <div className='value-bottom'>
                          {props.user.subscriberscount}
                        </div>
                        <div className='name-bottom'>
                          subscriber
                        </div>

                      </div>
                      <div className='bottom-block'>
                        <div className='value-bottom'>
                          {props.user.subscribtionscount}
                        </div>
                        <div className='name-bottom'>
                          subscribtion
                        </div>

                      </div>
                      <div className='bottom-block'>
                        <div className='value-bottom'>
                          {props.user.likescount}
                        </div>
                        <div className='name-bottom'>
                          likes
                        </div>

                      </div>
                      <div className='bottom-block'>
                        <div className='value-bottom'>
                          {props.user.postscount}
                        </div>
                        <div className='name-bottom'>
                          posts
                        </div>

                      </div>
                    </div>
                    </div>
                    <div className='extra-content'>
                    </div>
                  </div>
                </div>
                </div>
                <div className='bottom-content'>
                  { props.user.email == props.userAuthenticatedId ?
                  <NewPost
                    newPostValue={props.newPostValue}
                    updateNewPostValue = {props.updateNewPostValue}

                    thunk_addNewPost = {props.thunk_addNewPost}
                    />
                  :
                  <div></div>
                  }
                  <MyPosts
                    posts = {props.posts}
                  />

                </div>
            </div>
            {/* <Footer/> */}
          </div>
          }
        </div>
      )
}
export default AccountPage;
