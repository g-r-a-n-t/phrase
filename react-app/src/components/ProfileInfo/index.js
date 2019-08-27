import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Spinner } from 'reactstrap'

import { useProfile } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../../components/IpfsMedia'

const ProfileName = styled.h5`
  width: 180px;
`

const ProfileDescription = styled.div`
  width: 180px;
`

export function ProfileInfo ({ account }) {
  console.log('Rendering ProfileInfo (address): ', account)

  const profile = useProfile(account)

  if (profile == null) return <Spinner type="grow" color="secondary" />

  // standard format
  return (
    <div>
      <IpfsImage width="180px" height="180px" path={`${profile.content}/image180x180.jpg`} type="image/jpeg" /><br/><br/>
      <ProfileName>
        <IpfsText path={`${profile.content}/name.txt`} />
      </ProfileName>
      <ProfileDescription>
        <IpfsText path={`${profile.content}/bio.txt`} />
      </ProfileDescription>
    </div>
  )
}

ProfileInfo.propTypes = {
  account: PropTypes.string.isRequired,
}
