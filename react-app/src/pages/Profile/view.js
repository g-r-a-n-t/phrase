import React from 'react'
import styled from 'styled-components'
import { ListGroup, ListGroupItem, Row, Col } from 'reactstrap'

import { IpfsImage, IpfsText } from "../../components/IpfsMedia"
import { useProfile, usePhrase } from "../../hooks/useEntity"

const ProfileName = styled.h5`
  width: 180px;
`

const ProfileDescription = styled.div`
  width: 180px;
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

  if (phrase == null) return <p>loading phrase...</p>

  // standard format
  return (
    <div>
      <Row>
        <Col>
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

  if (keys.length === 0) {
    return <h2>Nothing to show</h2>
  }

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

  const address = match.params.account // TODO: handle ENS and 'me'
  const profile = useProfile(address)

  if (profile == null) {
    return <p>loading profile...</p>
  }

  return (
    <div>
      <div>
        <Row>
          <Col xs="auto">
            <ProfileInfo format={profile.format} content={profile.content} />
          </Col>
          <Col>
            <PhraseList keys={profile.phrases} />
          </Col>
        </Row>
      </div>
      <div>
      </div>
    </div>
  )
}
