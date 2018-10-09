import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

// action types

const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ORDERS = 'GET_ORDERS'
const ADD_ITEM = 'ADD_ITEM'
const DELETE_ITEM = 'DELETE_ITEM'
const UPDATE_ITEM = 'UPDATE_ITEM'
const CREATE_ORDER = 'CREATE_ORDER'
const RESET = 'RESET'

// action creators



const _getProducts = (products) => ({ type: GET_PRODUCTS, products })

const _getOrders = (orders) => ({ type: GET_ORDERS, orders })

const _addItem = (item) => ({ type: ADD_ITEM, item })

const _deleteItem = (item) => ({ type: DELETE_ITEM, item })

const _updateItem = (item) => ({ type: UPDATE_ITEM, item})

const _createOrder = (order) => ({ type: CREATE_ORDER, order})


// thunks

export const initialLoad = () => {
  return async (dispatch) => {
    try {
      let products = await axios.get('/api/products')
      let orders = await axios.get('/api/orders')
      dispatch(_getProducts(products.data))
      dispatch(_getOrders(orders.data))
    } catch (err) {
      throw err
    }
  }
}

export const getProducts = () => {
  return (dispatch) => {
    axios.get('/api/products')
    .then(response => dispatch(_getProducts(response.data)))
  }
}

export const getOrders = () => {
  return (dispatch) => {
    axios.get('/api/orders')
    .then(response => dispatch(_getOrders(response.data)))
  }
}

export const addItem = (item) => {
  return (dispatch) => {
    axios.post(`/api/orders/${item.orderId}/lineItems`, item)
    .then(response => dispatch(_addItem(response.data)))
  }
}

export const deleteItem = (item) => {
  return (dispatch) => {
    axios.delete(`/api/orders/${item.orderId}/lineItems/${item.id}`)
    .then(() => dispatch(_deleteItem(item)))
  }
}

export const updateItem = (item) => {
  return (dispatch) => {
    axios.put(`/api/orders/${item.orderId}/lineItems/${item.id}`, item)
    .then(response => dispatch(_updateItem(response.data)))
  }
}

export const createOrder = (order) => {
  return (dispatch) => {
    return axios.put(`/api/orders/${order.id}`, {status: 'ORDER'} )
    .then(() => dispatch(_createOrder({...order, status: 'ORDER'})))
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


const orders = (state = [], action) => {
  let cart = state.filter(order => order.status === 'CART')[0]
  let orders = state.filter(order => order.status === 'ORDER')

  switch(action.type) {
    case GET_ORDERS:
      return action.orders
    case ADD_ITEM:
      return [...orders, {...cart, lineItems: [...cart.lineItems, action.item]} ]
    case DELETE_ITEM:
      const filtered = cart.lineItems.filter(item => item.id !== action.item.id)
      return [...orders, {...cart, lineItems: filtered }]
    case UPDATE_ITEM:
      const lineItems = cart.lineItems.filter(item => item.id !== action.item.id)
      return [...orders, {...cart, lineItems: [...lineItems, action.item]}]
    case CREATE_ORDER:
      return [...orders, action.order]
    default:
      return state
  }
}

const reducer = combineReducers({products, orders})

const store = createStore(reducer, applyMiddleware(logger, thunk))

export default store
