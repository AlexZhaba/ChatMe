import React from 'react';
import {NavLink} from 'react-router-dom';
import './sidebarStyle.css';
let Sidebar = (props) => {
    return (
        <div className='sidebar-menu-block'>
        <NavLink to={`/account/${props.userAuthenticatedId}`}><div >My Profile</div></NavLink>
        <NavLink to='/news'><div>News</div></NavLink>
        <NavLink to='/search'><div>Search</div></NavLink>
        <NavLink to='/settings'><div>Settings</div></NavLink>

        <NavLink to='/subscribers'><div>Subscribers</div></NavLink>
        <NavLink to='/subscribtions'><div>Subscribtion</div></NavLink>
      </div>
    );
};


export default Sidebar;
