import React from 'react'
import { Media, ListGroup, ListGroupItem } from 'reactstrap'
import 'holderjs';

import IpfsMedia from "../../components/IpfsMedia"
import { useProfile } from "../../hooks/useEntity"

function ProfileInfo({ format, content }) {
  console.log('content: ', content)

  return (
    <div>
      <IpfsMedia path={content + "/image180x180.jpg"} type="image/jpeg" />
    </div>
  )
}

function PhraseList({ phrases }) {
  let items = []
  for (let i = 0; i < 10; i++) {
    items.push(
      <ListGroupItem key={i}>
        <Media object data-src="holder.js/600x400" alt="Generic placeholder image" />
      </ListGroupItem>
    );
  }

  return <ListGroup>{items}</ListGroup>
}

export default function ProfileView ({ match }) {
  const address = match.params.account // TODO: handle ENS and 'me'
  const profile = useProfile(address)

  if (profile == null) {
    return <p>loading...</p>
  }

  return (
    <div>
      <div>
        <ProfileInfo format={profile.format} content={profile.content} />
        <br/>
        <PhraseList phrases={profile.phrases} />
      </div>
      <div>
      </div>
    </div>
  )
}
