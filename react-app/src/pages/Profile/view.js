import React, { useEffect } from 'react'
import 'holderjs';
import styled from 'styled-components'
import { useWeb3Context } from 'web3-react'
import { Media, ListGroup, ListGroupItem } from 'reactstrap'

import { useRegistryContract } from "../../hooks/use-contract"
import IpfsImage from "../../components/Media/ipfsImage"

const IconWrapper = styled.div`
  margin-left: 0px;
`

function Icon(src) {
  console.log("updating icon")
  return (
    <Media object data-src={src} alt="Generic placeholder image" />
  );
};

function PhraseCover() {
  return (
    <Media object data-src="holder.js/600x400" alt="Generic placeholder image" />
  );
};

function PhraseList(phrases) {
  let items = []
  for (let i = 0; i < 10; i++) {
    items.push(
      <ListGroupItem key={i}>
        <PhraseCover/>
      </ListGroupItem>
    );
  }

  return <ListGroup>{items}</ListGroup>
}

// This component must be a child of <App> to have access to the appropriate context
export default function ProfileView () {
  const context = useWeb3Context()
  //const registry = useRegistryContract()

  let profileImage = "holder.js/180x180"



  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  })

  return (
    <div>
      <div>
        <IconWrapper><IpfsImage/></IconWrapper>
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
