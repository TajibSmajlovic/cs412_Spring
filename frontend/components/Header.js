import React, { Component } from 'react'
import { Link } from 'react-router-dom'


class Header extends Component {

    render () {
      return (
        <div>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/140302063s">140302063s</Link>
          </li>
          <li>
            <Link to="/custom">Custom</Link>
          </li>
       </div>
     )
   }
 }
 export default Header
