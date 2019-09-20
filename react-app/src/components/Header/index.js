import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import { useCurrentProfile } from 'hooks/useEntity'
import { IpfsImage } from 'components/IpfsMedia'

export default function Header () {
  const profile = useCurrentProfile()

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand tag={Link} to="/">
        <img width="25px" height="25px" src="/logo.png" alt="logo"/>
        <span>&nbsp;phrase</span>
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink tag={Link} to="/about">About</NavLink>
        </NavItem>
        { profile == null ? (
          <NavItem>
            <NavLink tag={Link} to="/create/profile">Join</NavLink>
          </NavItem>
        ) : (
          <>
            <NavItem>
              <NavLink tag={Link} to="/me">
                <div className="rounded-circle" style={{ overflow: 'hidden' }}>
                  <IpfsImage type="image/jpeg" path={`${profile.content}/icon.jpg`} width="25px" height="25px"/>
                </div>
              </NavLink>
            </NavItem>
          </>
        )}
      </Nav>
    </Navbar>
  )
}
