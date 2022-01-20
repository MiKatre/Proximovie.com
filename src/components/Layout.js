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
                    <span className="fw-bold">ProxiMovie</span> <em className="text-secondary d-none d-sm-inline">What to watch next</em>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/#popular_movies">Movies</Nav.Link>
                    <Nav.Link href="/tv/">TV Shows</Nav.Link>
                    {/* <Nav.Link href="/keyword/">Keywords</Nav.Link>
                    <Nav.Link href="/genre/">Genres</Nav.Link> */}
                    {/* <Nav.Link href="/genre/">Watchlist</Nav.Link>
                    <Nav.Link href="/genre/">Timeline</Nav.Link> */}
                </Nav>
            </Navbar.Collapse>
            <Nav className="col-12 col-lg-4 col-xl-3 flex-row-reverse">
                <Search/>
            </Nav>
            </Container>
        </Navbar>

    )
}