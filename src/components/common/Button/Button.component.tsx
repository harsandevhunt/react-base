import React from "react";
import "./Button.scss";
import { RouteComponentProps } from "@reach/router";

interface Props{
    path?: RouteComponentProps;
    children?:React.ReactDOM; 
    type ?:any;
    text?:any;
    onClick?:any;
    buttonStyle?:any;
    buttonSize?:any;
}

const STYLES = [
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline"
];

const SIZES = ["btn--small", "btn--medium", "btn--large"];

const Button:React.FC<Props> = (props) => {
  const checkButtonStyle = STYLES.includes(props.buttonStyle)
    ? props.buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(props.buttonSize) ? props.buttonSize : SIZES[0];

  return (
    <button
      className={`custom-btn btn ${checkButtonStyle} ${checkButtonSize}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.text}
    </button>
  );
};

export default Button;
