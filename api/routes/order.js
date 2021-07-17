const express = require('express');
const route = express.Router();

const Order = require('../models/order');

const authCheck = require('../middleware/jwt-auth');
const OrdersController = require('../controllers/order');
 
route.get('/',authCheck ,OrdersController.orders_get_all);


route.post('/',authCheck , OrdersController.order_post);

route.get('/:orderId',authCheck ,OrdersController.orders_id);

route.delete('/:orderId',authCheck ,OrdersController.order_delete);

module.exports = route ;