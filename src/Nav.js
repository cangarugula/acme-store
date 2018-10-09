import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

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
    const {cartCount, orders, soldItems} = this.props
    return (
        <div>
          <ul className='nav nav-tabs'>
            <li className='nav-item' style={selected('/')}><Link to='/' className='nav-link'>Home</Link></li>
            <li className='nav-item' style={ selected('/cart')}><Link to='/cart' className='nav-link'>Cart ({cartCount})</Link></li>
            <li className='nav-item' style={ selected('/orders')}><Link to='/orders' className='nav-link'>Orders ({orders.length ? orders.length : 0})</Link></li>
          </ul>
          <div className='container'>
            <div className='panel panel-success'>
              <div className='panel-heading'>
                {soldItems} sold!
              </div>
            </div>
            <button className='btn btn-warning'>Reset</button>
          </div>
        </div>

    )}

};

const mapStateToProps = ({orders}) => {
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
    orders: orders.filter(order => order.status === 'ORDER')
  }
}

export default connect(mapStateToProps)(Nav)
