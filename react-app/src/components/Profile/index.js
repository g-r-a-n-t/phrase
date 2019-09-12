import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'

import { useProfile } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import debug from 'tools/debug'

export function ProfileInfo ({ account }) {
  debug.componentRender('ProfileInfo', account)

  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  // standard format
  return (
    <div style={{width: '180px'}}>
      <div className="border rounded" style={{ overflow: 'hidden' }}>
        <IpfsImage
          width="180px"
          height="180px"
          path={`${profile.content}/icon.jpg`} 
          type="image/jpeg"
        />
      </div>
      <br/>
      <h5><IpfsText path={`${profile.content}/name.txt`} /></h5>
      <IpfsText path={`${profile.content}/bio.txt`} />
    </div>
  )
}

ProfileInfo.propTypes = {
  account: PropTypes.string.isRequired
}

export function ProfileName ({ account }) {
  debug.componentRender('ProfileName', account)

  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Link to={`/${account}`}>
      <IpfsText path={`${profile.content}/name.txt`} />
    </Link>
  )
}

ProfileName.propTypes = {
  account: PropTypes.string.isRequired
}
