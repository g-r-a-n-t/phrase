import React, { useState } from 'react'
import { useWeb3Context } from 'web3-react'
import { IoIosHeart, IoMdHand, IoMdCreate } from 'react-icons/io'
import { Row, Col, Spinner, Button } from 'reactstrap'

import { useProfile } from 'hooks/useEntity'
import { PhraseGrid } from 'components/Phrase'
import { ProfileInfo } from 'components/Profile'
import { ExpressedSentiments } from './ExpressedSentiments'
import { UpdateProfileModal } from './UpdateProfileModal'
import { Subtle } from 'components/Wrappers'

export default function BasicView () {
  const { account } = useWeb3Context()
  const profile = useProfile(account)
  const [editingProfile, setEditingProfile] = useState(false)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo _key={ account } />
        <br />
        <Button onClick={ () => setEditingProfile(true) }>
          <IoMdCreate size={23} />
        </Button>
        { editingProfile &&
          <UpdateProfileModal onDone={ () => setEditingProfile(false) } />
        }
      </Col>
      <Col>
        <div className="border border-light rounded">
          { profile.expressedSentiments.length === 0
            ? <Subtle>No sentiments have been expressed.</Subtle>
            : <>
              <Subtle>
                -------- <IoIosHeart size={25}/> --------
              </Subtle>
              <div>
                <ExpressedSentiments keys={ profile.expressedSentiments } />
              </div>
            </>
          }
        </div>
        <br />
        <div className="border border-light rounded">
          { profile.phrases.length === 0
            ? <Subtle>No phrases have been created.</Subtle>
            : <>
              <Subtle>
                -------- <IoMdHand size={25}/> --------
              </Subtle>
              <div className="d-flex justify-content-center">
                <PhraseGrid keys={profile.phrases.slice().reverse()} cols={ 3 } />
              </div>
            </>
          }
        </div>
      </Col>
    </Row>
  )
}
