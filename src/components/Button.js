import { Button } from "antd";
import React from "react";
import {NavLink} from "react-router-dom";

export default ({htmlType, type, action, path, className, text}) => {
    const button =  <Button htmlType={htmlType} className={className} type={type} onClick={action}>{text}</Button>
    return path ? <NavLink to={path}>{button}</NavLink> : button;
}
