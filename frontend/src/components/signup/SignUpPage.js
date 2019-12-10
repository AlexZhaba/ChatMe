import React from 'react';
import axios from 'axios';
import {NavLink, Redirect} from 'react-router-dom'
import Header from '../header/Header'

//import './signUpPage.css'
class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      actionNews: '',
      show: true,
      username: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.addForm = this.addForm.bind(this);
  }

  handleChange(type, event) {
    //console.log('type =',event,' ',type);
    switch (type) {
      case 1:
        this.setState({email: event.target.value});
      //  console.log('ХУЕВО');
        break;
      case 2:
        this.setState({password: event.target.value});
    //    console.log('ХУЕВО');

        break;
      default:
      //  console.log('ХУЕВО');
        break;
        // axios.post('http://localhost:5003/api/signup', {
        //   withCredentials: true,
        //   username: this2.state.email,
        //   password: this2.state.password
        // })
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
        console.log('data = ', answer.data);
        this.setState({show: false, username: answer.data.username});
      } else this.setState({show : true})
    });
  }
  addForm() {
    let this2 = this;
    var dataInJSON = {
      "username" : this.state.email,
      "password": this.state.password
    };
    console.log(this2.state);
    axios('http://localhost:5003/api/signup',{
      method: "post",
      data: dataInJSON,
      withCredentials: true
    }).then(function (newValue) {
      console.log('newValue = ',newValue);
      if (newValue.data.errorCode == 0) {
        this2.setState({show: false, username: newValue.data.username});
      }
      this2.setState({actionNews: newValue.data.data});
    });

  }
  render() {
    if (this.state.show) {
        return (
          <div>
            <Header/>
          <div className='wrapper'>
            <div className='main-block-registration'>
              <div className='main-name'>
                ВХОД
              </div>
              <div className='actionNews'>
               {this.state.actionNews}
              </div>
              <div className = 'block-form'>
                 <input type='text' placeholder ='email' className='pole' value={this.state.surname} onChange={(event) => this.handleChange(1, event)} />
              </div>

              <div className = 'block-form'>
                 <input type='text' placeholder ='Пароль' className='pole' value={this.state.password} onChange={(event) => this.handleChange(2, event)} />
              </div>

              <div className='block-button-registration'>
                <button className ='registration-button' onClick = {this.addForm}>Войти</button>
              </div>
              <NavLink to='/registration'>Регистрация</NavLink>
          </div>
        </div>
      </div>
        );
    } else {
      debugger;
      let accountURL = `/account/${this.state.username}`;
      return (
        <Redirect to={accountURL}/>
      )
    }
  }
}
export default SignUpPage;
