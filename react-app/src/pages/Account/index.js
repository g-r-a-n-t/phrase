import React from 'react'
import PropTypes from 'prop-types'
import { IoIosHeart, IoMdHand } from 'react-icons/io'
import {
  Row, Col,
  Spinner,
  Badge
} from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { PhraseGrid } from '../../components/Phrase'
import { ProfileInfo } from '../../components/ProfileInfo'
import { Subtle } from '../../components/Wrappers'
import debug from '../../tools/debug'

import { ExpressedSentimentsGrid } from './ExpressedSentimentsGrid'

// TODO: Should hande a profile that does not have content and generate a default profile picture
export default function Account ({ match }) {
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
          { profile.expressedSentiments.length == 0 ?
            <Subtle>No sentiments have been expressed</Subtle>
          :
            <>
              <Subtle>
                -------- <IoIosHeart size={25}/> --------
              </Subtle>
              <div className="d-flex justify-content-around">
                <ExpressedSentimentsGrid keys={profile.expressedSentiments} />
              </div>
            </>
          }
        </div>
        <br />
        <div className="border border-light rounded">
          { profile.phrases.length == 0 ?
            <Subtle>No sentiments have been expressed</Subtle>
          :
            <>
              <Subtle>
                -------- <IoMdHand size={25}/> --------
              </Subtle>
              <div className="d-flex justify-content-around">
                <PhraseGrid keys={profile.phrases} />
              </div>
            </>
          }
        </div>
      </Col>
    </Row>
  )
}

Account.propTypes = {
  match: PropTypes.object.isRequired
}
