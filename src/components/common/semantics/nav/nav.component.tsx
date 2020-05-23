import React from 'react';
import NavLink from '../navLink';

export default () =>{
    return (
        <nav>
            <ul>
                <li>
                <NavLink to="/" className="active">Home </NavLink>
                </li>
                <li>
                <NavLink to="/dashboard">Dashboard</NavLink>
                </li>
                <li>
                <NavLink to="/components">Components</NavLink>
                </li>
            </ul>
        </nav>
    )
 }