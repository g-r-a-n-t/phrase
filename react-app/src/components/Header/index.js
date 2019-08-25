import React from 'react'
import { Link } from 'react-router-dom'
import {
  Navbar, NavbarBrand, Nav, NavItem, NavLink,
  UncontrolledDropdown, DropdownToggle, DropdownItem, DropdownMenu
} from 'reactstrap'

import { useCurrentProfile } from '../../hooks/useEntity'
import { IpfsImage } from '../../components/IpfsMedia'
import { Rounded } from '../../styles'

function CreateDropdown () {
  return (
    <UncontrolledDropdown nav inNavbar>
      <DropdownToggle nav caret>
        Create
      </DropdownToggle>
      <DropdownMenu right>
        <DropdownItem>
          <NavLink tag={Link} to="/create/phrase">Phrase</NavLink>
        </DropdownItem>
        <DropdownItem>
          <NavLink tag={Link} to="/create/sentiment">Sentiment</NavLink>
        </DropdownItem>
      </DropdownMenu>
    </UncontrolledDropdown>
  )
}

export default function Header () {
  const profile = useCurrentProfile()

  return (
      <Navbar color="light" light expand="md">
        <NavbarBrand tag={Link} to="/">
          <img width="25px" height="25px" src="./logo.png" alt="logo"/>
          <span>&nbsp;phrase</span>
        </NavbarBrand>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink tag={Link} to="/about">About</NavLink>
          </NavItem>
          { profile != null &&
            <CreateDropdown />
          }
          <NavItem>
            { profile == null ? (
              <NavLink tag={Link} to="/create/profile">Join</NavLink>
            ) : (
              <span>
                <NavLink tag={Link} to="/me">
                  <Rounded>
                    <IpfsImage path={`${profile.content}/image180x180.jpg`} width="25px" height="25px"/>
                  </Rounded>
                </NavLink>
              </span>
            )}
          </NavItem>
        </Nav>
      </Navbar>
  )
}
