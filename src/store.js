import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ORDERS = 'GET_ORDERS'
const START_ORDER = 'START_ORDER'


// action creators



const _loadProducts = (products) => ({ type: GET_PRODUCTS, products })

const _loadOrders = (orders) => ({ type: GET_ORDERS, orders })

export const startOrder = () => ({ type: START_ORDER})


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

const products = (state = [], action) => {
  switch(action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

const initialOrdersState = {
  orders: [],
  order: {}
}

const ordersReducer = (state = initialOrdersState, action) => {
  switch(action.type) {
    case GET_ORDERS:
      return {...state, orders: action.orders}
    case START_ORDER:
      const order = state.orders.filter(order => order.status === 'CART')[0]
      return {...state, order }
    default:
      return state
  }
}

const reducer = combineReducers({products, ordersReducer})

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store
