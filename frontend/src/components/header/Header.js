import React from 'react';
import './HeaderStyles.css'
import {NavLink} from 'react-router-dom'
import axios from 'axios';
const MY_IP = require('./../../../config').MY_IP;

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  logout() {
    alert('HELLO')
    axios.get(`http://${MY_IP}:5003/api/logout`,{
      withCredentials: true
    }).then((answer) => {
        console.log('answer = ',answer.data);
      }
    )
  }
  render() {
    if ( (this.props.isAuthenticated)) {
       let logo = `http://${MY_IP}:5003/api/avatar/${this.props.userAuthenticatedId}@${Date.now()}`;
       let clickToHeaderProfile = () => {
         this.setState({show: !this.state.show});
       }
       let AuthenticatedUserURL = `/account/${this.props.userAuthenticatedId}`;
       return (
           <div className='main-header-block'>
             <div className='ChatME-block'>
               <div>
                 <b>ChatME</b>
               </div>
             </div>
             <div className='profile-button-header'>
               <img src={logo}/>
               {/* <NavLink to='/signup'>{props.user.first_name}</NavLink> */}
               <div className='Profile-header' onClick={this.props.logout}>
                  logout
               </div>
             </div>
         </div>
       )
     }else {
       return (
         <div className='main-header-block'>
           <div className='ChatME-block'>
             <div>
               <b>ChatME</b>
             </div>
           </div>

             <div className='profile-button-header'>
               {/* <img src={logo}/> */}
               <div className='Profile-header'>
                  <NavLink to='/signup'>Вход</NavLink>
               </div>
             </div>


         </div>
       )
     };
  }
}

export default Header;
