import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import thunks from 'redux-thunk'
import axios from 'axios'

// action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ORDERS = 'GET_ORDERS'


// action creators



const _loadProducts = (products) => ({ type: GET_PRODUCTS, products })

const _loadOrders = (orders) => ({ type: GET_ORDERS, orders })


// thunks

export const initialLoad = () => {
  return async (dispatch) => {
    try {
      let products = await axios.get('/api/products')
      let orders = await axios.get('/api/orders')
      dispatch(_loadProducts(products.data))
      dispatch(_loadOrders(orders.data))
    } catch (err) {
      throw err
    }
  }
}

export const loadProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
    .then(response => dispatch(_loadProducts(response.data)))
  }
}

export const loadOrders = () => {
  return (dispatch) => {
    axios.get('/api/orders')
    .then(response => dispatch(_loadOrders(response.data)))
  }
}


// reducers

const products = (store = [], action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return store
  }
}

const orders = (store = [], action) => {
  switch(action.type) {
    case GET_ORDERS:
      return action.orders
    default:
      return store
  }
}

const reducer = combineReducers({products, orders})

const store = createStore(reducer, applyMiddleware(logger, thunks))

export default store
