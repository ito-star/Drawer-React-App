import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import {
    ADS,
    PROJECTS,
    BTN_ADD,
} from '../resources';

const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
};

export default () => (
    <div id="Projects" className="text-center">
        <div className="ad-slider col-xs-12 m-t-50">
            {ADS.map(ad => (
                <div key={Math.random()} className="ad-type fc-white"><img className="col-xs-12" src={ad.img} /><span className="col-xs-12 m-t-10">{ad.text}</span></div>))}
        </div>
        <div className="ads container m-b-50">
            <div className="ad col-xs-6 col-sm-4 m-t-30" onClick={() => { browserHistory.push('/select-size'); }}>
                <div className="content">
                    <img src={BTN_ADD} style={{ objectFit: 'none' }} />
                    <span className="fs-15 fc-Bluno lh-50">Add new Project</span>
                </div>
            </div>
            {PROJECTS.map(project => <div key={Math.random()} className="ad col-xs-6 col-sm-4 m-t-30">
                <div className="content">
                    <img src={project.img} />
                    <span className="fs-15 fc-Bluno lh-50">{project.name}</span>
                </div>
            </div>)}
        </div>
    </div>
);
