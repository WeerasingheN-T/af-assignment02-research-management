import React from 'react';
import './Header.css';
import {Navbar,Container,Nav} from "react-bootstrap";
import st from '../ResearchTools/st.jpg';
import { useParams } from 'react-router-dom';

function Header() {

  const {staffPosition}=useParams("");

return (
<>
<Container>
  <Navbar expand="lg" variant="light" bg="light">
     <div className="images12"><img src={st}/></div>
    <Container>
      <Navbar.Brand><div id="dates1">
     <h2>Research Project Management</h2>
   </div></Navbar.Brand>
    </Container>
  </Navbar>
</Container>
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Container>
  <Navbar.Brand href="/">Home</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
      <Nav.Link href={`/ResearchFaculty/${staffPosition}`}>Faculty</Nav.Link>
      <Nav.Link href="#pricing">Departments</Nav.Link>
    </Nav>
    <Nav>
     <ul className="nav navbar-nav navbar-right">
     <Nav.Link href="/AllRegister"><span className="glyphicon glyphicon-user"> Sign Up</span></Nav.Link>
     <Nav.Link href="/HLogin"><span className="glyphicon glyphicon-log-in"> Login</span></Nav.Link>
    </ul> 
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
 
    </> 
    );
  }

export default Header;