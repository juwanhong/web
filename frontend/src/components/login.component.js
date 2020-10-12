import React, { Component } from 'react';
import {Redirect, Route} from 'react-router-dom';
import axios from 'axios';

// import LoginService from '../services/LoginService';
import ListNote from "./list-note.component";


export default class Login extends Component {
    constructor(props) {
        super(props);


        this.state = {
            username: '',
            password: '',
            loginSuccess: false,
            error: '',
            redirectTo: '',
        };
    }

    componentWillUnmount() {
    	console.log('login unmount')
    }

    handleOnChangeUsername = e => {
    	this.setState({
    		username: e.target.value
    	});
    }

    handleOnChangePassword = e => {
    	this.setState({
    		password: e.target.value
    	});
    }

    onSubmit = async e => {
    	const data = {
    		username: this.state.username,
    		password: this.state.password,
    	};
    	console.log(data)

    	axios.post('http://192.168.0.22:5000/auth/login', {
    		username: this.state.username,
    		password: this.state.password
    	},{withCredentials: false})
    		.then(res => {
                console.log('login response: ')
                console.log(res)
                if (res.status === 200) {
                    // update App.js state
                    this.setState({
                        loginSuccess: true,
                        username: res.data.username,
                        redirectTo: '/list-notes'
                    })
                    console.log(this.state.username)
                }
            }).catch(error => {
                console.log('login error: ')
                console.log(error);
                
            })
    	// const loginResult = await LoginService(data);

    	// if (loginResult.status === 200) {
    	// 	this.setState({
    	// 		loginSuccess: true,
    	// 		error: false,
    	// 		username: loginResult.data.username
    	// 	});
    	// 	console.log('login success');

    	// } else {
    	// 	this.setState({
    	// 		loginSuccess: false,
    	// 		error: true
    	// 	})
    	// 	console.log('login fail');
    	// }

    	// if (this.state.loginSuccess) {

    	// }
    }

    render() {
    	if(this.state.loginSuccess) {
    		return (
    			<Redirect to={this.state.redirectTo} />
    			// <Route path="/list-note" component={ListNote}/>
    			)
    	}
    	return (
    		<div className="Login">
    			<h1>Login</h1>
    			<form onSubmit={this.onSubmit}>
    				<div className="fields">
    					<p>Username</p>
    					<input type="text" name="Username" onChange={this.handleOnChangeUsername} />
    				</div>
    				<div className="fields">
    					<p>Password</p>
    					<input type="password" name="Password" onChange={this.handleOnChangePassword} />
    				</div>
    				<div className="buttons">
    					<button type="button" onClick={this.onSubmit} className="btn btn-primary">Login</button>
    				</div>
    			</form>
    		</div>
    	)
    }

}
