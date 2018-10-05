import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';
import Nav from './Nav';
import { initialLoad } from './store'
import Products from './Products'
import Orders from './Orders'

class Main extends Component{

  componentDidMount() {
    this.props.initialLoad()
  }

  render(){
    return (
      <div>
        <Router>
          <div>
            <Route component={ ({ location })=> <Nav path={ location.pathname }/> } />
            <Route path="/cart" component={Products}></Route>
            <Route path='/orders' component={Orders}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = ({products}) => {
  return {
    products
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    initialLoad: () => dispatch(initialLoad())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);