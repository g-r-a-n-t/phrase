import React from 'react'
import { Spinner } from 'reactstrap'

import { useSentiment } from '../../hooks/useEntity'
import { IpfsImage, IpfsText } from '../IpfsMedia'

export function Sentiment ({ _key }) {
  const sentiment = useSentiment(_key)

  if (sentiment == null) return <Spinner type="grow" color="secondary" />

  return (
    <div>
      <IpfsImage width="120px" height="120px" path={`${sentiment.content}/image120x120.jpg`} type="image/jpeg" />
      <IpfsText path={`${sentiment.content}/name.txt`}/>
    </div>
  )
}
