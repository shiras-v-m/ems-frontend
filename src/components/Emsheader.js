import React from 'react'
import { Container, Navbar } from 'react-bootstrap'

function Emsheader() {
  return (
    <Navbar className="bg-body-tertiary bg-primary">
        <Container>
          <Navbar.Brand href="/">
          <i class="fa-sharp fa-solid fa-people-roof fa-flip" style={{color:"#ff8000"}}></i>  EMPLOYEE MANAGEMENT
{' '}
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
}

export default Emsheader