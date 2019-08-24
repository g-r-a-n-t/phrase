import React from 'react'
import { Switch, Route } from 'react-router-dom'

import ProfileView from './view'

export default function Profile () {
  return (
    <Switch>
      <Route exact strict path="/:account" component={ProfileView} />
    </Switch>
  )
}
