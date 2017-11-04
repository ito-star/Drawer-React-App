import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory, Link } from 'react-router';
import { bindActionCreators } from 'redux';

import SocialLogin from './user/social_login';

class Landing extends Component {

    constructor(props) {
        super(props);
        this.onGetStarted = this.onGetStarted.bind(this);
    }

    onGetStarted(event) {
        event.preventDefault();
        const email = this.refs.email.value;
        localStorage.setItem('email', email);
        browserHistory.push('/user/login');
    }

    render() {
        return (
            <div className="landing col-xs-12 p-l-0 p-r-0 text-center">
                <SocialLogin displayInline />
                <div className="email-input col-xs-12 m-t-20">
                    <input
                        type="email" className="form-control" id="txtEmail" ref="email" placeholder="sam@samsmith.com"
                        name="email"
                    />
                    <button onClick={this.onGetStarted}>Get Started</button>
                </div>
            </div>
        );
    }
}

export default Landing;

