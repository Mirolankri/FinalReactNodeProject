import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, NavLink } from "react-router-dom";
import LocalStorage from '../../Helpers/LocalStorage/LocalStorage';
import { useUser } from '../../users/providers/UserProvider';
// import { useBootstrapPrefix } from 'react-bootstrap/esm/ThemeProvider';

import ROUTES from '../../routes/routesModel';

function NavBar() {
  const {userData,logout} = useUser()
  const navigate = useNavigate();

  //   const handleSignOut = () => {
  //   LocalStorage.remove_item("username")
  //   LocalStorage.remove_item("token")
	// 	navigate("/login");
	// };
  return (
    <Navbar sticky="top" collapseOnSelect expand="lg" data-bs-theme="dark"  style={{backgroundColor:"#8668FF"}}>
      <Container fluid >
        <Navbar.Brand style={{color:"#ffffff"}} as={NavLink} to="/">
        <img
              alt=""
              src="/assets/images/icons/icon-o.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{' '}
          Pawllo</Navbar.Brand>
        {/* <NavLink to="/">App Name</NavLink> */}

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        
        <Navbar.Collapse id="responsive-navbar-nav" >
          <Nav className="me-auto">
            {/* { !!userData && !!userData.isDogWalker ? <Nav.Link as={NavLink} to={`${ROUTES.UPDATE_DOGWALKER}/${userData._id}`} style={{color:"#ffffff"}}>עדכון פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData && !userData.isDogWalker ? <Nav.Link as={NavLink} to={`${ROUTES.CREATE_DOGWALKER}/${userData._id}`} style={{color:"#ffffff"}}>יצירת פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData && !!userData.isDogManager ? <Nav.Link as={NavLink} to={`${ROUTES.UPDATE_DOGOWNER}/${userData._id}`} style={{color:"#ffffff"}}>עדכון פרופיל בעלים</Nav.Link> : ''}
            { !!userData && !userData.isDogManager ? <Nav.Link as={NavLink} to={`${ROUTES.CREATE_DOGOWNER}/${userData._id}`} style={{color:"#ffffff"}}>יצירת פרופיל בעלים</Nav.Link> : ''}
            { !!userData && !!userData.isDogWalker ? <Nav.Link as={NavLink} to={`${ROUTES.PROFILE_WALKER}/${userData._id}`} style={{color:"#ffffff"}}>פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData && !!userData.isDogManager ? <Nav.Link as={NavLink} to={`${ROUTES.PROFILE_OWNER}/${userData._id}`} style={{color:"#ffffff"}}>פרופיל בעלים</Nav.Link> : ''} */}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.UPDATE_DOGWALKER}/${userData._id}`} style={{color:"#ffffff"}}>עדכון פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.CREATE_DOGWALKER}/${userData._id}`} style={{color:"#ffffff"}}>יצירת פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.UPDATE_DOGOWNER}/${userData._id}`} style={{color:"#ffffff"}}>עדכון פרופיל בעלים</Nav.Link> : ''}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.CREATE_DOGOWNER}/${userData._id}`} style={{color:"#ffffff"}}>יצירת פרופיל בעלים</Nav.Link> : ''}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.PROFILE_WALKER}/${userData._id}`} style={{color:"#ffffff"}}>פרופיל דוגווקר</Nav.Link> : ''}
            { !!userData ? <Nav.Link as={NavLink} to={`${ROUTES.PROFILE_OWNER}/${userData._id}`} style={{color:"#ffffff"}}>פרופיל בעלים</Nav.Link> : ''}
            {/* <Nav.Link as={NavLink} to={`${ROUTES.PROFILE}/update/${userData._id}`} style={{color:"#ffffff"}}>Profile</Nav.Link> */}

            <NavDropdown title="Dropdown" id="collasible-nav-dropdown" className='d-none' style={{color:"#ffffff"}}>
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
          <NavDropdown title={(<i className="bi bi-person-circle h5" style={{color:"#ffffff"}}></i>)} id="collasible-nav-dropdown" align={'end'} className='remove-arrow' >
              <NavDropdown.Item>{userData && userData.username}
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={NavLink} to="/profile">הפרופיל שלי</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/">הפגישות שלי</NavDropdown.Item>
              <NavDropdown.Item as={NavLink} to="/Billing">הכלבים שלי</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={logout}>התנתק/י</NavDropdown.Item>
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