import React, { Component } from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import Home from "./components/home.component";
import Resume from "./components/resume.component";

import CreateNote from "./components/create-note.component";
import ListNote from "./components/list-note.component";

import Register from "./components/register.component";
import Login from "./components/login.component";


class App extends Component {
    render() {
        return (
          <Router>
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
                      <Link to="/login" className="nav-link">Login</Link>
                    </li>
                    <li className="navbar-item">
                      <Link to="/register" className="nav-link">Register</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <Route path="/" exact component={Home}></Route>
              <Route path="/resume" component={Resume}></Route>
              <Route path="/create-note" component={CreateNote}></Route>
              <Route path="/list-note" component={ListNote}></Route>
              <Route path="/login" component={Login}></Route>
              <Route path="/register" component={Register}></Route>
            </div>
          </Router>
        )
    }
}

export default App;