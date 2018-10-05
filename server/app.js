const path = require('path');
const express = require('express');
const db = require('./db');
const { Product, Order, LineItem } = db.models;


const app = express();

module.exports = app;

app.use(require('body-parser').json());


app.use('/dist', express.static(path.join(__dirname, '../dist')));

const index = path.join(__dirname, '../index.html');

app.get('/', (req, res)=> res.sendFile(index));

app.get('/api/products', (req, res, next)=> {
  Product.findAll()
    .then( products => res.send(products))
    .catch(next);
});

app.get('/api/orders', async (req, res, next)=> {
  const attr = {
    status: 'CART'
  };
  try {
  let cart = await Order.findOne({ where: attr });
  if(!cart){
    cart = await Order.create(attr);
  }
  const orders = await Order.findAll({
    include: [ LineItem ],
    order: [['createdAt', 'DESC']]
  })
  res.send(orders);
  }
  catch(ex){
    next(ex);
  }
});

//update line item
app.put('/api/orders/:orderId/lineItems/:id', (req, res, next)=> {
  LineItem.findById(req.params.id)
    .then( lineItem => lineItem.update(req.body))
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

//delete lineItem
app.delete('/api/orders/:orderId/lineItems/:id', (req, res, next)=> {
  LineItem.destroy({
    where: {
      orderId: req.params.orderId,
      id: req.params.id
    }
  })
    .then(()=> res.sendStatus(204))
    .catch(next);
});

//create lineItem
app.post('/api/orders/:orderId/lineItems/', (req, res, next)=> {
  LineItem.create({ orderId: req.params.orderId, quantity: req.body.quantity, productId: req.body.productId })
    .then( lineItem => res.send(lineItem))
    .catch(next);
});

//update order
app.put('/api/orders/:id', (req, res, next)=> {
  Order.findById(req.params.id)
    .then( order => order.update(req.body))
    .then( order => res.send(order))
    .catch(next);
});


app.use((err, req, res, next)=> {
  console.log(err);
  res.status(err.status || 500).send({ error: err.message });
});
