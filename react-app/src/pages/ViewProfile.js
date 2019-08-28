import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useProfile } from '../hooks/useEntity'
import { PhraseList } from '../components/Phrase'
import { ProfileInfo } from '../components/ProfileInfo'
import { ExpressedSentimentGrid } from '../components/ExpressedSentiment'
import debug from '../tools/debug'

// TODO: Should hande a profile that does not have content and generate a default profile picture
export default function ViewProfile ({ match }) {
  debug.componentRender('ViewProfile', match.params.account)

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
