import React from 'react'
import PropTypes from 'prop-types'

import { getToken } from 'tools/tokens'

// TODO: Add rounding
export function TokenAmount ({ address, amount }) {
  const token = getToken(address)

  return (
    <>
      <span>{ amount.div(token.unit).toString() }</span>
      <span> { token.symbol }</span>
    </>
  )
}

TokenAmount.propTypes = {
  address: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired
}
