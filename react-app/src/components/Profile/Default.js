import React from 'react'
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

export function DefaultProfileThumb ({ _key }) {
  return <>ProfileThumb</>
}

export function DefaultProfileName ({ _key }) {
  return <>ProfileName</>
}

export function DefaultMeDot () {
  const { account } = useWeb3Context()

  if (account === null) return null

  return (
    <NavLink tag={ Link } to={ '/me' }>
      <div className="rounded-circle" style={{ overflow: 'hidden' }}>
        <Identicon className="border rounded" size={ 25 } string={ account } />
      </div>
    </NavLink>
  )
}

function shortAddress (a) {
  return `${a.slice(0,4)}..${a.slice(-5,-1)}`
}
