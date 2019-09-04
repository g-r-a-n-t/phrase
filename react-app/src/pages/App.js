import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import Account from './Account'
import About from './About'
import { CreatePhrase } from './Create'
import {
  Row, Col
} from 'reactstrap'

export default function App () {
  // TODO: App should not load without having an ipfs instance and connector
  // If it does fail to load these things, it should provide an informative message

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <br/>
        <Row>
          <Col xs={{size: 8, offset: 2}}>
            <Switch>
              <Route exact path="/" component={About} />
              <Route exact path="/about" component={About} />
              <Route exact path="/create/phrase" component={CreatePhrase} />
              <Route exact strict path="/:account" component={Account} />
            </Switch>
          </Col>
        </Row>
      </BrowserRouter>
    </div>
  )
}
