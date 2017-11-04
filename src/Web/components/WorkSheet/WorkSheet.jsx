import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Draggable from 'react-draggable';

import {
    clearState,
    pushToTemp,
    popFromTemp,
    showToolBar
} from '../../../Redux';

const basicObject = {
    originX: 'center',
    originY: 'center',
    flipX: false,
    flipY: false,
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
    strokeStyle: '',
    backgroundColor: '',
    textBackgroundColor: '',
    useNative: true,
};

class WorkSheet extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editor: props.editor,
            category: JSON.parse(localStorage.getItem('category'))
        }
        const projectSize = {
            width: this.state.category.width + 100,
            height: this.state.category.height + 100,
            padding: 50,
            position: 'relative',
        };
        const x = window.innerWidth > projectSize.width + 360;
        const y = window.innerHeight > projectSize.height + 100;
        let centerStyle;
        if (x) {
            centerStyle = {
                left: '50%',
                transform: 'translateX(-50%)',
            };
        }
        if (y) {
            centerStyle = {
                top: '50%',
                transform: 'translateY(-50%)',
            };
        }
        if (x && y) {
            centerStyle = {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            };
        }
        this.style = Object.assign({}, projectSize, centerStyle)
        this.deleteObject = this.deleteObject.bind(this)
        this.showToolBar = this.showToolBar.bind(this)
        this.updateObject = this.updateObject.bind(this)        
    }

    componentDidMount() {
        this.workSheet = new fabric.Canvas('workSheet-canvas')
        this.workSheet.on('object:selected', this.showToolBar)
        this.workSheet.on('selection:cleared', event => {this.props.showToolBar(false)})

        let temp = localStorage.getItem("canvas")
        if(temp) {
            console.log(JSON.parse(temp))
            this.workSheet.loadFromJSON(JSON.parse(temp))
        }

        document.body.addEventListener('keydown', this.keydown.bind(this), false);
    }

    componentWillReceiveProps(nextProps) {
        localStorage.setItem('editor', nextProps.editor)
        this.setState({ editor: nextProps.editor }, () => {
            this.addNewObject()
            this.addTempObject()
            this.updateObject()
            this.clearState()
        }, () => {
            localStorage.setItem("canvas", JSON.stringify(this.workSheet))
        })
    }

    showToolBar(event) {
        this.props.showToolBar(true, this.workSheet.getActiveObject())
    }

    addNewObject() {
        if(this.state.editor.newObject) {
            let object = this.state.editor.newObject
            switch(object.type) {
                case 'i-text':
                    let newObject = new fabric.IText(object.data.context, object.data.property);
                    this.workSheet.add(newObject);
                    break;
                case 'image':
                    fabric.Image.fromURL(object.data.context, (oImg) => {this.workSheet.add(oImg)}, object.data.property );
                    break;
                case 'shape':
                    fabric.loadSVGFromURL(object.data.context, (objects, options) => {
                        var shape = fabric.util.groupSVGElements(objects, Object.assign({}, options, { cornerStyle: 'circle' }))

                        // var group = new fabric.PathGroup(objects, {});
                    this.workSheet.add(shape);
                });
                break;
            default:
                break;
            }
        }
    }

    addTempObject() {
        if(this.state.editor.tempObject) {
            if( Array.isArray(this.state.editor.tempObject)) {
                 for(let object of this.state.editor.tempObject) {
                    let temp = Object.assign({}, object, basicObject)
                    this.workSheet.add(temp) 
                 }
                 

            } else {
                this.workSheet.add(this.state.editor.tempObject);
            }
        }
    }

    updateObject() {
        let object = this.workSheet.getActiveObject()
        if(object && this.props.editor.updateObject) {
            object.set(this.props.editor.updateObject.property, this.props.editor.updateObject.value)
            this.workSheet.renderAll()
        }
    }

    clearState() {
        if (this.state.editor.newObject || this.state.editor.tempObject || this.props.editor.updateObject) {
            this.props.clearState();
        }
    }

    deleteObject() {
        let object = this.workSheet.getActiveGroup();
        if (object) {
            let temp = []
            let temp1 = []
            object.forEachObject( a => { temp.push(this.workSheet.remove(a)); temp1.push(a) } )
            console.log(temp, temp1)

            this.workSheet.discardActiveGroup();
            this.workSheet.deactivac-Teall().renderAll()
        } else {
            object = this.workSheet.getActiveObject()
            this.props.pushToTemp(object)
            object.remove()

        }
    }

    keydown(event) {
        switch (event.key) {
        case 'Delete':
            this.deleteObject();
            break;
        case 'z':
            if (event.ctrlKey) {
                this.props.popFromTemp();
            }
            break;
        default:
            break;
        }
    }

    render() {
        return (
            <div id="workSheet" style={this.style} >
                <canvas id="workSheet-canvas" width={this.state.category.width} height={this.state.category.height}/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        editor: state.editor,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        clearState,
        pushToTemp,
        popFromTemp,
        showToolBar
    }, dispatch);
}

// <canvas id="workSheet-canvas" width={this.props.editor.width} height={this.props.editor.height}/>

export default connect(mapStateToProps, mapDispatchToProps)(WorkSheet);
