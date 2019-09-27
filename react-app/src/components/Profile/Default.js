import React from 'react'
import PropTypes from 'prop-types'
import { useWeb3Context } from 'web3-react'
import Identicon from 'react-identicons'
import { Link } from 'react-router-dom'
import { NavLink } from 'reactstrap'

export function DefaultProfileInfo ({ _key }) {
  return (
    <div>
      <Identicon className="border rounded" size={ 180 } string={ _key } />
      <h5>{ shortAddress(_key) }</h5>
    </div>
  )
}

DefaultProfileInfo.propTypes = {
  _key: PropTypes.string.isRequired
}

export function DefaultProfileThumb ({ _key }) {
  const size = 120

  return (
    <Link to={ `/${_key}` } style={{ cursor: 'pointer' }}>
      <div
        className="rounded-circle border"
        style={{ overflow: 'hidden', width: `${size}px`, height: `${size}px` }}
      >
        <Identicon size={ size } string={ _key } />
      </div>
      <div className="small bg-dark text-light text-center border rounded" style={{ width: `${size}px`, padding: '3px' }}>
        <b>{ shortAddress(_key) }</b>
      </div>
    </Link>
  )
}

DefaultProfileThumb.propTypes = {
  _key: PropTypes.string.isRequired
}

export function DefaultProfileName ({ _key }) {
  return (
    <Link to={`/${_key}`}>
      { shortAddress(_key) }
    </Link>
  )
}

DefaultProfileName.propTypes = {
  _key: PropTypes.string.isRequired
}

export function DefaultMeDot () {
  const { account } = useWeb3Context()

  if (account === null) return null

  return (
    <NavLink style={{ padding: '0px', margin: '0px' }} tag={ Link } to={ '/me' }>
      <Identicon className="rounded-circle border" size={ 25 } string={ account } />
    </NavLink>
  )
}

function shortAddress (a) {
  return `${a.slice(0, 4)}..${a.slice(-5, -1)}`
}
