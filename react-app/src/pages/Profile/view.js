import 'holderjs';
import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useWeb3Context } from 'web3-react'
import { Media, ListGroup, ListGroupItem } from 'reactstrap'

const IconWrapper = styled.div`
  margin-left: 0px;
`

function Icon() {
  return (
    <Media object data-src="holder.js/180x180" alt="Generic placeholder image" />
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
      <ListGroupItem>
        <PhraseCover/>
      </ListGroupItem>
    );
  }

  return <ListGroup>{items}</ListGroup>
}

// This component must be a child of <App> to have access to the appropriate context
export default function ProfileView () {
  const context = useWeb3Context()

  useEffect(() => {
    context.setFirstValidConnector(['MetaMask'])
  })

  return (
    <div>
      <div>
        <IconWrapper><Icon/></IconWrapper>
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
