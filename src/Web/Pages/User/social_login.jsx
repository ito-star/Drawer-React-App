import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { loginWithProvider, updateErrorMessage } from '../../../Redux';

import { IC_FACEBOOK, IC_GOOGLE_PNG } from '../../resources';


class SocialLogin extends Component {

    constructor(props) {
        super(props);
        this.loginWithProvider = this.loginWithProvider.bind(this);
    }

    loginWithProvider(provider) {
        this.props.loginWithProvider(provider).then((data) => {
            if (data.payload.errorCode) {
                this.props.updateErrorMessage(data.payload.errorMessage);
            } else {
                browserHistory.push('/dashboard');
            }
        });
    }

    render() {
        return (
            <div className="col-xs-12 p-r-0 p-l-0">
                <div className={this.props.displayInline ? 'col-xs-6' : 'col-xs-12'} >
                    <button
                      className="col-xs-12 bc-blue m-t-15"
                      onClick={() => {
                          this.loginWithProvider('facebook');
                      }}
                    ><img src={IC_FACEBOOK} />Sign up with Facebook</button></div>
                <div className={this.props.displayInline ? 'col-xs-6' : 'col-xs-12'} >
                    <button
                      className="col-xs-12 bc-red m-t-15"
                      onClick={() => {
                          this.loginWithProvider('google');
                      }}
                    ><img src={IC_GOOGLE_PNG} />Sign up with Google</button></div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateErrorMessage,
        loginWithProvider,
    }, dispatch);
}

export default connect(null, mapDispatchToProps)(SocialLogin);
