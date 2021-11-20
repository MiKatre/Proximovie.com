import { Link } from "gatsby"
import React from "react"
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import FeedbackButton from "./FeedbackButton"
import Search from "./Search"

export default function Layout({ children }) {
  return (
    <div>
        <FeedbackButton/>
        <Navi/>
        {children}
    </div>
  )
}

const Navi = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
            <Navbar.Brand>
                <Link to="/" className="text-decoration-none text-light">
                    <span className="fw-bold">ProxiMovie</span> <em className="text-secondary">What to watch next</em>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link href="/keyword/">Movies</Nav.Link>
                    <Nav.Link href="/keyword/">TV Shows</Nav.Link>
                    <Nav.Link href="/keyword/">Keywords</Nav.Link>
                    <Nav.Link href="/keyword/">Genres</Nav.Link> */}
                </Nav>
                <Nav>
                    <Search/>
                </Nav>
            </Navbar.Collapse>
            </Container>
        </Navbar>

    )
}