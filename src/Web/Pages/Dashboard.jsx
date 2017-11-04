import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { Scrollbars } from 'react-custom-scrollbars';

import { DESIGNS } from '../resources';

const slickSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
};

function onSelect(category, width, height, unit) {
    localStorage.setItem("category",JSON.stringify({
        category,
        width,
        height,
        unit
    }))
    browserHistory.push('/editor')
}

export default () => (
    <div id="dashboard">
        <Scrollbars>
            <div className="container m-t-30 m-b-30">
                {DESIGNS.map((category) => 
                    <div key={Math.random()} className="col-xs-12 m-t-25">
                        <p className="fs-20 fc-black m-b-25">{category.name}</p>
                        <ul>
                            {category.designs.map((design) => 
                                <li key={Math.random()} onClick={()=>{onSelect(category.name, design.width, design.height, design.unit)}}>
                                    <img src={design.img} />
                                    <p className="name">{design.name}</p>
                                    <p className="size">{`${design.width} × ${design.height} ${design.unit}`}</p>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </Scrollbars>
    </div>
);
