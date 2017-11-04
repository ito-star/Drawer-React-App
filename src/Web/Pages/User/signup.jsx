import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

import SocialLogin from './social_login';

export default props => (
    <div className="form-container text-center">
        <div className="fs-20 fc-black lh-30 m-t-50">
            New to Campaign Kit? Sign Up!
        </div>
        <SocialLogin displayInline={false} />
        <div className="col-xs-12 fc-Grey fs-12 lh-50">- or -</div>
        <div className="col-xs-12">
            <button
                className="col-xs-12 bc-green fs-15 lh-15 m-b-30" onClick={() => {
                    browserHistory.push('/user/email-signup');
                }}
            >
            Sign up with Email
        </button></div>
        <div className="col-xs-10 col-xs-offset-1 fc-Grey fs-12">By using Campaign Kit, you are agreeing to Campaign Kit’s Terms of Service.</div>
    </div>
);
