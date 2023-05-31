import {HTMLInputTypeAttribute } from "react";
import "./input.css";

interface InputProps {
  isEditable?:boolean
  inputType : HTMLInputTypeAttribute;
  onChange?:()=>void;
  onClick?:()=>void;
  list?:string;
  placeholder?:string;
}

export const Input = ({inputType,isEditable=true,...props}:InputProps) => {
 
  function getClassName(inputType: HTMLInputTypeAttribute) {
    switch (inputType) {
      case "search":
        return "border p-2 rounded";
      case "submit":
        return "border p-2 rounded";
      default:
        return "border-2";
    }
  }
    const classNames = getClassName(inputType);

  return (
    <input type={inputType} className={classNames} readOnly={!isEditable} {...props} />
  );
};
