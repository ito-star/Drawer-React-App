import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Header from '../components/header/header';

export default props => (
    <div>
        <Header />
        {props.children}
    </div>
);
