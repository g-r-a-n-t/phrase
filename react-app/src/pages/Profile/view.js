import React, { useEffect } from 'react'
import 'holderjs';
import { useWeb3Context } from 'web3-react'
import { Media, ListGroup, ListGroupItem } from 'reactstrap'

import IpfsMedia from "../../components/IpfsMedia"
//import { useRegistryContract } from "../../hooks/useContract"

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
  const context = useWeb3Context()
  //const registry = useRegistryContract()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  })

  return (
    <div>
      <div>
        <IpfsMedia path="QmX4STxqTVP1ro9Xsksj3bh2saNBq7nSqGZtVnvGMyEvbj" type="image/jpeg" />
        <br/><br/>
        <h5>{context.account}</h5>
        <br/>
        <PhraseList/>
      </div>
      <div>
      </div>
    </div>
  )
}
