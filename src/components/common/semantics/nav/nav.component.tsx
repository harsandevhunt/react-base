import React from "react";
import logo from "../../../../assets/images/poc-logo.png";
import NavLink from "../navLink";
import Dropdown from "../../Dropdown";

const userMenuData = [
	{
		value: "Profile",
    },
    {
        value: "Settings",
        submenu:[
            {
                value:"Account"
            },
            {
                value:"Privacy"
            },
            {
                value:"Networks"
            }
        ]
    },
    {
		value: "Logout",
	},
];
const userName = 'Hari';

export default () => {
	return (
		<nav>
			<img src={logo} alt="Logo" className="logo" />
            <div className="nav-link">
                <ul>
                    <li>
                        <NavLink to="/" className="active">
                            Home{" "}
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/dashboard">Dashboard</NavLink>
                    </li>
                    <li>
                        <NavLink to="/components">Components</NavLink>
                    </li>
                </ul>
            </div>
			<div className="userMenu">
				<Dropdown title={userName} flow="left" display="default" align="left" role="link" position="right" data={userMenuData} />
			</div>
		</nav>
	);
};
