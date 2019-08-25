import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import { ProfileView, About } from './View'
import { BodyWrapper, Body } from '../styles'

export default function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <BodyWrapper>
          <Body>
            <Switch>
              <Route exact path="/" component={About} />
              <Route exact path="/about" component={About} />
              <Route exact strict path="/:account" component={ProfileView} />
            </Switch>
          </Body>
        </BodyWrapper>
      </BrowserRouter>
    </div>
  )
}
