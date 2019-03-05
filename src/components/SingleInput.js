import React from "react";
import "antd/dist/antd.css";
import { Input } from "antd";

const Search = Input.Search;

export const SearchInput = ({
  onChange,
  disabled,
  enterButton,
  action,
  style,
  placeholder,
  className,
  name,
  type = "text"
}) => (
  <Search
    placeholder={placeholder}
    name={name}
    type={type}
    disabled={disabled}
    style={style}
    enterButton={enterButton}
    onSearch={action}
    onChange={onChange}
    className={className}
  />
);
