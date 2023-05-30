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
  return (
    <input type={inputType} readOnly={!isEditable} {...props} />
  );
};
