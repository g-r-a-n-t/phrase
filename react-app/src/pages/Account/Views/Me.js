import React from 'react'
import { useWeb3Context } from 'web3-react'
import { IoIosHeart, IoMdHand, IoMdCreate, IoMdAdd } from 'react-icons/io'
import { Row, Col, Spinner } from 'reactstrap'

import { useProfile } from 'hooks/useEntity'
import { PhraseGrid } from 'components/Phrase'
import { ProfileInfo } from 'components/Profile'
import { ExpressedSentiments } from './ExpressedSentiments'
import { Subtle } from 'components/Wrappers'
import { Modalize } from 'components/Modals'
import { ProfilePublisher, SentimentPublisher, PhrasePublisher } from 'components/Publishers'

export default function BasicView () {
  const { account } = useWeb3Context()
  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo _key={ account } />
        <br />
        <Modalize content={ <ProfilePublisher /> }>
          <IoMdCreate className="text-primary" size={23} />
        </Modalize>
      </Col>
      <Col>
        <div className="border border-light rounded">
          { profile.expressedSentiments.length === 0
            ? <Subtle>You have not expressed any sentiments.</Subtle>
            : <>
              <Subtle>
                -------- <IoIosHeart size={25}/> --------
              </Subtle>
            </>
          }
          <div>
            <ExpressedSentiments keys={ profile.expressedSentiments } />
          </div>
          <Modalize content={ <SentimentPublisher /> }>
            <div className="text-center">
              <IoMdAdd className="text-primary" style={{ margin: '10px' }} size={23} />
            </div>
          </Modalize>
        </div>
        <br />
        <div className="border border-light rounded">
          { profile.phrases.length === 0
            ? <Subtle>You have not created any phrases.</Subtle>
            : <>
              <Subtle>
                -------- <IoMdHand size={25}/> --------
              </Subtle>
              <div className="d-flex justify-content-center">
                <PhraseGrid keys={profile.phrases.slice().reverse()} cols={ 3 } />
              </div>
            </>
          }
          <Modalize content={ <PhrasePublisher /> }>
            <div className="text-center">
              <IoMdAdd className="text-primary" style={{ margin: '10px' }} size={23} />
            </div>
          </Modalize>
        </div>
      </Col>
    </Row>
  )
}
