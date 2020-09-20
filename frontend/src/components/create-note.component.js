import React, { Component } from 'react';
import axios from 'axios';

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
            image: ''
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

        const note = {
            title: this.state.title,
            username: this.state.username,
            text: this.state.text,
            image: this.state.image
        };

        axios.post('http://localhost:5000/notes/add', note)
            .then(res => console.log(res.data));

        this.setState({
            title: '',
            username: '',
            text: '',
            date: '',
            image: ''
        });
    }

    render() {
        return (
            <div>
    			<h3>Create New Note</h3>
    			<form onSubmit={this.onSubmit}>
    				<div className="form-group">
    					<label>Title</label>
    					<input type="text" className="form-control" value={this.state.title} onChange={this.onChangeTitle}/>
    				</div>
    				<div className="form-group">
    					<label>Username</label>
    					<input type="text" className="form-control" value={this.state.username} onChange={this.onChangeUsername}/>
    				</div>
    				<div className="form-group">
    					<label>Text</label>
    					<input type="text" className="form-control" value={this.state.text} onChange={this.onChangeText}/>
    				</div>
    				<div className="form-group">
    					<label>Image</label>
    					<Notepad></Notepad>
    				</div>
    				<div className="form-group">
            			<input type="submit" value="Create Note" className="btn btn-primary" />
          			</div>
    			</form>
    		</div>
        )
    }


}