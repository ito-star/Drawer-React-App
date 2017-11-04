import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import firebase from '../../../Utils/firebase';


import { fetchUser, updateUser } from '../../../Redux';


class UserProfile extends Component {

    constructor(props) {
        super(props);
        this.props.fetchUser();
        this.state = {
            message: '',
        };
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onFormSubmit(event) {
        event.preventDefault();
        const firstname = this.refs.firstname.value;
        const lastname = this.refs.lastname.value;
        const website = this.refs.website.valuse;
        browserHistory.push('/dashboard/campaign');
    }

    render() {
        return (
            <div className="col-xs-12">
                <div className="col-xs-12 col-sm-6 col-md-5 col-md-offset-1 col-lg-4 col-lg-offset-2">
                    <form id="frmProfile" role="form" onSubmit={this.onFormSubmit}>
                        <div className="form-title">Create your Campaign Kit profile!</div>
                        <div className="form-description">With your Campaign Kit profile, you can add your profile to your Campaigns instantly</div>
                        <p>{this.state.message}</p>
                        <br />
                        <div className="form-group">
                            <label htmlFor="firstname">First Name</label>
                            <input
                              type="text"
                              className="form-control" id="firstname" ref="firstname" placeholder="Sam" name="firstname"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastname">Last Name</label>
                            <input
                              type="text"
                              className="form-control" id="lastname" ref="lastname" placeholder="Smith" name="lastname"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="website">Your Website</label>
                            <input
                              type="text"
                              className="form-control" id="website" ref="website" placeholder="samsmith.com" name="website"
                            />
                        </div>
                        <button type="submit" className="submit">Save & Continue</button>
                    </form>
                </div>
                <div className="col-xs-12 col-sm-6">
                    <form id="frmProfile" role="form" onSubmit={this.onFormSubmit}>
                        <div className="form-title">See How Campaign Kit Can Help Your Business Grow</div>
                        <video src="http://techslides.com/demos/sample-videos/small.mp4" controls />
                    </form>
                </div>
            </div>
        );
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUser,
    }, dispatch);
}


function mapStateToProps(state) {
    return { currentUser: state.currentUser };
}


export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
