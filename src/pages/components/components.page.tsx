import React from "react";
import { Router } from "@reach/router";
import "./components.scss";
import SideNav from "../../components/common/semantics/sideNav";
import DefaultLanding from "../../components/componentsPage/default";
import loadData from "../../data/dropdown-multi-menu.data.json";
import DropdownMenu from "../../components/common/DropdownMenu";
import PropSettings from "../../components/common/PropSettings";
import Dropdown from "../../components/common/Dropdown";
import Button from "../../components/common/Button/Button.component";

const dropDownData: any = loadData;
const dropdownSettings: any = {
    path: "dropdown",
	multi: true,
	// active: true,
	role: "button",
	position: "left",
	flow: "right",
    align: "left",
    display:'default',
	// title: "Select",
	data: dropDownData
};
const buttonSettings: any = {
	path: "button/*",
	onClick: () => {
        console.log("Clicked on Button!");
    },
	buttonStyle: "btn--primary--solid",
    buttonSize: "btn--large",
    text:"Button Check"
};

const onDropdownChange = (data:any[])=>{
	console.log('selected-data:',data);
}
const Components = (props: any) => {
	return (
		<div>
			<h3>Components</h3>
			<div className="component-grid">
				<section className="section">
					<h4 style={{ margin: "10px" }}>Navigation</h4>
					<SideNav className="section" />
				</section>
				<section className="section">
					<h4 style={{ margin: "10px" }}>View</h4>
					{props.children}
					{/* To avoid Router div full height issue passing predefined div class */}
					<Router
						component={(wrapperProps) => (
							<div className="fullBox m-15" {...wrapperProps} />
						)}
					>
						<DefaultLanding path="/" />

						<Dropdown onDropdownChange={onDropdownChange} {...dropdownSettings}></Dropdown>

						<DropdownMenu
							path="dropdown-old"
							multi
							title="Select Department"
							data={dropDownData}
						/>
                        <Button {...buttonSettings}/>
					</Router>
				</section>

				<section className="section">
					<h4 style={{ margin: "10px" }}>Props</h4>
					<Router>
						<PropSettings {...dropdownSettings} />
                        <PropSettings {...buttonSettings}/>
					</Router>
				</section>
			</div>
		</div>
	);
};
export default Components;
