import React from 'react';
import axios from 'axios';
import {NavLink, Redirect} from 'react-router-dom'
import Header from '../header/Header'

//import './signUpPage.css'
let SignUpPage0 = (props) => {
  console.log('PresentationalProps = ', props)
    if (props.show) {
        return (
          <div>
            <Header/>
          <div className='wrapper'>
            <div className='main-block-registration'>
              <div className='main-name'>
                ВХОД
              </div>
              <div className='actionNews'>
               {props.actionNews}
              </div>
              <div className = 'block-form'>
                 <input type='text' placeholder ='email' className='pole' value={props.email} onChange={(event) => props.updateSignUpEmail(event.target.value)} />
              </div>

              <div className = 'block-form'>
                 <input type='text' placeholder ='Пароль' className='pole' value={props.password} onChange={(event) => props.updateSignUpPassword(event.target.value)} />
              </div>
              <div className='block-button-registration'>
                <button className ='registration-button' onClick = {props.addForm}>Войти</button>
              </div>
              <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        </div>
      </div>
        );
    } else {
      let accountURL = `/account/${props.email}`;
      props.dischargeSignUpPage();
      return (
        <Redirect to={accountURL}/>
      )
    }
}
export default SignUpPage0;
