import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useProfile, useExpressedSentiments } from '../hooks/useEntity'
import { PhraseList } from '../components/Phrase'
import { SentimentGrid } from '../components/Sentiment'
import { ProfileInfo } from '../components/ProfileInfo'
import { sentimentsToPhrases } from '../tools/transformers'
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
        <div className="border border-light rounded">
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

function ExpressedSentimentsGrid ({ keys }) {
  debug.componentRender('ExpressedSentimentsGrid', keys)

  const expressedSentiments = useExpressedSentiments(keys)

  if (expressedSentiments == null) return <Spinner type="grow" color="secondary" />

  const sentiments = sentimentsToPhrases(Object.values(expressedSentiments))

  return (
    <SentimentGrid keys={Object.keys(sentiments)} onSelect={(key) => {
      console.log(key)
    }}/>
  )
}
