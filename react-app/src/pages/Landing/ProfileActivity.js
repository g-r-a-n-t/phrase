import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'reactstrap'

import { ProfileThumb } from 'components/Profile'
import { PhraseGrid } from 'components/Phrase'

export default function ProfileActivity ({ profile, createdPhrases = [], expressedSentiments = [] }) {
  return (
    <div className="border border-light rounded" style={{ padding: '5px' }}>
      <Row>
        <Col lg={{ size: 'auto' }}>
          <ProfileThumb _key={ profile } size={ 120 } />
        </Col>
        <Col lg={{ size: 'auto' }}>
          <PhraseGrid keys={ createdPhrases }/>
        </Col>
      </Row>
    </div>
  )
}

ProfileActivity.propTypes = {
  profile: PropTypes.string.isRequired,
  createdPhrases: PropTypes.array,
  expressedSentiments: PropTypes.array
}
