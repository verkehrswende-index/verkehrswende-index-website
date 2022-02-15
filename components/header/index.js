import Link from "next/link";

import { Navbar, Nav } from "react-bootstrap";

const Header = () => (
  <Navbar bg="dark" variant="dark" expand="lg">
    <Link href="/" passHref>
      <Navbar.Brand>Verkehrswende-Index</Navbar.Brand>
    </Link>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto">
        <Link href="/uebersicht" passHref>
          <Nav.Link>Übersicht</Nav.Link>
        </Link>
        <Link href="/ueber" passHref>
          <Nav.Link>Über</Nav.Link>
        </Link>
        <Link href="/kontakt" passHref>
          <Nav.Link>Kontakt</Nav.Link>
        </Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Header;
