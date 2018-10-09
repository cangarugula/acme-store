import React, {Component} from 'react'
import { connect } from 'react-redux'

class Orders extends Component {

  constructor(props) {
    super(props)
    this.state = {
      loaded: false
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props !== prevProps){
      this.setState({
        loaded: !this.state.loaded
      })
    }
  }

  render() {
    const {orders, products} = this.props
    return (
      <div className='container'>
        <h3>Orders</h3>
        <div className='list-group' >
        {
          orders.map(order => {
          return (
          <div key={order.id} className="list-group-item">
          #{order.id}
            <div >
              {
                order.lineItems.map(item => {
                const name = products.filter(product => product.id === item.productId)[0].name
                return <li className='list-group-item' key={item.id}>{name} <span className='badge'>{item.quantity}</span></li>
              })

              }
            </div>
          </div>
          )})
        }
        </div>
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
