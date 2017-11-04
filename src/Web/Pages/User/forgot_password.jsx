import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { changePassword } from '../../../Redux';

class ForgotPassword extends Component {

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
        this.props.forgotPassword(email).then((data) => {
            if (data.payload.errorCode) { this.setState({ message: data.payload.errorMessage }); } else { this.setState({ message: 'Password has been sent to your email.' }); }
        });
    }

    render() {
        return (
            <div className="form-container">
                <form id="forgotPassword" role="form" onSubmit={this.onFormSubmit}>
                    <div className="form-title">Enter your email address and we'll get you back on track!</div>
                    <p>{this.state.message}</p>
                    <div className="form-group">
                        <label htmlFor="email"> Your Email: </label>
                        <input
                          type="email" className="form-control"
                          name="email" ref="email" id="email" placeholder="sam@smith.com"
                        />
                    </div>
                    <button type="submit" className="submit">Submit</button>
                    <h5 className="col-xs-12 text-right m-t-15"><Link to="/user/login">Log In</Link></h5>
                </form>
            </div>
        );
    }

}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ changePassword }, dispatch);
}

function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);
