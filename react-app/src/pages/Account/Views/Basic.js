import React from 'react'
import { IoIosHeart, IoMdHand } from 'react-icons/io'
import { Row, Col, Spinner } from 'reactstrap'

import { useProfile } from 'hooks/useEntity'
import { PhraseGrid } from 'components/Phrase'
import { ProfileInfo } from 'components/Profile'
import { ExpressedSentiments } from './ExpressedSentiments'
import { Subtle } from 'components/Wrappers'

export default function BasicView ({ _key }) {
  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo _key={ _key } />
      </Col>
      <Col>
        { profile.expressedSentiments.length === 0
          && profile.phrases.length === 0 &&
          <Subtle>No Activity :(</Subtle>
        }
        { profile.expressedSentiments.length !== 0 && <>
            <div className="border border-light rounded">
              <Subtle>
                -------- <IoIosHeart size={25}/> --------
              </Subtle>
              <div>
                <ExpressedSentiments keys={ profile.expressedSentiments } />
              </div>
            </div>
            <br />
          </>
        }
        { profile.phrases.length !== 0 && <div className="border border-light rounded">
            <Subtle>
              -------- <IoMdHand size={25}/> --------
            </Subtle>
            <div className="d-flex justify-content-center">
              <PhraseGrid keys={profile.phrases.slice().reverse()} cols={ 3 } />
            </div>
          </div>
        }
      </Col>
    </Row>
  )
}
