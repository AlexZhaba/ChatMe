import React from 'react';

let SettingsPage = (props) => {
  debugger;
  return (
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
                                <input type='text' placeholder='Firstname' value={props.first_name} onChange={(event) => props.setFirstName(event.target.value)}/>
                            </div>
                            <div className='input-content'>
                                <input type='text' placeholder='Lastname' value={props.last_name} onChange={(event) => props.setLastName(event.target.value)}/>
                            </div>
                            <div className='input-content'>
                                <input type='text' placeholder='password' value={props.password} onChange={(event) => props.setPassword(event.target.value)}/>
                            </div>
                            <div className='input-content'>
                                <input type='text' placeholder='Username' value={props.username} onChange={(event) => props.setUsername(event.target.value)}/>
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
                              <div className='name-content'>
                                  Avatar
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className='right-block-set'>
                      <div className='section-block'>

                          <div className='section-content'>
                              <div className='input-content'>
                                  <input type='text' placeholder='Status' value={props.status} onChange={(event) => props.setStatus(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='Birthday' value={props.birthday} onChange={(event) => props.setBirthday(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='Country' value={props.country} onChange={(event) => props.setCountry(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='text' placeholder='About' value={props.about} onChange={(event) => props.setAbout(event.target.value)}/>
                              </div>
                              <div className='input-content'>
                                  <input type='file'/>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
              <div className='button-accept' onClick={props.thunk_acceptSettings}>
                Accept
              </div>
          </div>
      </div>

  )
}

export default SettingsPage;