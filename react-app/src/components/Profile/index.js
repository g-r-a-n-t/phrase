import React from 'react'
import PropTypes from 'prop-types'

import { useProfile, useCurrentProfile } from 'hooks/useEntity'
import { Spinner } from 'reactstrap'
import {
  StandardProfileInfo, StandardProfileName, StandardProfileThumb, StandardMeDot
} from './Standard'
import {
  DefaultProfileInfo, DefaultProfileName, DefaultProfileThumb, DefaultMeDot
} from './Default'

export function ProfileInfo ({ _key }) {
  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  switch (profile.format) {
    case 'ipfs-standard-2019':
      return <StandardProfileInfo _key={ _key } />
    default:
      return <DefaultProfileInfo _key={ _key } />
  }
}

ProfileInfo.propTypes = {
  _key: PropTypes.string.isRequired
}

export function ProfileThumb ({ _key }) {
  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  switch (profile.format) {
    case 'ipfs-standard-2019':
      return <StandardProfileThumb _key={ _key } />
    default:
      return <DefaultProfileThumb _key={ _key } />
  }
}

ProfileThumb.propTypes = {
  _key: PropTypes.string.isRequired
}

export function ProfileName ({ _key }) {
  const profile = useProfile(_key)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  switch (profile.format) {
    case 'ipfs-standard-2019':
      return <StandardProfileName _key={ _key } />
    default:
      return <DefaultProfileName _key={ _key } />
  }
}

ProfileName.propTypes = {
  _key: PropTypes.string.isRequired
}

export function MeDot () {
  const profile = useCurrentProfile()

  if (profile == null) return <Spinner type="grow" color="secondary" />

  switch (profile.format) {
    case 'ipfs-standard-2019':
      return <StandardMeDot />
    default:
      return <DefaultMeDot />
  }
}
