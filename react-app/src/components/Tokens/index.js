import React from 'react'

import { getToken } from '../../tools/tokens'

export function TokenAmount ({ address, amount }) {
  const token = getToken(address)

  return (
    <>
      <span>{ amount.div(token.unit).toString() }</span>
      <span> { token.symbol }</span>
    </>
  )
}

function round (n) {
  return Math.round(n * 100) / 100
}
