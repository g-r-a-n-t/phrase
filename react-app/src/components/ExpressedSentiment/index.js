import React from 'react'
import PropTypes from 'prop-types'
import {
  Row, Col,
  Spinner
} from 'reactstrap'

import { useExpressedSentiment } from '../../hooks/useEntity'
import { Sentiment } from '../Sentiment'
import { debugComponentRender } from '../../tools/debug'

// todo: Clicking the expressed sentiment should open a modal that displays the phrase
export function ExpressedSentiment ({ _key }) {
  debugComponentRender('ExpressedSentiment', _key)

  const expressedSentiment = useExpressedSentiment(_key)

  if (expressedSentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <Sentiment _key={expressedSentiment.sentiment} />
  )
}

ExpressedSentiment.propTypes = {
  _key: PropTypes.string.isRequired
}

// TODO: Evenly space expressed sentiments
export function ExpressedSentimentGrid ({ keys }) {
  debugComponentRender('ExpressedSentimentGrid', keys)

  if (keys.length === 0) {
    return (
      <h5 className="text-secondary text-center">
        <br />
          No sentiments have been expressed.
        <br /><br />
      </h5>
    )
  }

  // TODO: elements sit on the right instead of being centeded
  // simplify this by not using loops and rows/cols
  const cols = []
  keys.forEach((key) => {
    cols.push(
      <Col className="d-flex justify-content-center" key={`expressedSentiment-${key}-${cols.length}`} xs="2">
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
        <Row key={`expressSentiments-${rows.length}`}>
          {currRow}
        </Row>
      )
      currRow = []
    }
  })

  if (currRow.length !== 0) {
    rows.push(
      <Row key={`expressSentiment-${rows.length}`}>
        {currRow}
      </Row>
    )
  }

  return (
    <div>
      {rows}
    </div>
  )
}

ExpressedSentimentGrid.propTypes = {
  keys: PropTypes.array.isRequired
}
