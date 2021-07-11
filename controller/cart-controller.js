const BaseController = require('./base-controller')
const CartModel = require('../models/cart')

class CartController extends BaseController {
    model = CartModel
}

module.exports = new CartController()