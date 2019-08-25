import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import { ProfileView, About } from './View'

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Body = styled.div`
  width: 1200px;
  margin-top: 20px;
  margin-bottom: 20px;
`

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
