import React from 'react';
import './HeaderStyles.css'
import {NavLink} from 'react-router-dom'
// let Header = (props) => {
//   if (props.user) {
//     let logo = 'https://bonuspark.ru/logo/default.png';
//     let clickToHeaderProfile = () => {
//     }
//     return (
//         <div className='main-header-block'>
//             LOGO
//           <div className='ChatME-block'>
//             <div>
//               <b>ChatME</b>
//             </div>
//           </div>
//           <div className='profile-button-header'>
//             <img src={logo}/>
//             {/* <NavLink to='/signup'>{props.user.first_name}</NavLink> */}
//             <div onClick={clickToHeaderProfile}>
//               {props.user.first_name}
//             </div>
//           </div>
//       </div>
//     )
//   }else {
//     return (
//       <div className='main-header-block'>
//         <div>
//           LOGO
//         </div>
//         <div>
//           MAIN CORE
//         </div>
//         <div>
//           <NavLink to='/signup'>Вход</NavLink>
//         </div>
//       </div>
//     )
//   };
// }

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
               LOGO
             <div className='ChatME-block'>
               <div>
                 <b>ChatME</b>
               </div>
             </div>
             <div className='profile-button-header'>
               <img src={logo}/>
               {/* <NavLink to='/signup'>{props.user.first_name}</NavLink> */}
               <div onClick={clickToHeaderProfile}>
                 Мой профиль
               </div>
               {this.state.show ? <div className='addMenuHeader'>
                 <button onClick={this.props.logout}>Выйти</button>
                 <NavLink to={AuthenticatedUserURL}>Мой профиль</NavLink>
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
