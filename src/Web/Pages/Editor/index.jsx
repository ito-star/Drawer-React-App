import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import SideBar from '../../Components/Editor/SideBar';
import ToolBar from '../../Components/Editor/ToolBar';
import SubMenu from '../../Components/Header/Submenu';

import {
    BTN_CLOSE,
    AVATAR,
    CATEGORIES,
    STYLES,
    ADS,
    AD_SAMPLE,
} from '../../resources';

export default props => (
    <div className="col-xs-12 p-l-0 p-r-0">
        <SubMenu />
        <SideBar />
        <ToolBar />
        <div id="workingSheet">
            {props.children}
        </div>
    </div>
);
