import React, { Component } from 'react';
import Input from '../../Input';
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";
import { bindActionCreators } from "redux";
import Button from "../../Button";
import Text from "../../Text";
import {signUp} from "../../../actions";

class SignUpForm extends Component {

    state = {
        auth: {
            login: '',
            password: ''
        },
        error: ''
    };

    handleSubmit = e => {
        e.preventDefault();
        const { signUp, error } = this.props;
        const { auth } = this.state;
        signUp(auth);
        if(!error) return false;
        else if(error.length > 0)
            this.setState({error});
    };

    componentWillReceiveProps({ isReg, history }) {return isReg ? history.push("/signin") : ''}

    handleChange = e => {
        const { auth } = this.state;
        if (!e) {
            return false
        }
        const { name, value } = e.target;
        this.setState({ auth: {...auth, [name]: value} })
    };

    render() {
        const items = ['login', 'password'];
        const types = ['email', 'password'];
        const inputFields = () => Array.apply(null, Array(2)).map(
                (e, i) =>
                    <Input type={types[i]} key={i} name={items[i]} onChangeInput={this.handleChange}/>
        );
        const navLink = <NavLink className="signup__link_btn" exact to='/signin'>Sign In</NavLink>;
        return (
            <div className="signup" id="signup">
                <form onSubmit={this.handleSubmit}>
                    <h3 className="signup__title">Please register</h3>
                    { inputFields() }
                    <Button htmlType="submit" text="Sign Up"/>
                </form>
                <div className="signup__info">
                    <Text className="signup__question" text="Already registered?"/>
                    <Text className="signup__link" text={ navLink }/>
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        isReg: auth.isReg,
        error: auth.error
    };
};

const mapDispatchToProps = dispatch => bindActionCreators({
    signUp
}, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUpForm));