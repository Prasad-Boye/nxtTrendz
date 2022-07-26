import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import {Component} from 'react'

import CartContext from './context/CartContext'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = productData => {
    const productDetails = {
      brand: productData.brand,
      imageUrl: productData.imageUrl,
      price: productData.price,
      title: productData.title,
      id: productData.id,
      quantity: productData.quantity,
    }

    const {cartList} = this.state

    let isItemInCart = false
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === productData.id) {
        isItemInCart = true
        const updatedItem = {
          brand: productData.brand,
          imageUrl: productData.imageUrl,
          price: productData.price,
          title: productData.title,
          id: productData.id,
          quantity: eachItem.quantity + productData.quantity,
        }
        return updatedItem
      }
      return eachItem
    })

    if (isItemInCart === false) {
      this.setState(prevState => ({
        cartList: [...prevState.cartList, productDetails],
      }))
    } else {
      this.setState({cartList: updatedCartList})
      console.log(updatedCartList)
    }
  }

  incrementCartItemQuantity = productData => {
    const {cartList} = this.state
    const updatedCartList = cartList.map(eachItem => {
      if (eachItem.id === productData.id) {
        const updatedItem = {
          brand: productData.brand,
          imageUrl: productData.imageUrl,
          price: productData.price,
          title: productData.title,
          id: productData.id,
          quantity: eachItem.quantity + 1,
        }
        return updatedItem
      }
      return eachItem
    })

    this.setState({cartList: updatedCartList})
  }

  decrementCartItemQuantity = productData => {
    const {cartList} = this.state
    if (productData.quantity === 1) {
      const updatedCartList = cartList.filter(
        eachItem => eachItem.id !== productData.id,
      )
      this.setState({cartList: updatedCartList})
    } else {
      const updatedCartList = cartList.map(eachItem => {
        if (eachItem.id === productData.id) {
          const updatedItem = {
            brand: productData.brand,
            imageUrl: productData.imageUrl,
            price: productData.price,
            title: productData.title,
            id: productData.id,
            quantity: eachItem.quantity - 1,
          }
          return updatedItem
        }
        return eachItem
      })

      this.setState({cartList: updatedCartList})
    }
  }

  removeCartItem = productData => {
    const {cartList} = this.state
    const updatedCartList = cartList.filter(
      eachItem => eachItem.id !== productData.id,
    )
    this.setState({cartList: updatedCartList})
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            deleteCartItem: this.deleteCartItem,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
