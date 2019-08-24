import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from '../components/Header'
import Profile from './Profile'
import About from './About'

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
              <Route exact path={[
                '/'
              ]} component={About} />
              <Route path={[
                '/about'
              ]} component={About} />
              <Route path={[
                '/'
              ]} component={Profile} />
            </Switch>
          </Body>
        </BodyWrapper>
      </BrowserRouter>
    </div>
  )
}
