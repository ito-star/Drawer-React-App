import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Line } from 'rc-progress';
import { Progress } from 'react-sweet-progress';


class footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            message: '',
        };
    }


    render() {
        return (
            <div className="fixed-footer" />
        );
    }
}

export default footer;
