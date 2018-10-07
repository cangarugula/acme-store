import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startOrder } from './store'

class Products extends Component {

  constructor(props) {
    super(props)
    this.state = {
      order: {}
    }
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
  }

  handleAdd(product) {
    this.props.startOrder()
    if(!this.state.order[product]){
      this.setState({
        order: {...this.state.order,
          [product]: 1
        }
      })
    } else {
      this.setState({
        order: {... this.state.order,
          [product]: this.state.order[product] + 1
        }
      })
    }
  }

  handleSubtract(product) {
    if(this.state.order[product]){
      this.setState({
        order: {... this.state.order,
          [product]: this.state.order[product] - 1
        }
      })
    }
  }

  render() {
    const {order} = this.state
    console.log(this.props.order)
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
              <button onClick={() => this.handleAdd(product.name)}>+</button>
              <button disabled={!this.state.order[product.name] ? true : ''}onClick={() => this.handleSubtract(product.name)}>-</button>
            </div>
            )}
        </div>
        <button>Create Order</button>
      </div>
    )
  }
}

const mapStateToProps = ({products,ordersReducer}) => {
  return {
    products,
    order: ordersReducer.order
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startOrder: () => dispatch(startOrder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
