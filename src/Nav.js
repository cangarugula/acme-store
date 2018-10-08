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
    const {cartCount, orders} = this.props
    return (
      <ul>
        <li style={selected('/')}><Link to='/'>Home</Link></li>
        <li style={ selected('/cart')}><Link to='/cart'>Cart ({cartCount})</Link></li>
        <li style={ selected('/orders')}><Link to='/orders'>Orders ({orders.length ? orders.length : 0})</Link></li>
      </ul>
    )}

};

const mapStateToProps = ({orders}) => {
  const cart = orders.filter(order => order.status === 'CART')[0]
  let count = 0
  if(cart) {
    cart.lineItems.map(item => count = count + item.quantity)
  }
  return {
    cartCount: count,
    orders: orders.filter(order => order.status === 'ORDER')
  }
}

export default connect(mapStateToProps)(Nav)
