import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import { signIn } from "../../../actions";
import Input from "../../Input";
import Button from "../../Button";
import Text from "../../Text";
import { ModalBasic } from "../../Modal";

class SignInForm extends Component {
  state = {
    auth: {
      login: "",
      password: ""
    },
    error: ""
  };

  handleSubmit = e => {
    e.preventDefault();
    const { signIn, error } = this.props;
    const { auth } = this.state;
    signIn(auth);
    if (!error) return false;
    else if (error.length > 0) this.setState({ error });
  };

  componentWillReceiveProps({ isAuthenticated, history }) {
    return isAuthenticated ? history.push("/profile") : "";
  }

  handleChange = e => {
    if (!e) {
      return false;
    }
    const { name, value } = e.target;
    this.setState({ auth: { ...this.state.auth, [name]: value } });
  };

  render() {
    const items = ["login", "password"];
    const types = ["email", "password"];
    const inputFields = () =>
      Array.apply(null, Array(2)).map((e, i) => (
        <Input
          type={types[i]}
          key={i}
          name={items[i]}
          onChangeInput={this.handleChange}
        />
      ));
    const showErrorMessage = () => (
      <ModalBasic
        classNameText="signin__title"
        className="signin__modal"
        container="signin"
        errorText={this.state.error}
      />
    );
    return (
      <div className="signin" id="signin">
        {this.state.error ? showErrorMessage() : ""}
        <form onSubmit={this.handleSubmit}>
          <h3 className="signin__title">If you are registered already</h3>
          {inputFields()}
          <Button htmlType="submit" text="Login" />
        </form>
        <div className="signin__info">
          <Text className="signin__question" text="Not registered?" />
          <Text
            className="signin__link"
            text={
              <NavLink exact to="/auth" className="signin__link_btn">
                Create an account
              </NavLink>
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    isAuthenticated: auth.loggedIn,
    error: auth.error
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signIn
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
