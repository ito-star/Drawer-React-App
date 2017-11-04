import React, { Component } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link, Route } from 'react-router';

import { 
    BTN_CLOSE,
    AVATAR,
    CATEGORIES,
    STYLES,
    ADS,
    AD_SAMPLE,
} from '../resources';

class Welcome extends Component {

    constructor(props) {
        super(props);
        this.state = {
            step: 0,
            category: '',
            goalType: 0,
            style: '',
        }
        this.selectCategory = this.selectCategory.bind(this);
        this.selectGoal = this.selectGoal.bind(this);
    }

    componentDidMount() {
        $("#step-0").fadeIn('slow');
    }

    selectCategory = (category) => {
        $("#step-0").fadeOut('slow', () => {
            this.setState({
                category: category,
                step: 1,
            }, () => {
                $("#step-1").fadeIn('slow');
            });
        });        
    }

    selectGoal = () => {
        $("#step-1").fadeOut('slow', () => {
            this.setState({
                step: 2,
            }, () => {
                $("#step-2").fadeIn('slow');
            });
        });
    }

    renderCategorySelect() {
        return (
            <div id="step-0" className="dis-no container step">
                <span className="col-xs-12 fs-35">Welome to Campaign Kit.</span>
                {CATEGORIES.map( (category) => { return (
                    <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3 m-t-20 p-r-10 p-l-10 fs-16" key={Math.random()}><button className="ck-btn" onClick={ () => {this.selectCategory(category)}}> {category} </button></div>);
                })}
                <button className="col-xs-12 fs-20 m-t-30" onClick={ () => {this.selectCategory("Other")}}> Non of the above applies </button> 
            </div>
        )
    }

    renderBusinessTypeSelect() {
        return (
            <div id="step-1" className="step dis-no fc-black fs-18 lh-100">
                {/* <img className="btn-close" src={BTN_CLOSE} onClick={ () => {$(".welcome-dashboard").fadeOut()}} /> */}
                <div className="fs-20 fc-black lh-25">
                    Campaign Kit Can Help You Grow<br />Your Business
                </div>
                <div className="fs-15 fc-Grey lh-25 m-t-15">
                    Tells what you are trying to archeive
                </div>
                <div className={this.state.goalType == 0 ? "business-type active" : "business-type"} onClick={ () => {this.setState({goalType: 0})}}>
                    <div className="left" style={{background: '#4DC7EE'}}><img src={AVATAR} /></div>
                    <div className="right">Promote My Business</div>
                </div>
                <div className={this.state.goalType == 1 ? "business-type active" : "business-type"} onClick={ () => {this.setState({goalType: 1})}}>
                    <div className="left" style={{background: '#7DD5C4'}}><img src={AVATAR} /></div>
                    <div className="right">Grow Brand Awarness</div>
                </div>
                <div className={this.state.goalType == 2 ? "business-type active" : "business-type"} onClick={ () => {this.setState({goalType: 2})}}>
                    <div className="left" style={{background: '#F37759'}}><img src={AVATAR} /></div>
                    <div className="right">Sell More Products</div>
                </div>
                <button className="bc-green p-l-40 p-r-40" onClick={this.selectGoal}>Continue</button>
            </div>
        )
    }

    renderStyleSelect() {
        return (
            <div id="step-2" className="step col-xs-12 col-lg-10 col-lg-offset-1 dis-no fc-white text-center">
                <div className="col-xs-12 fs-30 m-b-20">Choose Your Campaign Style</div>
                <div className="col-xs-12 fs-15 m-b-10">Can't find what you are looking for?</div>
                <div className="col-xs-12 m-b-30"><button className="bc-green p-l-20 p-r-20"><Link to="/dashboard/projects" >Create Your Own</Link></button></div>
                {STYLES.map( (style) => { return (
                    <div key={Math.random()} className={ this.state.style == style.name ? "style-container active" : "style-container" } onClick={ () => {this.setState({style: style.name})}}>
                        <img src={style.img} />
                        <span className="fs-20 lh-50">{style.name}</span>
                    </div>)
                })}
                <div className="col-xs-12 m-b-30"><button className="bc-green p-l-20 p-r-20 m-t-20"><Link to="/dashboard/projects" >Continue</Link></button></div>
            </div>
        )
    }

    render() {
        switch(this.state.step) {
            case 0:
                return this.renderCategorySelect();
            case 1:
                return this.renderBusinessTypeSelect();
            case 2:
                return this.renderStyleSelect();
            default:
                return null;
        }
    }
}


export default Welcome;
