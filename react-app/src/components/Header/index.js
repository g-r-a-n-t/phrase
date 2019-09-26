import React from 'react'
import { useWeb3Context } from 'web3-react'
import { Link } from 'react-router-dom'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap'

import { IpfsImage } from 'components/IpfsMedia'
import { MeDot } from 'components/Profile'

export default function Header () {
  const { account } = useWeb3Context()

  return (
    <Navbar color="light" light expand="md">
      <NavbarBrand style={{ padding: '0px', margin: '0px' }} tag={Link} to="/">
        <img width="25px" height="25px" src="/logo.png" alt="logo"/>
        &nbsp; Phrase
      </NavbarBrand>
      <Nav className="ml-auto" navbar>
        { account == null ? (
          <NavItem>
            <NavLink tag={Link} to="/create/profile">Join</NavLink>
          </NavItem>
        ) : (
          <NavItem>
            <MeDot />
          </NavItem>
        )}
      </Nav>
    </Navbar>
  )
}
