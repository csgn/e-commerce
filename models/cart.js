const mongoose = require('mongoose')

const CartSchema = mongoose.Schema({
    userId: mongoose.Types.ObjectId,
    date: Date,
    products: [
        {
            productId: mongoose.Types.ObjectId,
            quantity: Number
        },
    ]
}, { collection: "carts"})


const CartModel = mongoose.model('Cart', CartSchema)

module.exports = CartModel