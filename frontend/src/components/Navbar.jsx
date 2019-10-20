import {
  Nav,
  Navbar,
  Button,
  NavItem,
  Collapse,
  NavbarBrand,
  NavbarToggler
} from 'reactstrap';
import Profile from './Profile';
import React, { useState } from 'react';
import { useAuth0 } from '../auth/Auth0Provider';

export default () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <Navbar color="dark" dark expand="md" className="fixed-top py-0">
      <NavbarBrand href="/">
        <img
          width="40"
          alt="uDroppy"
          className="image-fluid mr-2"
          src="https://app-ea.udroppy.com/assets/img/logo.png"
        />
        uDroppy Proposal Hub
      </NavbarBrand>
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          {!isAuthenticated && (
            <NavItem>
              <Button onClick={() => loginWithRedirect()}>
                <i className="fas fa-sign-in-alt mr-1" /> Log in
              </Button>
            </NavItem>
          )}
          {isAuthenticated && <Profile />}
        </Nav>
      </Collapse>
    </Navbar>
  );
};
