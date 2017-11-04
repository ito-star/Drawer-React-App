import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { registerUser } from '../../../Redux';

const BACKGROUND = '/assets/imgs/backgrounds/sign-up.svg';

class EmailSignUp extends Component {
    constructor(props) {
        super(props);
        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.state = {
            message: '',
        };
    }

    onFormSubmit(event) {
        event.preventDefault();

        const email = this.refs.email.value;
        const password = this.refs.password.value;
        const passwordAgain = this.refs.passwordAgain.value;
        
        if(password != passwordAgain) {
            this.setState({ message: "please confirm your password." });
            return;
        }

        this.props.registerUser({ email, password }).then((data) => {
            if (data.payload.errorCode) {
                this.setState({ message: data.payload.errorMessage });
            } else {
                browserHistory.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <div className="form-container">
                <form id="frmRegister" role="form" onSubmit={this.onFormSubmit}>
                    <div className="form-title">Use Campaign Kit for <span style={{ color: '#7ED321' }}>FREE</span></div>
                    <div className="form-description">(No Credit Card Required)</div>
                    { this.state.message.length !== 0 ? (<div className="alert alert-danger">{this.state.message}</div>) : null }
                    <div className="form-group">
                        <label htmlFor="txtRegEmail">Your Email</label>
                        <input
                          type="email" className="form-control" ref="email" id="txtEmail" placeholder="sam@samsmith.com"
                          name="email"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtRegPass">Your Password</label>
                        <input
                          type="password" className="form-control" ref="password" id="txtPass" placeholder="Your Password"
                          name="password"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="txtRegPass">Your Password Again</label>
                        <input
                          type="password" className="form-control" ref="passwordAgain" id="txtPass" placeholder="Your Password Again"
                          name="passwordAgain"
                        />
                    </div>
                    <button className="submit m-t-15" type="submit">Create Account</button>
                    <br />
                    <div className="divider" />
                    <button className="submit m-t-0" onClick={() => { browserHistory.push('/user/login'); }}>Login to existing Account</button>
                    <div className="text-center fc-Text m-t-15">By using Campaign Kit, you are agreeing to Campaign Kit’s Terms of Service.</div>
                </form>
            </div>
        );
    }

}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        registerUser,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(EmailSignUp);
