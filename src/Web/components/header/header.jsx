import React, { Component } from 'react';
import { Link, Route, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUser, logoutUser } from '../../../Redux';

import { CAMPAIGN_LOGO } from '../../resources';


const ONBOARDING_ROUTES = [
    'home',
    'features',
    'pricing',
    'how-it-works',
    'about',
    'blog'
]

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            onboarding: true,
        };
        this.props.fetchUser();
        this.logOut = this.logOut.bind(this);
    }

    logOut() {
        this.props.logoutUser().then((data) => {
            // reload props from reducer
            this.props.fetchUser();
            localStorage.removeItem('category');            
        });
    }

    componentDidMount() {
        browserHistory.listen( location =>  {
            let onboarding = location.pathname.length == 1
            ONBOARDING_ROUTES.map((route) => {
                if(location.pathname.includes(route)) {
                    onboarding = true;
                }
            });
            this.setState({onboarding});
        }).bind(this);
    }

    renderUserMenu(currentUser) {
        // if current user exists and user id exists than make user navigation
        if (currentUser && currentUser.uid) {
            return (
                <li className="dropdown">
                    <a
                      href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                      aria-haspopup="true" aria-expanded="false"
                    >
                        {currentUser.email} <span className="caret" /></a>
                    <ul className="dropdown-menu">
                        <li><Link to="/dashboard">Dashboard</Link></li>
                        <li role="separator" className="divider" />
                        <li><Link to="/projects">Projects</Link></li>
                        <li role="separator" className="divider" />
                        <li><Link to="/user/profile">Profile</Link></li>
                        <li role="separator" className="divider" />
                        <li><Link to="/" onClick={this.logOut}>Logout</Link></li>
                    </ul>
                </li>
            );
        }
        return [
            <li key={1}><Link to="/user/login">Login</Link></li>,
            <li key={2}><Link to="/user/sign-up">Sign Up</Link></li>,
        ];
    }

    render() {
        return (
            <header id="top" role="banner" className="col-xs-12 po-fix">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <Link to="/" className="navbar-brand"><img src={CAMPAIGN_LOGO} />Campaign Kit</Link>
                    </div>
                    <div className="collapse navbar-collapse bs-navbar-collapse text-center" role="navigation">
                        {this.state.onboarding ?
                            <ul className="nav navbar-nav f-n dis-inb">
                                <li><Link to="/features"> Features</Link></li>
                                <li><Link to="/how-it-works"> How It Works</Link></li>
                                <li><Link to="/pricing"> Pricing</Link></li>
                                <li className="dropdown">
                                    <a
                                        href="#" className="dropdown-toggle" data-toggle="dropdown" role="button"
                                        aria-haspopup="true" aria-expanded="false"
                                    >
                                    More <span className="caret" /></a>
                                    <ul className="dropdown-menu">
                                        <li><Link to="/about">About</Link></li>
                                        <li role="separator" className="divider" />
                                        <li><a href="https://campaignkit.com.au/blog">blog</a></li>
                                    </ul>
                                </li>
                            </ul> : null }
                        <ul className="nav navbar-nav navbar-right">
                            { this.renderUserMenu(this.props.currentUser) }
                        </ul>
                    </div>
                </div>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchUser,
        logoutUser,
    }, dispatch);
}


function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Header);
