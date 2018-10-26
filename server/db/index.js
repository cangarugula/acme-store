const conn = require('./conn');
const Order = require('./Order');
const Product = require('./Product')
const LineItem = require('./LineItem')
const User = require('./User')

const syncAndSeed = ()=> {
  return conn.sync({ force: true })
    .then(()=> {
      return Promise.all([
        Product.create({ name: 'Bread'}),
        Product.create({ name: 'Meat'}),
        Product.create({ name: 'Milk'}),
        User.create({name: 'cang', email:'cangtruong1@gmail.com',  password: 'CANG'})
      ]);
    });
};

Order.hasMany(LineItem)
Product.hasMany(LineItem)


module.exports = {
  models: {
    Order,
    Product,
    LineItem,
    User
  },
  syncAndSeed
};
