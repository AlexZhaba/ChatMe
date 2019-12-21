import React from 'react';
import './HeaderStyles.css'
import {NavLink} from 'react-router-dom'
import Search from './../search/Search';


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    };
  }
  render() {
    if ((this.props.user) && (this.props.isAuthenticated)) {
       let logo = 'https://bonuspark.ru/logo/default.png';
       let clickToHeaderProfile = () => {
         this.setState({show: !this.state.show});
       }
       let AuthenticatedUserURL = `/account/${this.props.userAuthenticatedId}`;
       return (
           <div className='main-header-block'>
             <Search
                updateSearchText = {this.props.updateSearchText}
                searchText = {this.props.searchText}
             />
             <div className='ChatME-block'>
               <div>
                 <b>ChatME</b>
               </div>
             </div>
             <div className='profile-button-header'>
               <img src={logo}/>
               {/* <NavLink to='/signup'>{props.user.first_name}</NavLink> */}
               <div className='Profile-header'onClick={clickToHeaderProfile}>
                  Profile
               </div>
               {this.state.show ?
               <div className='addMenuHeader'>
                 <div>
                   <NavLink to={AuthenticatedUserURL}>My profile</NavLink>
                 </div>
                 <div>
                   settings
                 </div>
                 <div onClick={this.props.logout}>logout</div>

                </div> : <div> </div> }
             </div>
         </div>
       )
     }else {
       return (
         <div className='main-header-block'>
           <div>
             LOGO
           </div>
           <div>
             MAIN CORE
           </div>
           <div>
             <NavLink to='/signup'>Вход</NavLink>
           </div>
         </div>
       )
     };
  }
}

export default Header;
