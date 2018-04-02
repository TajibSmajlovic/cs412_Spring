import React from 'react'
import ReactDOM from 'react-dom'

import UserGrid from './components/UserGrid'
import Grid from './components/Grid'
import UserDetail from './components/UserDetail'
import Dashboard from './components/Dashboard'
import Custom from './components/Custom'

import { BrowserRouter, Route } from 'react-router-dom'

const router = (
  <BrowserRouter>
    <Route
      render={props => (
          <div>
          <Route location={location} path='/' exact component={Dashboard} />
          <Route location={location} path='/users' exact component={UserGrid} />
          <Route location={location} path='/user/:userId' exact component={UserDetail} />
          <Route location={location} path='/Grid' exact component={Grid}/>

          <Route location={location} path='/custom' exact component={Custom} />
          </div>
        )}
    />
  </BrowserRouter>
)

ReactDOM.render(router, document.getElementById('app'))
