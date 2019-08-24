import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

export default class Header extends React.Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <img width="32px" height="32px" src="./logo.png" alt="logo"/>
            <span>phrase</span>
          </NavbarBrand>
          <Nav className="ml-auto" navbar>
            <NavItem>
              <NavLink tag={Link} to="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/profile/create">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
