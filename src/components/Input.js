import React, { Component } from "react";
import { Icon, Input } from "antd";

export default class InputField extends Component {
  state = {
    value: ""
  };

  emitEmpty = () => {
    this.inputValue.focus();
    this.setState({ value: "" });
  };

  onChangeUserName = e => {
    this.setState({ value: e.target.value });
    if (this.props.onChangeInput) this.props.onChangeInput(e);
  };

  render() {
    const { input, type, name, className } = this.props;
    const { value } = this.state;
    const suffix = value ? (
      <Icon type="close-circle" onClick={this.emitEmpty} />
    ) : null;
    const placeholderName = `Please enter your ${name}`;

    return (
      <Input
        className={className}
        {...input}
        type={type}
        placeholder={placeholderName}
        suffix={suffix}
        name={name}
        value={value}
        ref={node => (this.inputValue = node)}
        onChange={this.onChangeUserName}
      />
    );
  }
}
