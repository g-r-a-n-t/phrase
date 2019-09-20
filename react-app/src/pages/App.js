import React, { useState } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { MediaContext } from 'contexts/media'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Landing from './Landing'
import Account from './Account'
import About from './About'
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
          <Row style={{marginBottom: '300px'}}>
            <Col lg={{ size: 10, offset: 1 }}>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
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
