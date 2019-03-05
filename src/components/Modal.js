import React, { Component } from "react";
import { Modal } from "antd";
import Text from "./Text";

export class ModalBasic extends Component {
  state = { visible: false, text: "" };

  componentWillMount() {
    const { text } = this.props;
    this.setState({ text });
    return this.showModal();
  }

  componentWillUnmount() {
    this.setState({ text: "" });
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({
      visible: false
    });
    closeModal();
  };

  render() {
    const { title, container, className, classNameText } = this.props;
    const { visible, text } = this.state;
    return (
      <Modal
        title={title}
        visible={visible}
        onOk={this.handleCancel}
        wrapClassName="modal"
        onCancel={this.handleCancel}
        className={className}
        getContainer={() => document.getElementById(container)}
      >
        <Text className={classNameText} text={text} />
      </Modal>
    );
  }
}
