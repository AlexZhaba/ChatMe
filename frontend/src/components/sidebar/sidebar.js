import React from 'react';
import {NavLink} from 'react-router-dom';
import './sidebarStyle.css';
let Sidebar = (props) => {
    return (
        <div className='sidebar-menu-block'>
        <div className='sidebar-my-profile'>My profile</div>
        <div>News</div>
        <div><NavLink to='/search'>Search</NavLink></div>
        <div><NavLink to='/settings'>Settings</NavLink></div>

        <div><NavLink to='/subscribers'>Subscribers</NavLink></div>
        <div><NavLink to='/subscribtions'>Subscribtion</NavLink></div>
      </div>
    );
};


export default Sidebar;
