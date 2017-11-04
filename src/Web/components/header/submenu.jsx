import React, { Component } from 'react';
import { Link, Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { activeSubMenu } from '../../../Redux';

import {
    IC_CAMPAIGN,
    IC_ADS,
    IC_AUDIENCE,
    IC_AUTOMATIONS,
    IC_INTEGRATIONS,
    IC_SETTINGS,
} from '../../resources';


class SubMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: 'campaign',
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.header != null) {
            this.setState({
                active: nextProps.header.active,
            });
        }
    }

    render() {
        return (
            <nav id="submenu" role="submenu" className="col-xs-12">
                <Link 
                    to="/editor/campaign" 
                    className={this.state.active == 'campaign' ? 'navbar-brand active' : 'navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('campaign'); }} >
                    <img src={IC_CAMPAIGN} />Campaign</Link>
                <Link 
                    to="/editor/ads" 
                    className={this.state.active == 'ads' ? 'navbar-brand active' : 'navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('ads'); }} >
                    <img src={IC_ADS} />Ads</Link>
                <Link 
                    to="/editor/audience" 
                    className={this.state.active == 'audience' ? 'navbar-brand active' : 'navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('audience'); }} >
                    <img src={IC_AUDIENCE} />Audience</Link>
                <Link 
                    to="/editor/automations" 
                    className={this.state.active == 'automations' ? 'navbar-brand active' : 'navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('automations'); }} >
                    <img src={IC_AUTOMATIONS} />Automations</Link>
                <Link 
                    to="/editor/integrations" 
                    className={this.state.active == 'integrations' ? 'navbar-brand active' : 'navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('integrations'); }} >
                    <img src={IC_INTEGRATIONS} />Integrations</Link>
                <Link 
                    to="/editor/settings" 
                    className={this.state.active == 'settings' ? 'navbar-brand navbar-right active' : 'navbar-right navbar-brand'} 
                    onClick={() => { this.props.activeSubMenu('settings'); }} >
                    <img src={IC_SETTINGS} />Settings</Link>
            </nav>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        activeSubMenu,
    }, dispatch);
}


function mapStateToProps(state) {
    return {
        header: state.header,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SubMenu);
