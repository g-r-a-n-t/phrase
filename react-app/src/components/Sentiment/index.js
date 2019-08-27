import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import {
  Spinner
} from 'reactstrap'

import { useSentiment } from '../../hooks/useEntity'
import { IpfsImage } from '../IpfsMedia'
import { debugComponentRender } from '../../tools/debug'

// TODO: a unique border should be generated for the sentiment using the key
const NeonBorder = styled.div`
  border-style: solid;
  border-color: #70fe59;
  border-width: 3px;
  border-radius: 5px;
  margin: 10px;
  display: table;
`

// TODO: Clicking the sentiment should flip it like a card and display the name and value details
export function Sentiment ({ _key }) {
  debugComponentRender('Sentiment', _key)

  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <NeonBorder>
      <IpfsImage width="120px" height="120px" path={`${sentiment.content}/image120x120.jpg`} type="image/jpeg" />
    </NeonBorder>
  )
}

Sentiment.propTypes = {
  _key: PropTypes.string.isRequired
}
