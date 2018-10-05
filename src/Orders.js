import React, {Component} from 'react'
import { connect } from 'react-redux'

class Orders extends Component {
  render() {
    return (
      <div>
        <h3>Orders</h3>
        {
          this.props.orders.map(order => <li key={order.id}>{order.id}</li>)
        }
      </div>
    )
  }
}

const mapStateToProps = ({orders}) => {
  return {
    orders
  }
}

export default connect(mapStateToProps)(Orders)
