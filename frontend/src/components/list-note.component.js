import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Note = props => (
    <tr>
		<td>{props.note.title}</td>
		<td>{props.note.username}</td>
		<td>{props.note.text}</td>
		<td>{props.note.date.substring(0,10)}</td>
		<td>
     	<Link to={"/edit/"+props.note._id}>edit</Link> | <a href="#" onClick={() => { props.deleteNote(props.note._id) }}>delete</a>
    	</td>
	</tr>
)

export default class ListNote extends Component {
    constructor(props) {
        super(props);

        this.state = { notes: [] };
    }

    componentDidMount() {
        axios.get('http://localhost:5000/notes')
            .then(res => {
                this.setState({ notes: res.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteNote(id) {
        axios.delete('http://localhost:5000/notes/' + id)
            .then(res => { console.log(res.data) });

        this.setState({
            notes: this.state.notes.filter(el => el._id !== id)
        })
    }

    listNote() {
    	return this.state.notes.map(curNote => {
    		return <Note note={curNote} deleteNote={this.deleteNote} key={curNote._id}/>;
    	})
    }

    render() {
    	return ( 
    		<div>
    			<h3>Notes</h3>
    			<table className="table">
    				<thead className="thead-light">
    					<tr>
    						<th>Title</th>
    						<th>Username</th>
    						<th>Text</th>
    						<th>Date</th>
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


