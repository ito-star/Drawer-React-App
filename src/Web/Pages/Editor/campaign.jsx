import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';

import WorkSheet from '../../components/Worksheet';


class Campaign extends Component {

    constructor(props) {
        super(props);
        this.state = {
            objects: [
                { type: 'text', x: 10, y: 20, text: 'Hello!', fill: 'red' },
                { type: 'rect', x: 50, y: 70, fill: 'red' },
            ],
        };
    }

    render() {
        return (
            <div id="campaign" className="text-center">
                <Scrollbars {...this.props}>
                    <WorkSheet />
                </Scrollbars>
            </div>
        );
    }
}


export default Campaign;
