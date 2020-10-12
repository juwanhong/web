import React, { Component } from 'react';
import axios from 'axios';
import DrawableCanvas from 'react-drawable-canvas'
import CanvasDraw from 'react-canvas-draw'
import { Redirect } from 'react-router-dom'

import Notepad from "./notepad.component";

export default class CreateNote extends Component {
    constructor(props) {
        super(props);

        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeImage = this.onChangeImage.bind(this);
        this.onChangeText = this.onChangeText.bind(this);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            title: '',
            username: '',
            text: '',
            date: '',
            image: '',
            redirectTo: '',
        }
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        })
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        })
    }

    onChangeImage(e) {
        this.setState({
            image: e.target.value
        })
    }

    onChangeText(e) {
        this.setState({
            text: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const image = this.saveableCanvas.getSaveData()
        // const imgpng = this.saveableCanvas.canvasContainer.children[1].toDataURL('image/png')
        // const imgpng = this.saveableCanvas.canvasContainer.children[1].toBlob('image/png')
        const note = {
            title: this.state.title,
            // username: this.state.username,
            text: this.state.text,
            image: image,
        };

        let formData = new FormData()
        formData.append('title', this.state.title)
        // formData.append('username', this.state.username)
        formData.append('text', this.state.text)
        formData.append('image', image)

        var self = this

        this.saveableCanvas.canvasContainer.children[1].toBlob(function(blob) {
            console.log(blob)
            formData.append('imgpng', blob, 'temp.png')
            console.log(formData.get('imgpng'))

            const axios_config = {
                headers: {
                    'content-type': 'multipart/form-data'
                },
                withCredentials: true
            }


            axios.post('http://192.168.0.22:5000/notes/add', formData, axios_config)
                .then(res => {
                    console.log('create-note response: ')
                    console.log(res)
                    if (res.status === 200) {
                        // update App.js state
                        console.log('create-note success')
                        self.setState({
                            redirectTo: '/list-notes'
                        })

                    }

                })
        })
    }


    render() {

        if (this.state.redirectTo) {
            return <Redirect to={{pathname: this.state.redirectTo}} />
        }

        const style = {
            brushColor: '#000000',
            lineWidth: 10,
            canvasStyle: {
                backgroundColor: '#FFFFFF',
                borderColor: '000000',
                borderStyle: 'solid',
            }
        };

        const canvasProps = {
            brushRadius: 5,
            brushColor: '#000000',
            lazyRadius: 2,
            hideGrid: true,
            canvasWidth: 1000,
            canvasHeight: 1000,
        }

        return (
            <div>
    			<h3>Create New Note</h3>
    			<form onSubmit={this.onSubmit}>
    				<div className="form-group">
    					<label>Title</label>
    					<input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
    				</div>
    				<div className="form-group">
    					<label>Text</label>
    					<input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText}/>
    				</div>
    				<div className="form-group form-group-lg">
    					<label>Image</label>
    					{/*<Notepad></Notepad> --> */}
    					{/*<DrawableCanvas {...style}/> */}
    					<CanvasDraw ref={canvasDraw => (this.saveableCanvas = canvasDraw)} {...canvasProps}/>
    				</div>
    				<div className="form-group">
            			<input type="submit" value="Create Note" className="btn btn-primary" />
          			</div>
    			</form>
    		</div>
        )


    }


}