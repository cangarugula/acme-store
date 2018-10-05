import React, { Component } from 'react'
import { connect } from 'react-redux'

class Products extends Component {

  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
  }

  render() {
    const {order} = this.state

    return (
      <div>
        <button>Reset</button>
        <h3>Products</h3>
        <div>
          {
            this.props.products.map(product =>
            <div key={product.id}>
              {product.name}
              <div>
              {
                order[product.name] ? order[product.name] : 0
              } Ordered
              </div>
              <button>+</button>
              <button>-</button>
            </div>
            )}
        </div>
        <button>Create Order</button>
      </div>
    )
  }
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

export default connect(mapStateToProps)(Products)
