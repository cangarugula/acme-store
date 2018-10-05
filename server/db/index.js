const conn = require('./conn');
const Order = require('./Order');
const Product = require('./Product')
const LineItem = require('./LineItem')

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        Product.create({ name: 'bread'}),
        Product.create({ name: 'meat'}),
        Product.create({ name: 'milk'}),
      ]);
    });
};

Order.hasMany(LineItem)
Product.hasMany(LineItem)

module.exports = {
  models: {
    Order,
    Product,
    LineItem
  },
  syncAndSeed
};
