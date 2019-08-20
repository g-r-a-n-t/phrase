import React, { useEffect } from 'react'
import 'holderjs';
import { Media, ListGroup, ListGroupItem } from 'reactstrap'
import usePromise from 'react-promise';

import IpfsMedia from "../../components/IpfsMedia"
import { useProfileContent } from "../../hooks/useContent"
import config from '../../config'

function ProfileInfo({ address }) {
  const content = useProfileContent(address)
  console.log('content: ', content)

  return (
    <div>
      { content &&
      <IpfsMedia path={content.content + "/image180x180.jpg"} type="image/jpeg" />
      }
    </div>
  )
}

function PhraseList(phrases) {
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

export default function ProfileView () {
  return (
    <div>
      <div>
        <br/><br/>
        <ProfileInfo address="0xca9Af5520FB2039514d680E7d500647F5E0A3Cb9" />
        <br/>
        <PhraseList/>
      </div>
      <div>
      </div>
    </div>
  )
}
