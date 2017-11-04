import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Select from 'react-select';
import { SketchPicker, CirclePicker, PhotoshopPicker } from 'react-color'
import { Scrollbars } from 'react-custom-scrollbars';
import Slider from 'react-rangeslider'
import InputRange from 'react-input-range';

import { updateObject, popFromTemp } from '../../../Redux';
import { FONTS, FONT_SIZES, IC_UPPERCASE, TOOLS } from '../../resources';

import 'react-input-range/lib/css/index.css'


class ToolBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false,
            barType: '',
            dropDownMenu: null,
        }

        //Text Update
        this.updateFontFamily = this.updateFontFamily.bind(this)
        this.updateFontSize = this.updateFontSize.bind(this)
        this.updateFontColor = this.updateFontColor.bind(this)
        this.updateFontWeight = this.updateFontWeight.bind(this)
        this.updateFontStyle = this.updateFontStyle.bind(this)
        this.updateTextAlign = this.updateTextAlign.bind(this)
        this.updateTextDecoration = this.updateTextDecoration.bind(this)
        this.updateLineHeight = this.updateLineHeight.bind(this)
        this.updateCharSpacing = this.updateCharSpacing.bind(this)

        //Image Update
        this.updateBrightness = this.updateBrightness.bind(this)
        this.updateContrast = this.updateContrast.bind(this)
        this.renderToolBar = this.renderToolBar.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.editor && nextProps.editor.object) {
            console.log(nextProps.editor.object)
            switch(nextProps.editor.object.get('type')) {
                case 'i-text':
                    this.setState({
                        active: nextProps.editor.toolBar,
                        barType: nextProps.editor.object.get('type'),
                        fontFamily: nextProps.editor.object.get('fontFamily'),
                        fontSize: nextProps.editor.object.get('fontSize'),
                        fontColor: nextProps.editor.object.get('fill'),
                        fontStyle: nextProps.editor.object.get('fontStyle'),
                        textAlign: nextProps.editor.object.get('textAlign'),
                        textDecoration: nextProps.editor.object.get('textDecoration'),
                        lineHeight: nextProps.editor.object.get('lineHeight'), 
                        charSpacing: nextProps.editor.object.get('charSpacing'),
                    }, () => {
                        this.refs.fontSize.value = this.state.fontSize
                    })
                    break
                default:        
                    this.setState({
                        active: nextProps.editor.toolBar,
                        barType: nextProps.editor.object.get('type'),
                    })
                    break
            }
        } else {
            this.setState({
                active: false,
                dropDownMenu: null,
            })
        }
        
        
    }

    updateFontFamily(font) {
        this.setState({
            fontFamily: font,
            dropDownMenu: null
        }, () => {
            this.props.updateObject('fontFamily', font)
        })
    }

    updateFontSize(size) {
        this.setState({
            fontSize: size,
            dropDownMenu: null
        }, () => {
            this.props.updateObject('fontSize', this.state.fontSize)
            this.refs.fontSize.value = this.state.fontSize
        })
    }

    updateFontColor(color) {
        this.props.updateObject('fill', 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')')
        this.setState({fontColor: 'rgba('+color.rgb.r+','+color.rgb.g+','+color.rgb.b+','+color.rgb.a+')'})
    }

    updateFontWeight() {
        this.props.updateObject('fontWeight', this.state.fontWeight == 'bold' ? 'normal' : 'bold')
        this.setState({fontWeight: this.state.fontWeight == 'bold' ? 'normal' : 'bold'})
    }

    updateFontStyle() {
        this.props.updateObject('fontStyle', this.state.fontStyle == 'italic' ? 'normal' : 'italic')
        this.setState({fontStyle: this.state.fontStyle == 'italic' ? 'normal' : 'italic'})
    }

    updateTextAlign(align) {
        this.props.updateObject('textAlign',align)
        this.setState({
            textAlign: align,
            alignMenu: false
        })
    }

    updateTextDecoration() {
        this.props.updateObject('textDecoration', this.state.textDecoration == 'underline' ? 'none' : 'underline')
        this.setState({textDecoration: this.state.textDecoration == 'underline' ? 'none' : 'underline'})
    }

    updateLineHeight(lh) {
        this.props.updateObject('lineHeight', lh)
        this.setState({lineHeight: lh})
    }

    updateCharSpacing(spacing) {
        this.props.updateObject('charSpacing', spacing)
        this.setState({charSpacing: spacing})
    }

    updateBrightness(value) {

    }

    updateContrast(value) {

    }

    renderToolBar = () => {
        switch(this.state.barType) {
            case 'i-text':
                return (
                    <ul className="nav navbar-nav">
                        <li id="fontFamily" className="m-t-10 m-r-10">
                            <div className={this.state.dropDownMenu == 'fontFamiliy' ? "dropDown active" : "dropDown"} style={{width: 210}} onClick={()=>this.setState({dropDownMenu: 'fontFamily'})}>
                                {this.state.fontFamily}
                                <i className="fa fa-angle-down f-r" aria-hidden="true"></i>
                            </div>
                            <div className={this.state.dropDownMenu == 'fontFamily' ? "menuList active" : "menuList"}>
                                <Scrollbars style={{width: 210, height: 300, maxHeight: '60vh', marginTop: 10, marginBottom: 10}} {...this.props}>
                                    <ul className="p-0"> 
                                        {FONTS.map((font) => <li key={Math.random()}><div className="col-xs-12 lh-30 fs-16" style={{fontFamily: font}} onClick={()=>this.updateFontFamily(font)}>{font}</div></li>)}
                                    </ul>
                                </Scrollbars>
                            </div>
                        </li>
                        <li id="fontSize" className="m-t-10 m-r-10">
                            <div className={this.state.dropDownMenu == 'fontSize' ? "dropDown active" : "dropDown"} onClick={()=>this.setState({dropDownMenu: 'fontSize'})}>
                                <input ref="fontSize" type="number" onChange={()=>this.updateFontSize(this.refs.fontSize.value)} />
                                <i className="fa fa-angle-down f-r" aria-hidden="true"></i>
                            </div>
                            <div className={this.state.dropDownMenu == 'fontSize' ? "menuList active" : "menuList"}>
                                <Scrollbars style={{width: 80, height: 300, maxHeight: '60vh', marginTop: 10, marginBottom: 10}} {...this.props}>
                                    <ul className="p-0"> 
                                        {FONT_SIZES.map((size) => <li key={Math.random()}><div className="col-xs-12 lh-30 fs-16" onClick={()=>this.updateFontSize(size)}>{size}</div></li>)}
                                    </ul>
                                </Scrollbars>
                            </div>
                        </li>
                        <li className="m-t-10 m-r-10">
                            <div className="colorPicker" style={{background: this.state.fontColor}} onClick={()=>this.setState({dropDownMenu: 'colorPicker'})}></div>
                            <div className={this.state.dropDownMenu == 'colorPicker' ? "menuList active" : "menuList"}>
                                <SketchPicker 
                                    color={ this.state.fontColor }
                                    onChangeComplete={ this.updateFontColor }
                                />
                            </div>
                        </li>
                        <li className="m-t-10 m-r-10"><div className={this.state.fontWeight == 'bold' ? "toolButton active" : "toolButton"} onClick={()=>this.updateFontWeight()}><i className="fa fa-bold fs-20" aria-hidden="true"></i></div></li>
                        <li className="m-t-10 m-r-10"><div className={this.state.fontStyle == 'italic' ? "toolButton active" : "toolButton"} onClick={()=>this.updateFontStyle()}><i className="fa fa-italic fs-20" aria-hidden="true"></i></div></li>
                        <li className="m-t-10 m-r-10">
                            <div className={this.state.dropDownMenu == 'textAlign' ? "toolButton active" : "toolButton"} onClick={()=>this.setState({dropDownMenu: 'textAlign'})} >
                                <i className={this.state.textAlign == 'left' ? "fa fa-align-left fs-20" : this.state.textAlign == 'center' ? "fa fa-align-center fs-20" : "fa fa-align-right fs-20"} aria-hidden="true"></i>
                            </div>
                            <div className={this.state.dropDownMenu == 'textAlign' ? "menuList active p-5" : "menuList p-5"} style={{width: 110}}>
                                <div className={this.state.textAlign == "left" ? "toolButton active" : "toolButton"} onClick={()=>this.updateTextAlign('left')}><i className="fa fa-align-left fs-20" aria-hidden="true"></i></div>
                                <div className={this.state.textAlign == "center" ? "toolButton active" : "toolButton"} onClick={()=>this.updateTextAlign('center')}><i className="fa fa-align-center fs-20" aria-hidden="true"></i></div>
                                <div className={this.state.textAlign == "right" ? "toolButton active" : "toolButton"} onClick={()=>this.updateTextAlign('right')}><i className="fa fa-align-right fs-20" aria-hidden="true"></i></div>
                            </div>
                        </li>
                        <li className="m-t-10 m-r-10"><div className={this.state.textDecoration == 'underline' ? "toolButton active" : "toolButton"} onClick={()=>this.updateTextDecoration()}><i className="fa fa-underline fs-20" aria-hidden="true"></i></div></li>
                        <li className="m-t-10 m-r-10">
                            <div className={this.state.spacingMenu ? "letterButton active" : "letterButton"} onClick={()=>this.setState({spacingMenu: true})}>spacing</div>
                            <div className={this.state.spacingMenu ? "menuList active p-10" : "menuList p-10"} style={{width: 200}}>
                                <div>
                                    <p className="m-b-15">LineHeight : </p>
                                    <InputRange                                        
                                        maxValue={5}
                                        minValue={0.5}
                                        formatLabel={value => value.toFixed(1)}
                                        step={0.1}
                                        value={this.state.lineHeight}
                                        onChange={this.updateLineHeight}
                                        onChangeComplete={value => console.log(value)} />
                                </div>
                                <div className="m-b-15">
                                    <p className="m-t-15 m-b-15">Letter Spacing : </p>
                                    <InputRange
                                        className="m-t-15 m-b-15"
                                        maxValue={800}
                                        minValue={-200}
                                        step={10}
                                        value={this.state.charSpacing}
                                        onChange={this.updateCharSpacing}
                                        onChangeComplete={value => console.log(value)} />
                                </div>
                            </div>
                        </li>
                    </ul>
                )
            case 'image':
                return (
                    <ul className="nav navbar-nav">
                        <li className="m-t-10 m-r-10">
                            <div className={this.state.imageFilterMenu ? "letterButton active" : "letterButton"} onClick={()=>this.setState({imageFilterMenu: !this.state.imageFilterMenu})}>Filter</div>
                            <div className={this.state.imageFilterMenu ? "menuList active p-10" : "menuList p-10"} style={{width: 200}}>
                            <div>
                                <p className="m-b-15">Brightness : </p>
                                <InputRange                                        
                                    maxValue={100}
                                    minValue={0}
                                    value={this.state.brightness}
                                    onChange={this.updateBrightness}
                                    onChangeComplete={value => console.log(value)} />
                            </div>
                            <div className="m-b-15">
                                <p className="m-t-15 m-b-15">Contrast : </p>
                                <InputRange
                                    className="m-t-15 m-b-15"
                                    maxValue={100}
                                    minValue={0}
                                    value={this.state.contrast}
                                    onChange={this.updateContrast}
                                    onChangeComplete={value => console.log(value)} />
                            </div>
                        </div>
                        </li>
                    </ul>
                )
            default: 
                break
        }
    }

    render() {
        let barClass = this.state.active ? "navbar navbar-default active" : "navbar navbar-default"
        return (
            <nav id="toolBar" className={barClass}>
                <div className="container-fluid">
                    {this.renderToolBar()}
                    <ul className="nav navbar-nav navbar-right">
                        <li className="m-t-10 m-r-10"><div className="toolButton" onClick={()=>{}}><i className="fa fa-undo fs-20" aria-hidden="true"></i></div></li>
                        <li className="m-t-10 m-r-10"><div className="toolButton" onClick={()=>{}}><i className="fa fa-repeat fs-20" aria-hidden="true"></i></div></li>
                        <li className="m-t-10 m-r-10"><div className="toolButton" onClick={()=>{}}><i className="fa fa-save fs-20" aria-hidden="true"></i></div></li>
                    </ul>
                </div>
            </nav>
        )  
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        updateObject,
        popFromTemp,
    }, dispatch);
}

function mapStateToProps(state) {
    return {
        editor: state.editor,
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ToolBar);
