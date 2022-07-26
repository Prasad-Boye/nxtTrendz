import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalCartValue = 0
      cartList.map(eachItem => {
        const itemCost = eachItem.quantity * eachItem.price
        totalCartValue += itemCost
        return totalCartValue
      })
      return (
        <div className="cart-summary-container">
          <div className="cart-summary">
            <h1 className="order-total-header">
              Order Total:{' '}
              <span className="order-total">Rs {totalCartValue}/-</span>
            </h1>
            <p className="cart-count">{cartList.length} items in cart</p>
            <button type="button" className="checkout-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
