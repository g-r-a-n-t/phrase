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

  const account = match.params.account
  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo account={account} />
      </Col>
      <Col>
        <div className="border border-ligh rounded">
          <ExpressedSentimentGrid keys={profile.expressedSentiments} />
        </div>
        <br />
        <div className="border border-ligh rounded">
          <PhraseList keys={profile.phrases} />
        </div>
      </Col>
    </Row>
  )
}

ViewProfile.propTypes = {
  match: PropTypes.object.isRequired
}
