import {useEffect} from 'react';
import React from 'react';
import {connect} from 'react-redux';
import Header from './../header/Header';
import {Redirect} from 'react-router-dom';
import './settingsStyles.css'
import {
  thunk_logout,
  thunk_getAllInfoAuthenticatedUser,
  setFirstNameAC,
  setLastNameAC,
  setPasswordAC,
  setUsernameAC,
  setStatusAC,
  setBirthdayAC,
  setCountryAC,
  setAboutAC
} from './../../redux/reducers/settingsReducer';
import Sidebar from './../sidebar/sidebar'


let SettingsPageContainer = (props) => {
  useEffect(() => {
    props.thunk_getAllInfoAuthenticatedUser();
  },[]);
  debugger;
  return (
    <div>
      <Header
        userAuthenticatedId = {props.userAuthenticatedId}
        isAuthenticated = {props.isAuthenticated}
        logout={props.thunk_logout}
      />
    <Sidebar/>
      <div className='settings-wrapper'>
            <div className='settings-article'>
                USER SETTINGS
            </div>
            <div className='main-block-settings'>
              <div className='wrapper-main'>
                  <div className='name-wrapper'>
                    User
                  </div>
                  <div className='left-block-set'>
                      <div className='section-block'>
                          <div className='section-content'>
                              <div className='name-content'>
                                  Firstname
                              </div>

                              <div className='name-content'>
                                  Lastname
                              </div>
                              <div className='name-content'>
                                  Password
                              </div>
                              <div className='name-content'>
                                  Username
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='right-block-set'>
                      <div className='section-block'>

                          <div className='section-content'>
                              <div className='input-content'>
                                  <input type='text' placeholder='Firstname' value={props.first_name} onChange={(event) => props.setFirstNameAC(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='Lastname' value={props.last_name} onChange={(event) => props.setLastNameAC(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='password' value={props.password} onChange={(event) => props.setPasswordAC(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='Username' value={props.username} onChange={(event) => props.setUsernameAC(event.target.value)}/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
                <div className='wrapper-main'>
                  <div className='name-wrapper'>
                    Profile
                  </div>
                    <div className='left-block-set'>
                        <div className='section-block'>
                            <div className='section-content'>
                                <div className='name-content'>
                                    Status
                                </div>
                                <div className='name-content'>
                                    Birthday
                                </div>
                                <div className='name-content'>
                                    Country
                                </div>
                                <div className='name-content'>
                                    About
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='right-block-set'>
                        <div className='section-block'>

                            <div className='section-content'>
                                <div className='input-content'>
                                    <input type='text' placeholder='Status' value={props.status} onChange={(event) => props.setStatusAC(event.target.value)}/>
                                </div>
                                <div className='input-content'>
                                    <input type='text' placeholder='Birthday' value={props.birthday} onChange={(event) => props.setBirthdayAC(event.target.value)}/>
                                </div>
                                <div className='input-content'>
                                    <input type='text' placeholder='Country' value={props.country} onChange={(event) => props.setCountryAC(event.target.value)}/>
                                </div>
                                <div className='input-content'>
                                    <input type='text' placeholder='About' value={props.about} onChange={(event) => props.setAboutAC(event.target.value)}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='button-accept'>
                  Accept
                </div>
            </div>
        </div>
    </div>
  )
}

let mapStateToProps = (state) => {
  return {
    userAuthenticatedId: state.settingsReducer.userAuthenticatedId,
    isAuthenticated: state.settingsReducer.isAuthenticated,
    first_name:state.settingsReducer.first_name,
    last_name: state.settingsReducer.last_name,
    password: state.settingsReducer.password,
    username: state.settingsReducer.username,
    status: state.settingsReducer.status,
    birthday: state.settingsReducer.birthday,
    country: state.settingsReducer.country,
    about: state.settingsReducer.about
  }
}

export default connect(mapStateToProps, {
  thunk_logout, thunk_getAllInfoAuthenticatedUser,
  setFirstNameAC, setLastNameAC, setPasswordAC, setUsernameAC,
  setStatusAC, setBirthdayAC, setCountryAC, setAboutAC
})(SettingsPageContainer);
