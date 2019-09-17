import React from 'react'
import PropTypes from 'prop-types'
import BigNumber from 'bignumber.js'

import { getToken } from 'tools/tokens'

export function TokenAmount ({ address, amount }) {
  const token = getToken(address)

  return (
    <>
      <span>{ BigNumber(amount.toString()).div(token.unit.toString()).toString() }</span>
      <span> { token.symbol }</span>
    </>
  )
}

TokenAmount.propTypes = {
  address: PropTypes.string.isRequired,
  amount: PropTypes.object.isRequired
}
