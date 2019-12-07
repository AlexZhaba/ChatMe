import React from 'react';
import axios from 'axios';
import Header from '../header/Header'
import './AccountPage.css'
import Footer from '../footer/Footer'
import { withRouter } from "react-router";

class AccountPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
      myAccount: false,
      notFound: false,
      user: {},
      userAuthenticatedId: 0,
      URLAdress: '/account'
    };
    this.logout = this.logout.bind(this);
    //this.componentWillUpdate = this.shouldComponentUpdate.bind(this);
  }
  logout() {
    axios.get('http://localhost:5003/api/logout',{
      withCredentials: true
    }).then(function (answer) {
        console.log('answer = ',answer.data);
        this.setState({show: false})
      }.bind(this)
    )
  }

  // componentDidMount() {
  //   console.log('match = ',this.props);
  //   axios.get('http://localhost:5003/api/account', {
  //     withCredentials: true
  //   }).then(function (answer) {
  //     if (answer.data.errorCode == 1) {
  //       this.setState({show: false});
  //     } else {
  //       console.log('this = ',this);
  //       //this.setState({show: true});
  //     //  this.setState({user: answer.data.user})
  //       axios.post('http://localhost:5003/api/getuser',{email: answer.data.user.email}).then((answer) => {
  //         //console.log('this2 = ',this);
  //         //console.log('answer = ', answer.data);
  //         console.log('data = ' + answer.data);
  //         this.setState({show: true});
  //         this.setState({user: answer.data});
  //     //    console.log('this.state.user = ',this.state.user);
  //       })
  //     }
  //   }.bind(this))
  //}
  requestToAccount() {
    console.log(this.props.match.params.id)
    //let stringRequest = 'http://localhost:5003/api/account/' + this.props.match.
    axios.get(`http://localhost:5003/api/account/${this.props.match.params.id}`, {
      withCredentials: true
    }).then((response) => {
      if (response.data.errorCode != 0) {
        this.setState({notFound : true});
      } else {
        console.log('ДАТА ПРИШЛА!');
        this.setState({isAuthenticated: response.data.isAuthenticated});
        this.setState({myAccount: response.data.myAccount});
        this.setState({user: response.data.user});
        this.setState({userAuthenticatedId: response.data.userAuthenticatedId});
        this.setState({URLAdress: `/account${response.data.user.email}`})
      }
    });
  }
  componentDidMount() {
    this.requestToAccount();
  }
  render() {
    if (this.state.notFound) {
      return (
        <div>
          NOT FOUND
        </div>
      )
    }
    else {
      return (
        <div>
          <Header
              userAuthenticatedId = {this.state.userAuthenticatedId}
              isAuthenticated = {this.state.isAuthenticated}
              user = {this.state.user}
              logout={this.logout}
              accountsPageThis={this}
            />
            <div className='account-wrapper'>
              {this.state.user.first_name} {this.state.user.last_name}
              {(this.state.myAccount) ?
                <div>Это мой аккаунт!</div> : <div>Это не мой аккаунт!</div>}
            </div>
          <Footer/>
        </div>
        )
      }
    }
}
export default AccountPage;
