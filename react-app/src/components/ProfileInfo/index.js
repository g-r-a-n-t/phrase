import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'
import debug from '../../tools/debug'

const Wrapper = styled.div`
  width: 180px;
`

export function ProfileInfo ({ account }) {
  debug.componentRender('ProfileInfo', account)

  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  // standard format
  return (
    <Wrapper>
      <IpfsImage width="180px" height="180px" path={`${profile.content}/image180x180.jpg`} type="image/jpeg" />
      <br/><br/>
      <h5><IpfsText path={`${profile.content}/name.txt`} /></h5>
      <IpfsText path={`${profile.content}/bio.txt`} />
    </Wrapper>
  )
}

ProfileInfo.propTypes = {
  account: PropTypes.string.isRequired
}
