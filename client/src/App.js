import React from 'react'
import {Container} from 'react-bootstrap'
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'

function App() {
  return (
    <Router>
      <Header />
      <Container>
        <main>
          <Route path='/' exact component={HomeScreen} />
          <Route path='/products/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/orders/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
        </main>
      </Container>
      <Footer />
    </Router>
  )
}

export default App
