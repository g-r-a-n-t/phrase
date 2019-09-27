import React from 'react'
import PropTypes from 'prop-types'
import { Spinner, Row, Col } from 'reactstrap'

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
        <ProfileName _key={ phrase.creator } />
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

export function PlaqueExploded ({ _key }) {
  const phrase = usePhrase(_key)

  if (phrase == null) return <Spinner type="grow" color="secondary" />

  return (
    <Row>
      <Col>
        <h5><IpfsText path={`${phrase.content}/name.txt`} /></h5>
        <p>
          Created by <ProfileName _key={ phrase.creator } />.
        </p>
        <p>
          <IpfsText path={`${phrase.content}/description.txt`} />
        </p>
      </Col>
      <Col className="text-right">
        <IpfsImage
          width="400px"
          height="400px"
          path={`${phrase.content}/cover.jpg`}
          type="image/jpeg"
        />
      </Col>
    </Row>
  )
}

PlaqueExploded.propTypes = {
  _key: PropTypes.string.isRequired
}
