import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CanvasDraw from 'react-canvas-draw'


const Note = props => (
    <tr>
		<td>{props.note.title}</td>
		<td>{props.note.username}</td>
		<td>{props.note.text}</td>
		<td>{props.note.date.substring(0,10)}</td>
		<td><CanvasDraw ref={canvasDraw => (ListNote.loadableCanvas = canvasDraw)} disabled hideGrid saveData={props.note.image} /></td>
		<td>
     	<Link to={"/edit/"+props.note._id}>edit</Link> | <a href="#" onClick={() => { props.deleteNote(props.note._id) }}>delete</a>
    	</td>
	</tr>
)

export default class ListNote extends Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            username: ''
        };
    }

    componentDidMount() {
        console.log('list-note mounted')
        axios.get('http://192.168.0.22:5000/notes/', { withCredentials: true })
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch((error) => {
                console.log(error);
            })
        // axios.get('http://localhost:5000/auth/user')
        //     .then(res => {
        //         console.log(res.data)
        //         if (!!res.data.user) {
        //             console.log(res.data.user.username)
        //             this.setState({
        //                 username: res.data.user.username
        //             })
        //         } else {
        //             this.setState({
        //                 username: null
        //             })
        //         }
        //     })
        // axios.get('http://localhost:5000/notes/' + this.state.username)
        //     .then(res => {
        //         this.setState({ notes: res.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })
    }

    getUsername() {
        axios.get('http://192.168.0.22:5000/auth/user')
            .then(res => {
                console.log(res.data)
                if (!!res.data.user) {
                    console.log(res.data.user.username)
                    this.setState({
                        username: res.data.user.username
                    })
                } else {
                    this.setState({
                        username: null
                    })
                }
            })
    }

    deleteNote(id) {
        axios.delete('http://192.168.0.22:5000/notes/' + id)
            .then(res => { console.log(res.data) });

        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
        })
    }

    listNote() {
        // this.loadCanvas()
        // axios.get('http://192.168.0.22:5000/notes/',{withCredentials: true})
        //     .then(res => {
        //         this.setState({ notes: res.data })
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //     })

        console.log(this.state.notes)
        return this.state.notes.map(curNote => {
            return (
                <Note note={curNote} deleteNote={this.deleteNote} key={curNote._id} load={this.loadCanvas}/>
            )
        })
    }

    loadCanvas() {
        this.loadableCanvas.loadSaveData(this.state.notes.image)
    }

    render() {
        // if (!this.state.username) {
        // this.getUsername()
        // }
        return (
            <div>
    			<h3>Notes</h3>
    			<h4>{this.state.username}</h4>
    			<table className="table">
    				<thead className="thead-light">
    					<tr>
    						<th>Title</th>
    						<th>Username</th>
    						<th>Text</th>
    						<th>Date</th>
    						<th>Image</th>
    					</tr>
    				</thead>
    				<tbody>
						{this.listNote()}
    				</tbody>
    			</table>
    		</div>
        )
    }
}

//    					{this.listNote()}