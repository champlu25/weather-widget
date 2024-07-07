/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars*/
import "./textField.css";

export const TextField = ({ type, title, ...rest }) => {
  return <input {...rest} className="textField" type={type || "text"} />;
};
