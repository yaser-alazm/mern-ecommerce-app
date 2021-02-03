import React from 'react'
import {Card} from 'react-bootstrap'
import {Link} from 'react-router-dom'

import Rating from './Rating'

function Product({product}) {
  return (
    <>
      <Card className='product-card p-3 my-3 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img variant='top' src={product.image} />
        </Link>
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
          <Card.Text as='div'>
            <Rating rating={product.rating} numReviews={product.numReviews} />
          </Card.Text>
          <Card.Text as='h3' className='product-price'>
            ${product.price}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  )
}

export default Product
