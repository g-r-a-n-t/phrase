import React from 'react'
import PropTypes from 'prop-types'
import { Spinner } from 'reactstrap'

import { usePhrase } from 'hooks/useEntity'
import { IpfsImage, IpfsText } from 'components/IpfsMedia'

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
      <h5 className="text-secondary">
        <IpfsText path={`${phrase.content}/name.txt`} />
      </h5>
      <IpfsText path={`${phrase.content}/description.txt`} />
    </div>
  )
}

PlaqueBack.propTypes = {
  _key: PropTypes.string.isRequired
}
