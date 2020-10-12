import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./components/home.component";
import Resume from "./components/resume.component";

import CreateNote from "./components/create-note.component";
import ListNote from "./components/list-note.component";

import Register from "./components/register.component";
import Login from "./components/login.component";


class App extends Component {

    constructor() {
        super()
        this.state = {
            loginSuccess: false,
            username: null
        }
    }

    componentDidMount() {
        // axios.get('http://localhost:5000/auth/user')
        //     .then(res => {
        //         console.log(res.data)
        //         if (!!res.data.user) {
        //             console.log(res.data.user.username)
        //             this.setState({
        //                 loginSuccess: true,
        //                 username: res.data.user.username
        //             })
        //         } else {
        //             this.setState({
        //                 loginSuccess: false,
        //                 username: null
        //             })
        //         }
        //     })
    }


    render() {
      const username = this.state.username
      console.log(username)
        return (
            <Router>
            <h4>{username}</h4>
          <div className="container">
            <div className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="navbar-header">
                <a className="navbar-brand" href="/">Juwan Hong</a>
              </div>
              <div className="navbar-collapse collapse">
                <ul className="navbar-nav ml-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/resume" className="nav-link">Resume</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/create-note" className="nav-link">Create Note</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/list-note" className="nav-link">List Notes</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/auth/login" className="nav-link">Login</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/auth/register" className="nav-link">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
            <Route path="/" exact component={Home}></Route>
            <Route path="/resume" component={Resume}></Route>
            <Route path="/create-note" component={CreateNote}></Route>
            <Route path="/list-note" component={ListNote} username={this.state.username}></Route>
            <Route path="/auth/login" component={Login}></Route>
            <Route path="/auth/register" component={Register}></Route>
          </div>
        </Router>
        )
    }
}

export default App;