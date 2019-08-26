import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import { ViewProfile, About } from './View'
import { CreatePhrase } from './Create'
import { BodyWrapper, Body } from '../styles'

export default function App () {
  // TODO: App should not load without having an ipfs instance and connector
  // If it does fail to load these things, it should provide an informative message

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <BodyWrapper>
          <Body>
            <Switch>
              <Route exact path="/" component={About} />
              <Route exact path="/about" component={About} />
              <Route exact path="/create/phrase" component={CreatePhrase} />
              <Route exact strict path="/:account" component={ViewProfile} />
            </Switch>
          </Body>
        </BodyWrapper>
      </BrowserRouter>
    </div>
  )
}
