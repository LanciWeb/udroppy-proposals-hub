import React from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';

export default function NavBar() {
  return (
    <Navbar color="dark" dark expand="md" className="fixed-top">
      <NavbarBrand href="/">uDroppy Proposal Hub</NavbarBrand>
    </Navbar>
  );
}
