import React, { Component } from 'react';
import Immutable from 'immutable';
import saveSvgAsPng from 'save-svg-as-png';

import './css/notepad.component.css'


export default class Notepad extends Component {
    render() {
        return (
            <div>
        		<h1>Notepad</h1>
        		<DrawArea ref="drawArea"/>
        	</div>
        )
    }
}


class DrawArea extends Component {

    constructor() {
        super();

        this.state = {
            lines: new Immutable.List(),
            isDrawing: false
        };

        this.handleMouseDown = this.handleMouseDown.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.handleMouseUp = this.handleMouseUp.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    componentWillUnmount() {
        document.addEventListener("mouseup", this.handleMouseUp);
    }

    handleMouseDown(mouseEvent) {
        if (mouseEvent.button != 0) {
            return;
        }


        const point = this.relativeCoordinatesForEvent(mouseEvent);

        this.setState(prevState => ({
            lines: prevState.lines.push(new Immutable.List([point])),
            isDrawing: true
        }));
    }

    handleMouseMove(mouseEvent) {
        if (!this.state.isDrawing) {
            return;
        }

        const point = this.relativeCoordinatesForEvent(mouseEvent);

        this.setState(prevState => ({
            lines: prevState.lines.updateIn([prevState.lines.size - 1],
                line => line.push(point))
        }));
    }

    handleMouseUp(mouseEvent) {
        this.setState({ isDrawing: false });
    }

    relativeCoordinatesForEvent(mouseEvent) {
        const boundingRect = this.refs.DrawArea.getBoundingClientRect();
        return new Immutable.Map({
            x: mouseEvent.clientX - boundingRect.left,
            y: mouseEvent.clientY - boundingRect.top
        });
    }


    render() {
        return (
            <div className = "DrawArea" ref = "DrawArea"
                    onMouseDown = { this.handleMouseDown } onMouseMove={this.handleMouseMove}>
                    <div>
                    	<Drawing lines={this.state.lines}/>
                    </div>
                </div>


        );
    }
}

function Drawing({ lines }) {
    return (
        <svg className="drawing">
			{lines.map((line, index) => (
				<DrawingLine key={index} line={line} />
			))}
		</svg>
    );
}

function DrawingLine({ line }) {
    const pathData = "M " + line
        .map(p => {
            return `${p.get('x')} ${p.get('y')}`;
        }).join(" L ");
    return <path className="path" d={pathData} />
}



