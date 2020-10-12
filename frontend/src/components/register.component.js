import React, { Component } from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import {Redirect} from 'react-router-dom'

// import { UserRegister, UsernameValidate, EmailValidate } from '../services/RegisterService';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            email: '',
            redirectTo: null
        }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange(event) {
    	this.setState({
    		[event.target.name]: event.target.value
    	})
    }
   

    onSubmit(event) {
    	event.preventDefault();
    	const data = {
    		username: this.state.username,
    		password: this.state.password,
    		email: this.state.email
    	};

    	// const registerStatus = await UserRegister(data);

    	axios.post('http://192.168.0.22:5000/auth/register', {
    		username: this.state.username,
    		password: this.state.password,
    		email: this.state.email
    	})
		.then(res => {
				console.log(res)
				if (!res.data.err) {
					console.log('successful signup')
					this.setState({ //redirect to login page
						redirectTo: '/auth/login'
					})
				} else {
					console.log('username already taken')
				}
			}).catch(error => {
				console.log('signup error: ')
				console.log(error)

			})
		}



    render() {
    	if (this.state.redirectTo) {
    		return <Redirect to={{pathname: this.state.redirectTo}} />
    	}

    	return(
    		<div className="Register">
    			<h1>Register</h1>
    			<form onSubmit={this.onSubmit}>
    			<div>
    				<div className="field">
    					<p>Username</p>
    					<input 
    						type="text" 
    						name="username"
    						value={this.state.username} 
    						onChange={this.handleChange}/>
    				</div>
    				<div className="field">
    					<p>Password</p>
    					<input 
    						type="password"
    						name="password"
    						value={this.state.password}
    						onChange={this.handleChange}/>
    				</div>
    				<div className="field">
    					<p>Email</p>
    					<input 
    						type="email"
    						name="email"
    						value={this.state.email}
    						onChange={this.handleChange}/>
    				</div>
    				<div className="buttons">
    					<button 
    						type="submit" 
    						className="btn btn-primary">Register</button>
    				</div>
    			</div>
    			</form>
    		</div>
    	)
    }
}
