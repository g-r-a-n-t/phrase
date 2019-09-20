import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Spinner } from 'reactstrap'

import { useProfile } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import debug from 'tools/debug'

export function ProfileInfo ({ _key }) {
  debug.componentRender('ProfileInfo', _key)

  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <div style={{width: '180px'}}>
      <div className="border rounded" style={{ overflow: 'hidden' }}>
        <IpfsImage
          width="180px"
          height="180px"
          path={ `${profile.content}/icon.jpg` }
          type="image/jpeg"
        />
      </div>
      <br/>
      <h5><IpfsText path={ `${profile.content}/name.txt` } /></h5>
      <IpfsText path={ `${profile.content}/bio.txt` } />
    </div>
  )
}

ProfileInfo.propTypes = {
  account: PropTypes.string.isRequired
}

export function ProfileThumb ({ _key, size = 180 }) {
  debug.componentRender('ProfileThumb', _key)

  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Link to={ `/${_key}` } style={{ cursor: 'pointer' }}>
      <div
        className="rounded-circle"
        style={{ overflow: 'hidden', width: `${size}px`, height: `${size}px` }}
      >
        <IpfsImage
          width={ `${size}px` }
          height={ `${size}px` }
          path={ `${profile.content}/icon.jpg` }
          type="image/jpeg"
        />
      </div>
      <div className="small bg-dark text-light text-center border rounded" style={{ width: `${size}px`, padding: '3px' }}>
        <b><IpfsText path={`${profile.content}/name.txt`} /></b>
      </div>
    </Link>
  )
}

ProfileThumb.propTypes = {
  _key: PropTypes.string.isRequired,
  size: PropTypes.number
}

export function ProfileName ({ _key }) {
  debug.componentRender('ProfileName', _key)

  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  return (
    <Link to={`/${_key}`}>
      <IpfsText path={`${profile.content}/name.txt`} />
    </Link>
  )
}

ProfileName.propTypes = {
  account: PropTypes.string.isRequired
}
