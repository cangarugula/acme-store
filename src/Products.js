import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addItem, deleteItem, updateItem, createOrder, getOrders } from './store'

class Products extends Component {

  constructor(props) {
    super(props)
    this.handleAdd = this.handleAdd.bind(this)
    this.handleSubtract = this.handleSubtract.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleAdd(product) {
    const {order, addItem,  updateItem} = this.props
    const lineItem = order.lineItems.filter(item => item.productId === product.id)[0]
    let item = {
      orderId: order.id,
      productId: product.id
    }
    if(!lineItem){
      item.quantity = 1
      addItem(item)
    } else {
      item.quantity = lineItem.quantity+1
      item.id = lineItem.id
      updateItem(item)
    }
  }

  handleSubtract(product) {
    const {order, deleteItem, updateItem} = this.props
    const lineItem = order.lineItems.filter(item => item.productId === product.id)[0]
    if(lineItem.quantity === 1){
      deleteItem(lineItem)
    } else {
      updateItem({
        id: lineItem.id,
        orderId: order.id,
        productId: product.id,
        quantity: lineItem.quantity-1
      })
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.createOrder(this.props.order)
    .then(() => this.props.getOrders())
    this.props.history.push('/orders')
  }

  render() {
    const {products, order} = this.props
    return (
      order ?
      <div className='container'>
        <h3>Products</h3>
        <div className='container row' >
          {
            products.map(product =>
            <div key={product.id} className='col-sm-4'>
              {product.name}
              <div >
              {
                order.lineItems.filter(item => item.productId === product.id)[0]
                ? order.lineItems.filter(item => item.productId === product.id)[0].quantity
                : 0
              } Ordered
              </div>
              <div >
                <button className='btn btn-primary btn-sm'onClick={() => this.handleAdd(product)} >+</button>
                <button  className='btn btn-primary btn-sm' disabled={ order.lineItems.filter(item => item.productId === product.id)[0] ? '' : true }
                onClick={() => this.handleSubtract(product)}>-</button>
              </div>
            </div>
            )}
        </div>
        <div className='btn'>
            <button className='btn btn-primary' disabled={order.lineItems.length ? '' : true } onClick={this.handleSubmit}>Create Order</button>
        </div>
      </div>
      : <div>Loading...</div>
    )
  }
}

const mapStateToProps = ({products,orders}) => {
  return {
    products,
    order: orders.filter(order => order.status === 'CART')[0]
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    deleteItem: (item) => dispatch(deleteItem(item)),
    updateItem: (item) => dispatch(updateItem(item)),
    createOrder: (order) => dispatch(createOrder(order)),
    getOrders: () => dispatch(getOrders())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
