import React from 'react'
import {  Container, Form, FormControl, Nav, Navbar } from 'react-bootstrap'
import { useDispatch,useSelector  } from 'react-redux';
import { Link, useHistory } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import  { useEffect } from "react";

const Header = ({ setSearch }) => {

   const history =useHistory();
   const dispatch = useDispatch();
   const userLogin = useSelector((state) => state.userLogin);
   const { userInfo } = userLogin;
   
   
 
   const logoutHandler = () => {
     dispatch(logout());
     history.push("/");
   };
   useEffect(() => {}, [userInfo]);

  return (
    <Navbar bg="primary" expand="lg" variant='dark'>
    <Container fluid>
      <Navbar.Brand>
        <Link to="/">
      LOGICOM NOTES
      </Link>
        </Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
          {userInfo ?<Nav className='m-auto'>

          <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
            
          />
          
        </Form>
          </Nav>: null}
        { userInfo ? <Nav>
          <Nav.Link href="/mynotes"><Link to="/mynotes">
          MyNotes
          </Link>
          </Nav.Link>
          <Nav.Link onClick={logoutHandler}>
          Logout
          
          </Nav.Link>         
        </Nav> : null      }
      </Navbar.Collapse>
    </Container>
  </Navbar>
  )
}

export default Header
