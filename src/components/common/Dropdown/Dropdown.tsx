import React, { createRef } from "react";
import { RouteComponentProps } from "@reach/router";
import {
	AiFillCaretRight,
	AiFillCaretLeft,
	AiOutlineCheck,
	AiOutlineCaretDown,
} from "react-icons/ai";
import "./Dropdown.scss";

interface DataProps {
	value: string;
	submenu?: null | undefined | DataProps[];
}

type Display = "default" | "compact" | "fluid";

type Role = "button" | "link";

type Side = "left" | "right";
interface props {
	data: DataProps[];
	role?: Role;
	selectedItem?: any[];
	title?: string;
	active?: boolean;
	multi?: boolean;
	path?: RouteComponentProps;
	align?: Side | "center";
	position?: Side;
	flow?: Side;
	displaySelected?: boolean;
	display?: Display;
	onDropdownChange?:any;
}

interface Settings {
	display?: Display;
	role?: Role;
	title?: string;
	position?: Side;
	flow?: Side;
	align?: Side | "center";
}

interface state {
	selectedItem?: [];
	open?: boolean;
}

class Dropdown extends React.Component<props, state> {
	static componentName = "Dropdown";
	private dropdownContainer: any;
	settings = {} as Settings;
	constructor(props: props) {
		super(props);

		//Initialize State
		this.state = {
			open: this.props.active,
			selectedItem: [],
		};

		//Initialize setting props/defaults
		this.checkAndSetDefaults();

		// this.dropdownContainer = React.createRef();
		this.dropdownContainer = createRef<HTMLDivElement>();

		//Initializing Event listener for click capture on outside element
		document.addEventListener("click", this.handleClick, false);
	}

	checkAndSetDefaults() {
		//Set Component display style
		this.settings.display = this.props.display || "default";

		//Set Component role style
		this.settings.role = this.props.role || "button";

		//Set Component Title
		this.settings.title = this.props.title || "Select";

		//Set List Position
		this.settings.position = this.props.position || "left";

		//Set List Flow
		this.settings.flow = this.props.flow || "right";

		//Set List Alignment
		this.settings.align = this.props.align || "center";
	}

	componentDidMount() {
		//Manually determine the width of the trigger and list elements and positioning
		this.calculateAndSetPosition();
	}

	calculateAndSetPosition(): void {
		if (this.props.position) {
			let triggerEl = this.dropdownContainer.querySelectorAll(
				".dropdown-trigger"
			)[0];
			let listEl = this.dropdownContainer.querySelectorAll(
				".dropdown-list"
			)[0];
			//Temporarily enabling List to calculate the List width
			let classVal = listEl.className.replace("d-none", "d-flex");
			listEl.className = classVal;
			let triggerWidth = triggerEl.offsetWidth;
			let listWidth = this.dropdownContainer.querySelectorAll(
				".dropdown-list > li:first-child"
			)[0].offsetWidth;

			//Back to display none
			if(!this.props.active){
				classVal = listEl.className.replace("d-flex", "d-none");
				listEl.className = classVal;
			}
			let val = "";
			if (this.props.position === "right") {
				val =
					triggerWidth < listWidth
						? `-${listWidth - triggerWidth}px`
						: `${triggerWidth - listWidth}px`;
			} else {
				val =
					triggerWidth > listWidth
						? `-${listWidth - triggerWidth}px`
						: ``;
			}
			listEl.style.marginLeft = val;
			console.log(`triggerWidth : ${triggerWidth}
						listWidth : ${listWidth}
						marginLeft: ${val}
						`);
		}
	}

	getMenuItem = (menuItem: any, index: number) => {
		let value = menuItem.value;
		let selItem: any;
		let context = this;
		function checkSelItem(sel: any, tit: string): boolean {
			let resp = false;
			if (sel?.length && sel.indexOf(tit) > -1) {
				resp = true;
			} else if (typeof sel === "string" && sel === tit) {
				resp = true;
			}
			if(context.props.role === 'link')
				return false;
			else
				return resp;
		}
		//Form list arrow based on flow
		let arrowSymbol =
			this.props.flow === "left" ? (
				<AiFillCaretLeft className="li-icon flo-left" />
			) : (
				<AiFillCaretRight className="li-icon flo-right" />
			);
		if (menuItem.submenu && menuItem.submenu.length > 0) {
			selItem = this.state.selectedItem || this.props.selectedItem;
			let subMenus: any = [];
			menuItem.submenu.map((item: DataProps, index: number) => {
				return subMenus.push(this.getMenuItem(item, index));
			});
			return (
				<li
					key={value + index}
					className={`list ${
						checkSelItem(selItem, value) ? "active" : ""
					}`}
				>
					<div className="text">{value}</div>
					{arrowSymbol}
					<ul className="sub-list">{subMenus}</ul>
				</li>
			);
		} else {
			selItem = this.state.selectedItem || this.props.selectedItem;
			let selIcon = <AiOutlineCheck className="li-icon selected" />;
			return (
				<li
					key={value + index}
					className={`list ${
						checkSelItem(selItem, value) ? "active" : ""
					}`}
				>
					<div className="text">{value}</div>
					{checkSelItem(selItem, value) ? selIcon : ""}
				</li>
			);
		}
	};

	toggleMenu = (action?: any) => {
		let displayFlag = false;
		let { open } = JSON.parse(JSON.stringify(this.state));
		if (action && typeof action === "string")
			displayFlag = action === "show" ? true : false;
		else displayFlag = !open;
		if (displayFlag !== open) this.setState({ open: displayFlag });
	};

	selectRecord = (event: any) => {
		if (event.target.innerHTML) {
			let selectedFlag = false;
			let selectedTxt = "";
			let listFlag = true;
			for (let child of event.target.parentNode.children) {
				//Checking UL availability
				if (child.tagName.toUpperCase() === "UL") listFlag = false;

				//Checkign SVG for selected class
				if (
					child.tagName.toUpperCase() === "SVG" &&
					child.classList?.length &&
					child.classList[0] === "li-icon" &&
					child.classList[1] === "selected" &&
					listFlag
				)
					selectedFlag = true;

				//Checking DIV text for selected element
				if (
					child.tagName === "DIV" &&
					child.className === "text" &&
					listFlag
				)
					selectedTxt = child.innerText;
			}
			if (listFlag) {
				let selObj = JSON.parse(
					JSON.stringify(this.state.selectedItem)
				);
				if (selectedTxt && this.props.multi) selObj.push(selectedTxt);
				else if (selectedTxt && !this.props.multi)
					selObj = [selectedTxt];
				if (selectedFlag) this.removeItem(event);
				else {
					this.setState({ selectedItem: selObj });
					//Passing selected item to parent component
					setTimeout(()=>{
						if(this.props.onDropdownChange)
							this.props.onDropdownChange(this.state.selectedItem);
					})
				}
				if (!this.props.multi) this.toggleMenu("hide");
			}
		}
	};

	removeItem = (event: any) => {
		let selectedItem = [];
		if (this.props.multi) {
			selectedItem = JSON.parse(
				JSON.stringify(this.state.selectedItem)
			);
			let item = "";
			for (let child of event.target.parentNode.children) {
				//Checking DIV text for selected element
				if (child.tagName === "DIV" && child.className === "text")
					item = child.innerText;
			}
			if (selectedItem?.length)
				selectedItem.splice(selectedItem.indexOf(item), 1);
			this.setState({ selectedItem: selectedItem });
		}
		this.setState({ selectedItem: selectedItem });
		//Passing selected item to parent component
		setTimeout(()=>{
			if(this.props.onDropdownChange)
				this.props.onDropdownChange(this.state.selectedItem);
		})
	};

	handleClick = (e: any) => {
		if (this.dropdownContainer && !this.dropdownContainer.contains) return;
		if (
			this.dropdownContainer.contains(e.target) &&
			e.target.tagName === "DIV"
		) {
			return;
		} else if (this.dropdownContainer.contains(e.target)) {
			this.toggleMenu("show");
		} else {
			this.toggleMenu("hide");
		}
	};

	componentWillUnmount() {
		// detaching event listener from this component while leaving
		document.removeEventListener("click", this.handleClick, false);
	}

	render = () => {
		//Format options
		let { data } = this.props;
		let options: any = [];
		data.map((item, index) => {
			return options.push(this.getMenuItem(item, index));
		});

		//Format Display Selected Text
		let selectedTxt: any;
		if (
			this.props.multi &&
			this.state.selectedItem &&
			this.state.selectedItem.length
		) {
			selectedTxt = this.state.selectedItem.map((item, i) => {
				return (
					<div
						className="select-item"
						key={i}
						onClick={this.removeItem}
					>
						{item}
					</div>
				);
			});
		} else {
			selectedTxt = "";
		}

		//Format UI Render
		return (
			<>
				<div
					className={`
								dropdown-component
								role-${this.settings.role}
								${this.settings.display}
								align-${this.settings.align}
								p-${this.settings.position}
								flo-${this.settings.flow}
								`}
				>
					<div
						style={
							this.props.displaySelected
								? { height: "30px" }
								: { display: "none" }
						}
					>
						<label>Selected : </label> {selectedTxt}
					</div>

					<div
						className="dropdown-container"
						style={{ display: "flex", flexDirection: "column" }}
						ref={(element) => (this.dropdownContainer = element)}
					>
						<div className="trigger-container">
							<button
								className="dropdown-trigger"
								onClick={this.toggleMenu}
							>
								<div
									className="dropdown-trigger-head"
									title={this.settings.title}
								>
									{this.settings.title}
								</div>
								<AiOutlineCaretDown className="dropdown-trigger-icon" />
							</button>
						</div>
						<div className="list-container">
							<ul
								className={`
									dropdown-list
									${this.state.open ? "d-flex" : "d-none"}
								`}
								onClick={this.selectRecord}
							>
								{options}
							</ul>
						</div>
					</div>
				</div>
				{/* <div style={{ position: "absolute", bottom: "10%" }}>
					{JSON.stringify(this.settings)}
				</div> */}
			</>
		);
	};
}

export default Dropdown;
