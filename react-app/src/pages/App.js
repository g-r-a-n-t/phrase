import React, { useState, useEffect } from 'react'
import { useWeb3Context } from 'web3-react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import { MediaContext } from 'contexts/media'
import { useIpfsContext } from 'contexts/ipfs'
import Header from 'components/Header'
import Footer from 'components/Footer'
import Landing from './Landing'
import Account from './Account'
import PhraseView from './Phrase'
import About from './About'
import { Row, Col } from 'reactstrap'

import Loading from './Loading'

export default function App () {
  // TODO: App should not load without having an ipfs instance and connector
  // If it does fail to load these things, it should provide an informative message
  const [selectedMedia, setSelectedMedia] = useState(null)

  const web3 = useWeb3Context()
  const ipfs = useIpfsContext()

  useEffect(() => {
    web3.setFirstValidConnector(['MetaMask'])
  }, [web3])

  if (ipfs == null) return <Loading>Loading IPFS...</Loading>

  if (!web3.active && !web3.error) return <Loading>Loading web3...</Loading>
  else if (web3.error) return <p>error loading web3</p>

  return (
    <div className="App text-dark" style={{ overflowX: 'hidden' }}>
      <BrowserRouter>
        <Header />
        <br/>
        <MediaContext.Provider value={[selectedMedia, setSelectedMedia]}>
          <Row style={{ marginBottom: '300px' }}>
            <Col lg={{ size: 10, offset: 1 }}>
              <Switch>
                <Route exact path="/" component={Landing} />
                <Route exact path="/about" component={About} />
                <Route exact strict path="/:account" component={Account} />
                <Route exact strict path="/p/:key" component={PhraseView} />
              </Switch>
            </Col>
          </Row>
          <Footer />
        </MediaContext.Provider>
      </BrowserRouter>
    </div>
  )
}
