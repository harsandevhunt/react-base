import React from 'react';
import NavLink from '../navLink';

export default (props:any) =>{
    return (
        <aside>
            <ul>
                <li>
                <NavLink to="dropdown">dropdown</NavLink>
                </li>
                <li>
                <NavLink to="dropdown-old">dropdown-old</NavLink>
                </li>
                <li>
                <NavLink to="button">Button</NavLink>
                </li>
            </ul>
        </aside>
    )
 }