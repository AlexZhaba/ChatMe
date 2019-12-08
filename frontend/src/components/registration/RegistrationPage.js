import React, {Component} from 'react';
import axios from 'axios';
import './RegistrationPage.css';
import Header from '../header/Header'
import Redux from 'redux'
import React_redux from 'react-redux';
class RegistrationPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      surname: '',
      email: '',
      password: '',
      actionNews: '',
      show: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.addForm = this.addForm.bind(this);
  }

  handleChange(type, event) {
    //console.log('type =',event,' ',type);
    switch (type) {
      case 1:
        this.setState({name: event.target.value});
      //  console.log('ХУЕВО');
        break;
      case 2:
        this.setState({surname: event.target.value});
    //    console.log('ХУЕВО');

        break;
      case 3:
        this.setState({email: event.target.value});
      //  console.log('ХУЕВО');
        break;
      case 4:
        this.setState({password: event.target.value});
        break;
      default:
      //  console.log('ХУЕВО');
        break;

    }
    this.setState({value: event.target.value});
  }
  componentDidMount() {
    console.log('Я ДЕЛАЮ ЗАПРОС!');
    axios.get('http://localhost:5003/api/isAuthenticated', {
      withCredentials: true
    }).then((answer) => {
      console.log(answer.data);
      if (answer.data.errorCode == 1) {
        this.setState({show: false});
      } else this.setState({show : true})
    });
  }
  addForm() {
    let this2 = this;
    console.log(this2.state);
    axios.post('http://localhost:5003/api/registration', {
      firstName: this2.state.name,
      lastName: this2.state.surname,
      username: this2.state.email,
      password: this2.state.password
    }).then(function (newValue) {
      console.log('newValue = ',newValue);
      this2.setState({actionNews: newValue.data.data});
    })
  }
  render() {
    if (this.state.show){
      return (
        <div>
        <Header/>
        <div className='wrapper'>

          <div className='main-block-registration'>
            <div className='main-name'>
              РЕГИСТРАЦИЯ
            </div>
            <div className='actionNews'>
               {this.state.actionNews}
            </div>

            <div className = 'block-form'>
             <input type='text' placeholder ='Имя' className='pole' value={this.state.name} onChange={(event) => this.handleChange(1, event)} />
            </div>

            <div className = 'block-form'>
               <input type='text' placeholder ='Фамилия' className='pole' value={this.state.surname} onChange={(event) => this.handleChange(2, event)} />
            </div>

            <div className = 'block-form'>
               <input type='text' placeholder ='email' className='pole' value={this.state.email} onChange={(event) => this.handleChange(3, event)} />
            </div>

            <div className = 'block-form'>
              <input type='password' placeholder ='Пароль' className='pole' value={this.state.password} onChange={(event) => this.handleChange(4, event)} />
            </div>
            <div className='block-button-registration'>
              <button className ='registration-button' onClick = {this.addForm}>Зарегистрироваться</button>
            </div>
        </div>
      </div>
      </div>
      );
    } else {
      return (
        <div>Пользователь уже зарегистрирован!</div>
      )
    }
  }
}

export default RegistrationPage;
