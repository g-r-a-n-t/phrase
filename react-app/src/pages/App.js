import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { MediaContext } from 'contexts/media'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Account from './Account'
import About from './About'
import { CreatePhrase, CreateSentiment } from './Create'
import { Row, Col } from 'reactstrap'

export default function App () {
  // TODO: App should not load without having an ipfs instance and connector
  // If it does fail to load these things, it should provide an informative message
  const [selectedMedia, setSelectedMedia] = useState(null)

  return (
    <div className="App" style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Header />
        <br/>
        <MediaContext.Provider value={[selectedMedia, setSelectedMedia]}>
          <Row>
            <Col lg={{ size: 10, offset: 1 }}>
              <Switch>
                <Route exact path="/" component={About} />
                <Route exact path="/about" component={About} />
                <Route exact path="/create/phrase" component={CreatePhrase} />
                <Route exact path="/create/sentiment" component={CreateSentiment} />
                <Route exact strict path="/:account" component={Account} />
              </Switch>
            </Col>
          </Row>
          <Footer />
        </MediaContext.Provider>
      </BrowserRouter>
    </div>
  )
}
