import React from 'react';
import Header from '../header/Header'
import {Redirect} from 'react-router-dom'
let RegistrationPage0 = (props) => {
  console.log('РЕРЕНДЕР ',props);
  if (props.show){
    return (
      <div>
      <Header/>
      <div className='wrapper'>

        <div className='main-block-registration'>
          <div className='main-name'>
            РЕГИСТРАЦИЯ
          </div>
          <div className='actionNews'>
               {props.actionNews}
          </div>

          <div className = 'block-form'>
           <input type='text' placeholder ='Имя' className='pole' value={props.name} onChange={(event) => props.updateInputName(event.target.value)} />
          </div>

          <div className = 'block-form'>
             <input type='text' placeholder ='Фамилия' className='pole' value={props.surname} onChange={(event) => props.updateInputSurname(event.target.value)} />
          </div>

          <div className = 'block-form'>
             <input type='text' placeholder ='email' className='pole' value={props.email} onChange={(event) => props.updateInputEmail(event.target.value)} />
          </div>

          <div className = 'block-form'>
            <input type='password' placeholder ='Пароль' className='pole' value={props.password} onChange={(event) => props.updateInputPassword(event.target.value)} />
          </div>
          <div className='block-button-registration'>
            <button className ='registration-button' onClick = {props.addForm}>Зарегистрироваться</button>
          </div>
      </div>
    </div>
    </div>
    );
  } else {
    let signUpURL = `/signup`;
    props.dischargeAccountPage();
    return (
      <Redirect to={signUpURL}/>
    )
  }
}


export default RegistrationPage0;
