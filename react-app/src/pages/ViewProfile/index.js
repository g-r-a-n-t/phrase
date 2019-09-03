import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { PhraseList } from '../../components/Phrase'
import { ProfileInfo } from '../../components/ProfileInfo'
import debug from '../../tools/debug'

import { ExpressedSentimentsGrid } from './ExpressedSentimentsGrid'

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
        <div className="d-flex justify-content-around border border-light rounded">
          <ExpressedSentimentsGrid keys={profile.expressedSentiments} />
        </div>
        <br />
        <div className="border border-light rounded">
          <PhraseList keys={profile.phrases} />
        </div>
      </Col>
    </Row>
  )
}

ViewProfile.propTypes = {
  match: PropTypes.object.isRequired
}
