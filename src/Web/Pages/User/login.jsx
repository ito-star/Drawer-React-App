import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SocialLogin from './social_login';

import { loginUser, updateErrorMessage } from '../../../Redux';


class UserLogin extends Component {

    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: '',
        };
    }

    componentDidMount() {
        if (localStorage.getItem('email')) {
            this.refs.email.value = localStorage.getItem('email');
        }
    }

    onFormSubmit(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        const password = this.refs.password.value;
        this.props.loginUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.props.updateErrorMessage(data.payload.errorMessage);
            } else {
                browserHistory.push('/projects');
            }
        });
    }

    render() {
        return (
            <div className="form-container">
                <form id="frmLogin" role="form" onSubmit={this.onFormSubmit}>
                    <div className="form-title">Log Into Your Account</div>
                    <p>{this.state.message}</p>
                    <SocialLogin displayinline={false} />
                    <div className="col-xs-12 p-r-0 p-l-0 divider" />
                    <div className="form-group">
                        <label htmlFor="txtEmail">Your Email</label>
                        <input
                          type="email" className="form-control" id="txtEmail" ref="email" placeholder="sam@samsmith.com"
                          name="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtPass">Your Password</label>
                        <input
                          type="password" className="form-control" id="txtPass" ref="password" placeholder="Your Password"
                          name="password"
                        />
                    </div>
                    <button className="submit" type="submit">Login</button>
                    <br />
                    <h5 className="col-xs-12 col-sm-6"><Link to="/user/sign-up">Create an account</Link></h5>
                    <h5 className="col-xs-12 col-sm-6"><Link to="/user/forgot">Forgot Your Password?</Link></h5>
                </form>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        loginUser,
        updateErrorMessage,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(UserLogin);
