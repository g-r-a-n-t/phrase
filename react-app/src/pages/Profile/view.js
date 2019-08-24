import React, { useState } from 'react'
import styled from 'styled-components'
import classnames from 'classnames'
import {
  ListGroup, ListGroupItem,
  Row, Col,
  Nav, NavLink, NavItem,
  TabPane, TabContent,
  Spinner
} from 'reactstrap'

import { IpfsImage, IpfsText } from "../../components/IpfsMedia"
import { useProfile, usePhrase } from "../../hooks/useEntity"

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

function ProfileInfo({ format, content }) {
  console.log('Rendering ProfileInfo (format content): ', format, content)

  // standard format
  return (
    <div>
      <IpfsImage path={`${content}/image180x180.jpg`} type="image/jpeg" /><br/><br/>
      <ProfileName>
        <IpfsText path={`${content}/name.txt`} />
      </ProfileName>
      <ProfileDescription>
        <IpfsText path={`${content}/bio.txt`} />
      </ProfileDescription>
    </div>
  )
}

function Phrase({ _key }) {
  console.log('Rendering Phrase (key): ', _key)

  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  // standard format
  return (
    <div>
      <Row>
        <Col xs="auto">
          <IpfsImage width="400px" path={`${phrase.content}/image500x500.jpg`} type="image/jpeg" /><br/><br/>
        </Col>
        <Col>
          <h3><IpfsText path={`${phrase.content}/name.txt`} /></h3>
          <IpfsText path={`${phrase.content}/description.txt`} />
        </Col>
      </Row>
    </div>
  )
}

function PhraseList({ keys }) {
  console.log('Rendering PhraseList (keys): ', keys)

  if (keys.length === 0) return <EmptyList>Nothing to show</EmptyList>

  let items = []
  keys.forEach((key) => {
    items.push(
      <ListGroupItem key={key}>
        <Phrase _key={key} />
      </ListGroupItem>
    )
  })

  return <ListGroup>{items}</ListGroup>
}

export default function ProfileView ({ match }) {
  console.log('Rendering ProfileView (account): ', match.params.account)

  const [activeTab, setActiveTab] = useState('1')

  const address = match.params.account // TODO: handle ENS and 'me'
  const profile = useProfile(address)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col xs="auto">
        <ProfileInfo format={profile.format} content={profile.content} />
      </Col>
      <Col>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => { setActiveTab('1'); }}
            >
              phrases
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => { setActiveTab('2'); }}
            >
              sentiments
            </NavLink>
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
