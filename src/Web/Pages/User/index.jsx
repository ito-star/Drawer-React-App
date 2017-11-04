import React from 'react';

export default props => (
    <div className="container">
        <img className="background-img" src="/assets/imgs/backgrounds/user.svg" />
        {props.children}
    </div>
);
