import React from 'react'
import {
  Spinner
} from 'reactstrap'
import { Grid, Row, Col } from 'react-flexbox-grid';
import styled from 'styled-components'

import { useExpressedSentiment } from '../../hooks/useEntity'
import { Sentiment } from '../Sentiment'

const EmptyList = styled.h5`
  width: 100%;
  text-align: center;
  margin: 10px;
  color: grey;
`

// Clicking the expressed sentiment should open a modal that displays the phrase
export function ExpressedSentiment ({ _key }) {
  console.log('Rendering ExpressedSentiment (key): ', _key)

  const expressedSentiment = useExpressedSentiment(_key)

  if (expressedSentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <Sentiment _key={expressedSentiment.sentiment} />
  )
}

// TODO: Evenly space expressed sentiments
export function ExpressedSentimentGrid ({ keys }) {
  console.log('Rendering ExpressedSentimentGrid (keys): ', keys)

  if (keys.length === 0) return <EmptyList>Nothing to show</EmptyList>

  const cols = []
  keys.forEach((key) => {
    cols.push(
      <Col key={`expressedSentiment-${key}`} xs="2">
        <ExpressedSentiment _key={key} />
      </Col>
    )
  })

  const rowLength = 5
  const rows = []
  let currRow = []
  cols.forEach((col) => {
    currRow.push(col)
    if (currRow.length === rowLength) {
      rows.push(
        <Row key={`expressSentiments-${rows.length}`} around="xs">
          {currRow}
        </Row>
      )
      currRow = []
    }
  })

  if (currRow.length !== 0) {
      rows.push(
        <Row key={`expressSentiment-${rows.length}`} around="xs">
          {currRow}
        </Row>
      )
  }

  return (
    <Grid fluid>
      {rows}
    </Grid>
  )
}
