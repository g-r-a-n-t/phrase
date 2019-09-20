import React from 'react'
import PropTypes from 'prop-types'

import { BasicView, MeView } from './Views'
import debug from 'tools/debug'

// TODO: Should hande a profile that does not have content and generate a default profile picture
export default function Account ({ match }) {
  debug.componentRender('Account', match.params.account)

  const key = match.params.account

  if (key === 'me') {
    return <MeView />
  }

  return <BasicView _key={ key }/>
}

Account.propTypes = {
  match: PropTypes.object.isRequired
}
