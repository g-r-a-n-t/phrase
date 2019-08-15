import React from 'react'
import styled from 'styled-components'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Header from "./components/Header"
import Profile from "./pages/Profile";

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
`

const Body = styled.div`
  width: 1000px;
  margin-top: 20px;
`


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <BodyWrapper>
          <Body>
            <Switch>
              <Route exact path={[
                "/profile"
              ]} component={Profile} />
            </Switch>
          </Body>
        </BodyWrapper>
      </BrowserRouter>
    </div>
  );
}

export default App;
