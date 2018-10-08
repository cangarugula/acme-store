import React, {Component} from 'react'
import { connect } from 'react-redux'

class Orders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  render() {
    const {orders, products} = this.props
    return (
      <div>
        <button>Reset</button>
        <h3>Orders</h3>
        {
          orders.map(order => {
          return (
          <div key={order.id}>
          {order.id}
            <div>
              {
                order.lineItems.map(item => {
                const name = products.filter(product => product.id === item.productId)[0].name
                return <li key={item.id}>{name} {item.quantity}</li>
              })
              }
            </div>

          </div>
          )})
        }
      </div>
    )
  }
}

const mapStateToProps = ({orders,products}) => {
  return {
    orders: orders.filter(order => order.status === 'ORDER'),
    products
  }
}

export default connect(mapStateToProps)(Orders)
