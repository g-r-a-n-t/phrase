import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Nav, NavLink, NavItem,
  TabPane, TabContent,
  Spinner
} from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'
import { PhraseList } from '../../components/Phrase'
import { Clickable } from '../../styles'

const ProfileName = styled.h5`
  width: 180px;
`

const ProfileDescription = styled.div`
  width: 180px;
`

const EmptyList = styled.h5`
  width: 100%;
  text-align: center;
  margin: 10px;
  color: grey;
`

function ProfileInfo ({ format, content }) {
  console.log('Rendering ProfileInfo (format content): ', format, content)

  // standard format
  return (
    <div>
      <IpfsImage width="180px" height="180px" path={`${content}/image180x180.jpg`} type="image/jpeg" /><br/><br/>
      <ProfileName>
        <IpfsText path={`${content}/name.txt`} />
      </ProfileName>
      <ProfileDescription>
        <IpfsText path={`${content}/bio.txt`} />
      </ProfileDescription>
    </div>
  )
}

ProfileInfo.propTypes = {
  format: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default function ViewProfile ({ match }) {
  console.log('Rendering ProfileView (account): ', match.params.account)

  const [activeTab, setActiveTab] = useState('1')

  const profile = useProfile(match.params.account) // TODO: Handle aliases

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo format={profile.format} content={profile.content} />
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
            <EmptyList>Nothing to show</EmptyList>
          </TabPane>
        </TabContent>
      </Col>
    </Row>
  )
}

ViewProfile.propTypes = {
  match: PropTypes.object.isRequired
}
