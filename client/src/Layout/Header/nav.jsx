import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, NavLink } from "react-router-dom";
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage';


function NavBar() {
    const navigate = useNavigate();

    const handleSignOut = () => {
    LocalStorage.remove_item("username")
    LocalStorage.remove_item("token")
		navigate("/login");
	};
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container fluid>
        <Navbar.Brand as={NavLink} to="/">App Name</Navbar.Brand>
        {/* <NavLink to="/">App Name</NavLink> */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            
            <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
          <NavDropdown title={(<i className="bi bi-person-circle h5"></i>)} id="collasible-nav-dropdown" align={'end'} className='remove-arrow'>
              <NavDropdown.Item>{localStorage.getItem("username")}</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Billing">Billing</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleSignOut}>LogOut</NavDropdown.Item>
            </NavDropdown>
            {/* <Nav.Link href="/profile">Profile</Nav.Link> */}
            {/* <Nav.Link eventKey={2} href="#memes">Dank memes</Nav.Link> */}
          </Nav>

        </Navbar.Collapse>

      </Container>
    </Navbar>
  );
}

export default NavBar;