import React, {useState, useEffect} from 'react'

import {Card, Button, ListGroup, Image, Row, Col} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import axios from 'axios'

import Rating from '../components/product/Rating'

function ProductScreen({match}) {
  const [product, setProduct] = useState({
    product: {},
  })

  const product_id = match.params.id

  useEffect(() => {
    const fetchProduct = async () => {
      const {data} = await axios.get(`/api/products/${product_id}`)

      setProduct(data)
    }

    fetchProduct()
  }, [product_id])

  return (
    <>
      <Link to='/' className='btn btn-light my-3'>
        Go Back
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid />
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating rating={product.rating} numReviews={product.numReviews} />
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Price:</strong> ${product.price}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Description:</strong> {product.description}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>${product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    <strong>
                      {product.countInStock > 0 ? (
                        <span className='text-success'>In Stock</span>
                      ) : (
                        <span className='text-danger'>Out Of Stock</span>
                      )}
                    </strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block'
                  type='button'
                  disabled={product.countInStock === 0}
                >
                  Add To Cart
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ProductScreen
