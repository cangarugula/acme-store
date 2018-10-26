import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, HashRouter as Router } from 'react-router-dom';
import Nav from './Nav';
import { initialLoad } from './store'
import Products from './Products'
import Orders from './Orders'
import Login from './Login'

class Main extends Component{

  componentDidMount() {
    this.props.initialLoad()
  }

  render(){
    return (
      <div className='container'>
        <h1 >Acme Store</h1>
        <Router>
          <div>
            <Route component={ ({ location })=> <Nav path={ location.pathname }/> } />
            <Route path="/cart" render={({history}) => <Products history={history} />}></Route>
            <Route path='/orders' component={Orders}></Route>
            <Route path='/login' render={({history}) => <Login history={history} />}></Route>
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
