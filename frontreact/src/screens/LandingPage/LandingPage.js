import React from 'react'
import { Container,Row,Button } from 'react-bootstrap'
import "./LandingPage.css";

const LandingPage = () => {
  return (
    <div className='main'>
      
        <Container>
            <Row>
            <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Logicom  </h1>
              <p className="subtitle">One Safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
              <a href="/login">
                <Button size="lg" className="landingbutton">
                  Login
                </Button>
              </a>
              <a href="/registre">
                <Button
                  variant="outline-primary"
                  size="lg"
                  className="landingbutton"
                >
                  Signup
                </Button>
              </a>
            </div>
            </div>
            
            </Row>
        </Container>
      
    </div>
  )
}

export default LandingPage
