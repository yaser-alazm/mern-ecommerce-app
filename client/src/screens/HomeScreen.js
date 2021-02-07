import React, {useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'

import Product from '../components/product/Product'
import Loading from '../components/utils/Loading'
import Message from '../components/utils/Message'
import {fetchProducts} from '../redux/actions/productActions'

function HomeScreen() {
  const dispatch = useDispatch()

  const {loading, products, error} = useSelector((state) => state.productsList)

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loading />
      ) : error ? (
        <Message color='danger' text={error} />
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  )
}

export default HomeScreen
