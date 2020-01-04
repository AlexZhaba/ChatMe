import React from 'react';
import {NavLink} from 'react-router-dom';
import './sidebarStyle.css';
let Sidebar = (props) => {
    return (
        <div className='sidebar-menu-block'>
        <NavLink to={`/account/${props.userAuthenticatedId}`}>
        <div>
          <img className='img-profile' src='https://image.flaticon.com/icons/png/512/69/69524.png'/>
        <div>My Profile</div>
          </div>
        </NavLink>
        <NavLink to='/news'><div>
          <img className='img-profile' src='https://image.flaticon.com/icons/png/512/14/14711.png'/>
        <div>News</div>
        </div></NavLink>
        <NavLink to='/search'><div>
            <img className='img-profile' src='https://image.flaticon.com/icons/png/512/64/64673.png'/>
          <div>Search</div>
        </div></NavLink>
        <NavLink to='/settings'><div>
            <img className='img-profile' src='https://image.flaticon.com/icons/png/512/60/60473.png'/>
          <div>Settings</div></div></NavLink>

        <NavLink to='/subscribers'><div>
            <img className='img-profile' src='http://cdn.onlinewebfonts.com/svg/img_509224.png'/>
          <div>Subscribers</div></div></NavLink>
        <NavLink to='/subscribtions'><div>
          <img className='img-profile' src='http://cdn.onlinewebfonts.com/svg/img_509224.png'/>
        <div>Subscribtion</div></div></NavLink>
      </div>
    );
};


export default Sidebar;
