import React, { Component } from 'react';
import { Link, Route } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Scrollbars } from 'react-custom-scrollbars';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Masonry from '../Masonry';
import UnspalshTools from '../../../Utils/unsplash';
import { activeSideBar, activeSidePanel, loadMoreImage, addObject } from '../../../Redux';
import { PANELS, TEMPLATES, SHAPES, COLORS, GRADIENTS, BTN_ADD, IC_FACEBOOK } from '../../resources';


const basicObject = {
    originX: "center",
    originY: "center", 
    left: 200, 
    top: 200, 
    overlayFill: null, 
    stroke: null, 
    strokeWidth: 1, 
    strokeDashArray: null, 
    scaleX: 1, 
    scaleY: 1, 
    angle: 0, 
    flipX: false, 
    flipY: false, 
    opacity: 1, 
    selectable: true, 
    hasControls: true, 
    hasBorders: true, 
    hasRotatingPoint: true, 
    padding: 10,
    cornerStyle: 'circle',
    transparentCorners: false, 
    perPixelTargetFind: false, 
    shadow: null, 
    visible: true, 
    path: null, 
    strokeStyle: "", 
    backgroundColor: "", 
    textBackgroundColor: "", 
    useNative: true
}


class SideBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            active: false,
            photos: props.sideBar.photos,
            panel: "Templates",
            photoPage: 1,
        }

        this.brakePoints = [145,290]

        this.addText = this.addText.bind(this)
        this.addShape = this.addShape.bind(this)
        this.addImage = this.addImage.bind(this)
        this.renderTools = this.renderTools.bind(this)
        this.renderToolPanel = this.renderToolPanel.bind(this)
        this.onMasonryScroll = this.onMasonryScroll.bind(this)
    }

    componentDidMount() {
        UnspalshTools.getlistPhotos(this.state.photoPage, 30, 'popular').then( photos => {
            this.props.loadMoreImage(photos)
            this.setState({photoPage: this.state.photoPage +1})
        })
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.sideBar != null) {             
            this.setState({
                active:     nextProps.sideBar.active,
                panel:      nextProps.sideBar.panel,
                photos:     nextProps.sideBar.photos
            }, () => {
                if(this.state.panel == 'Shape') {
                    SHAPES.map( (shape, index) => {
                        let draw = SVG('shape'+index).size("50","50")
                        draw.viewbox(0,0,100,100)
                        draw.svg(shape.context)
                        draw.fill("#f06")
                    })
                }
            })
        }        
    }

    addText = (text, fontSize, lineHeight) => {
        this.props.addObject('i-text', {
            context: text,
            property: Object.assign({}, basicObject, {
                width: 200, 
                height: lineHeight, 
                fill: "rgb(0,0,0)",
                fontSize: fontSize, 
                fontWeight: "normal", 
                fontFamily: "Arial", 
                fontStyle: "normal", 
                lineHeight: 1.1, 
                charSpacing: 0,
                textDecoration: "underline", 
                textShadow: "", 
                textAlign: "left",
            })
        })
    }

    addImage = (url, width, height) => {
        this.props.addObject('image', {
            context: url,
            property: Object.assign({}, basicObject, {
                width: 400, 
                height: height*400/width, 
            })
        })
    }

    addShape = (content) => {
        this.props.addObject('shape', {
            context: content,
            property: Object.assign({}, basicObject, {
                width: 200, 
                height: 200,
            })
        })
    }

    renderTools = () => {
        return (
            <div id="tools">
                {PANELS.map( (tool) => {
                    return (<div key={Math.random()} className={ this.state.panel == tool.name ? "tool active" : "tool" } onClick={ () => {this.props.activeSidePanel( tool.name )} }><img src={this.state.panel == tool.name ? tool.overImg : tool.img}/></div>);
                })}
            </div>
        );
    }

    onMasonryScroll(e) {
        if(e.srcElement.scrollHeight - e.srcElement.clientHeight - e.srcElement.scrollTop < 100) {
            UnspalshTools.getlistPhotos(this.state.photoPage, 15, 'popular').then( photos => {
                this.props.loadMoreImage(photos)
                this.setState({photoPage: this.state.photoPage +1})
            })
        }
    }

    renderToolPanel = () => {
        switch (this.state.panel) {
            case 'Templates':
                return (
                    <Scrollbars className="col-xs-12 p-l-0 p-r-0" {...this.props}>
                        {TEMPLATES.map( (template) => { return (
                            <div key={Math.random()} className="item template"><img src={template.img} /></div>
                        )})}
                    </Scrollbars>
                );
            case 'Color':
                return (
                    <div className="col-xs-12 p-l-0 p-r-0">
                        <Tabs>
                            
                            <TabList>
                                <Tab>Colors</Tab>
                                <Tab>Gradients</Tab>
                                <Tab>Textures</Tab>
                            </TabList>

                            <TabPanel>
                                {COLORS.map( (color) => { return (
                                    <div key={Math.random()} className="item color" style={{backgroundColor: color}}></div>
                                )})}
                            </TabPanel>
                            <TabPanel>
                                {GRADIENTS.map( (gradient) => { return (
                                    <div key={Math.random()} className="item color" style={{background: 'linear-gradient('+gradient.ang+','+gradient.start+','+gradient.end+')'}}></div>
                                )})}
                            </TabPanel>
                            <TabPanel>
                                <h2>Hello from Baz</h2>
                            </TabPanel>
                        </Tabs>
                    </div>
                );
            case 'Image':
                return (
                    <div className="col-xs-12 p-l-0 p-r-0">
                        <div className="item image m-l-15 m-r-10">
                            <img src={BTN_ADD} style={{objectFit: 'none'}} />{'   '}Uploads
                        </div>
                        <div className="item image m-r-10">
                            <img src={IC_FACEBOOK} style={{objectFit: 'cover'}} />{'   '}Dropbox
                        </div>
                        <div className="item image m-r-15">
                            <img src={IC_FACEBOOK} style={{objectFit: 'cover'}} />{'   '}Facebook
                        </div>
                        <div className="col-xs-12 m-t-15">
                            <button className="bc-blue fc-white text-center">Upload your images</button>
                        </div>
                        <div className="col-xs-12 m-t-10 p-l-0 p-r-0" style={{height: 'calc(100vh - 360px)'}}>
                        <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={200} onScroll={this.onMasonryScroll}>
                            <div className="masonry-container">
                                <Masonry brakePoints={this.brakePoints}>
                                    {this.state.photos.map( image => <div className="tile" key={Math.random()}>
                                        <img src={image.urls.thumb} onClick={ () => {this.addImage(image.urls.small, image.width, image.height)} } />
                                    </div>)}
                                </Masonry>
                            </div>
                        </Scrollbars>
                        </div>
                    </div>
                );
            case 'Shape':
                return (
                    <Scrollbars className="col-xs-12 p-l-0 p-r-0" {...this.props}>
                        {SHAPES.map( (shape, index) => <div key={Math.random()} className="item shape"><img id={"shape"+index} src={shape} className="shape" onClick={ () => {this.addShape(shape)}} /></div> )}
                    </Scrollbars>
                );
            case 'Text':
                return (
                    <div className="col-xs-12 p-l-0 p-r-0 text-left">
                        <div className="col-xs-12 fs-30 lh-30 m-t-15 m-b-15 cur-po" unselectable onClick={ () => {this.addText("Heading", 30, 30)}}>Add Heading</div>
                        <div className="col-xs-12 fs-25 lh-25 m-t-15 m-b-15 cur-po" unselectable onClick={ () => {this.addText("SubHeading", 25, 25)}}>Add SubHeading</div>
                        <div className="col-xs-12 fs-20 lh-20 m-t-15 m-b-15 cur-po" unselectable onClick={ () => {this.addText("Body", 20, 20)}}>Add body text</div>
                        <div className="col-xs-12 fs-17 lh-17 m-t-15 m-b-15 cur-po" unselectable onClick={ () => {this.addText("Small", 17, 17)}}>Add small text</div>
                    </div>
                );
            default:
                break;
        }
    }

    render() {
        return (
            <div id="sideBar">
                {this.renderTools()}                
                <div id="toolPanel">
                    <div className="col-xs-12 fs-25  m-t-25 m-b-20 cur-def">{this.state.panel}</div>
                    {this.renderToolPanel()}
                </div>                
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        activeSideBar, 
        activeSidePanel,
        loadMoreImage,
        addObject,
    }, dispatch);
}


function mapStateToProps(state) {
    return {
        sideBar: state.sideBar,
        editor: state.editor,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(SideBar);


// {this.state.photos.map( (photo) => { return (
//     <div key={Math.random()} className="item image"><img src={photo.img} onClick={ () => {this.addImage(template.img)}} /></div>
// )})}

