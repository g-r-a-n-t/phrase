import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from 'reactstrap';

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
              <NavLink tag={Link} to="/0xFc7eFb6Bfc363ec16D560A27A006832f32f65c20">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink tag={Link} to="/0x39cBD3814757Be997040E51921e8D54618278A08">Sign Up</NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}
