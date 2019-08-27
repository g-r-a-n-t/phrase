import React, { useState } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Nav, NavLink, NavItem,
  TabPane, TabContent,
  Spinner
} from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { PhraseList } from '../../components/Phrase'
import { Clickable } from '../../styles'
import { ProfileInfo } from '../../components/ProfileInfo'
import { ExpressedSentimentGrid } from '../../components/ExpressedSentiment'

// TODO: Should hande a profile that does not have content and generate a default profile picture
export default function ViewProfile ({ match }) {
  console.log('Rendering ProfileView (account): ', match.params.account)

  const [activeTab, setActiveTab] = useState('1')

  const account = match.params.account
  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo account={account} />
      </Col>
      <Col>
        <Nav tabs>
          <NavItem>
            <Clickable>
              <NavLink
                className={classnames({ active: activeTab === '1' })}
                onClick={() => { setActiveTab('1') }}
              >
                phrases
              </NavLink>
            </Clickable>
          </NavItem>
          <NavItem>
            <Clickable>
              <NavLink
                className={classnames({ active: activeTab === '2' })}
                onClick={() => { setActiveTab('2') }}
              >
                sentiments
              </NavLink>
            </Clickable>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <PhraseList keys={profile.phrases} />
          </TabPane>
          <TabPane tabId="2">
            <ExpressedSentimentGrid keys={profile.expressedSentiments} />
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  )
}

ViewProfile.propTypes = {
  match: PropTypes.object.isRequired
}
