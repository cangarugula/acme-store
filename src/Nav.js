import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { reset } from './store'

class Nav extends Component {
  constructor(props) {
    super(props)
    this.selected = this.selected.bind(this)
  }

  selected (_path) {
    const style = {};
    if(_path === this.props.path){
      style.fontWeight = 'bold';
    }
    return style
  }
  render() {
    const {selected} = this
    const {cartCount, orders, soldItems, reset} = this.props
    return (
        <div>
          <ul className='nav nav-tabs'>
            <li className='nav-item' style={selected('/')}><Link to='/' className='nav-link'>Home</Link></li>
            <li className='nav-item' style={ selected('/cart')}><Link to='/cart' className='nav-link'>Cart ({cartCount})</Link></li>
            <li className='nav-item' style={ selected('/orders')}><Link to='/orders' className='nav-link'>Orders ({orders.length ? orders.length : 0})</Link></li>
            {
              this.props.user.id ? <button>Logout</button> :
            <li className='nav-item' ><Link to='/login' className='nav-link'>Login</Link></li>
            }
          </ul>
          <div className='container'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {soldItems} sold!
              </div>
            </div>
            <button onClick={reset} className='btn btn-warning'>Reset</button>
          </div>
        </div>

    )}

};

const mapStateToProps = ({orders, user}) => {
  const cart = orders.filter(order => order.status === 'CART')[0]
  let cartCount = 0
  if(cart) {
    cart.lineItems.map(item => cartCount = cartCount + item.quantity)
  }
  let soldItems = 0
  orders.map(order => {
    if(order.status === 'ORDER') {
      order.lineItems.map(item => soldItems = soldItems + item.quantity)
    }
  })
  return {
    cartCount,
    soldItems,
    orders: orders.filter(order => order.status === 'ORDER'),
    user
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    reset: () => dispatch(reset())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
