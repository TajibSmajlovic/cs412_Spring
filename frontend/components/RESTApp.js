import React, {Component} from 'react'
//import './App.css'

import axios from 'axios'

class RESTApp extends Component {
    constructor() {
        super()
        this.state = {
            users: []
        }

        this.handleClick = this.handleClick.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.handleClick1 = this.handleClick1.bind(this);
        this.handleClick2 = this.handleClick2.bind(this);
    }

    handleClick() {
        axios.get('http://localhost:3000/users')
            .then(response => this.setState({users: response.data}))
        //.then(response => console.log(response))
    }

    handleClear() {
        this.setState({users: []})
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    handleClick1(event) {
        event.preventDefault();
        console.log(event)
        let name = document.getElementById("name").value
        //event.target.value
        console.log(name)
        axios.get('http://localhost:3000/userByName?name=' + name, {"name": name})
            .then(response => this.setState({users: response.data}))
    }

    handleClick2(event) {
        event.preventDefault();
        console.log(event)
        let email = document.getElementById("name").value
        //event.target.value
        console.log(email)
        axios.get('http://localhost:3000/userByEmail?email=' + email, {"name": email})
            .then(response => this.setState({users: response.data}))
    }

    render() {
        return (
            <div>
                <button className='button' onClick={this.handleClick}>Show all users</button>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Enter the name or email to search</label>
                    <input id="name" type="text" name="name"/>
                    <input onClick={this.handleClick1} id="button1" type="submit" name="FilterName"
                           value="Filter user"/>
                    <input onClick={this.handleClick2} id="button2" type="submit" name="FilterEmail"
                           value="Filter email"/>
                </form>
                <table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.state.users.map((user, key) => {
                        return (
                            <tr key={key}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                            </tr>
                        )
                    })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

export default RESTApp
