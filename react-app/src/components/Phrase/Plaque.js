import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { usePhrase } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'
import { ProfileName } from 'components/Profile'

export function PlaqueFront ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <IpfsImage
      width="400px"
      height="400px"
      path={`${phrase.content}/cover.jpg`}
      type="image/jpeg"
    />
  )
}

PlaqueFront.propTypes = {
  _key: PropTypes.string.isRequired
}

export function PlaqueBack ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <div style={{ margin: '10px' }}>
      <h7>
        <IpfsText path={`${phrase.content}/name.txt`} />
      </h7>
      <div className="small">
        <ProfileName account={ phrase.creator } />
      </div>
      <br />
      <p>
        <IpfsText path={`${phrase.content}/description.txt`} />
      </p>
    </div>
  )
}

PlaqueBack.propTypes = {
  _key: PropTypes.string.isRequired
}
