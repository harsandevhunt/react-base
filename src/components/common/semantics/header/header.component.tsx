import React from 'react';
import logo from '../../../../assets/images/poc-logo.png';
import Nav from '../nav';
import './header.scss';

const Header = ()=>{
    return (
        <header>
            <img src={logo} alt="Logo" className="logo"/>
            <Nav />
        </header>
    )
};

export default Header;