import React from 'react'

import {Container, Row, Col} from 'react-bootstrap'

function Footer() {
  return (
    <footer>
      <Row>
        <Col className='text-center py-3'>
          <Container>Copyright &copy; MERNShop</Container>
        </Col>
      </Row>
    </footer>
  )
}

export default Footer
